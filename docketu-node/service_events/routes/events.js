const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET;

const methodNotAllowed = require('../errors/methodNotAllowed.js');

/**
 * Route : /events
 * Méthode : GET
 * Description : en ajoutant ?user_id=1 on recupère la liste des evenements de l'utilisateur portant l'id 1
 * retour : JSON de la liste de tous les evenements
 */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        if (req.query.user_id) {
            knex.from('events')
                .select('*')
                .where({
                    'user_id_user': req.query.user_id
                })
                .then((events) => {
                    if (events == null) {
                        res.status(404).json({
                            "type": "error",
                            "error": 404,
                            "message": `ressources non disponibles`
                        });
                    } else {
                        let liste_events =
                        {
                            type: "collection",
                            count: events.length,
                            events: events
                        }
                        res.status(200).json(liste_events)
                    }
                }).catch((err) => {
                    res.status(500).json({
                        "type": "error",
                        "error": 500,
                        "message": `Erreur de connexion à la base de données ` + err
                    });
                })
        } else {
            knex.from('events')
                .select('*')
                .then((events) => {
                    if (events == null) {
                        res.status(404).json({
                            "type": "error",
                            "error": 404,
                            "message": `ressources non disponibles`
                        });
                    } else {
                        let liste_events =
                        {
                            type: "collection",
                            count: events.length,
                            events: events
                        }
                        res.status(200).json(liste_events)
                    }
                }).catch((err) => {
                    res.status(500).json({
                        "type": "error",
                        "error": 500,
                        "message": `Erreur de connexion à la base de données ` + err
                    });
                })
        }
    })

/**
 * Route : /events/create 
 * Méthode : POST
 * Description : permet d'ajouter un evenement par la méthode post
 * params : title, addresse, localisation, date_events, user_id_user
 * retour : JSON de l'evenement crée sans last_update et sans son id
 * */
router.route('/create')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        const { title, address, localisation, date_events, user_id_user } = req.body
        const token = uuidv4();
        const last_update = knex.fn.now();
        knex.from('events').insert(
            {
                'title': title,
                'address': address,
                'localisation': localisation,
                'token': token,
                'date_events': date_events,
                'last_update': last_update,
                'user_id_user': user_id_user,
            }
        ).then(() => {
            res.status(201).json({
                "event": {
                    'title': title,
                    'address': address,
                    'localisation': localisation,
                    'token': token,
                    'date_events': date_events,
                    'user_id_user': user_id_user,
                }
            })
        })
            .catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })
    })
    .get(methodNotAllowed)

/**
 * Route : /events/answer 
 * Méthode : POST
 * Description : permet de répondre (présence ou non) à un evenement par la méthode post
 * params : pseudo, present, user_id_user, events_id_events
 * retour : 201 ok ou 401 mauvaise requete ou 500 erreur serveur
 * */
router.route('/answer')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        const { pseudo, present, user_id_user, events_id_events } = req.body
        if (!user_id_user && pseudo) {
            // on insere le pseudo sans user id
            insertAnswer(res, pseudo, present, user_id_user, events_id_events)
        } else if (user_id_user && !pseudo) {
            // on va recuperer le username de l'utilisateur pour l'insérer à la place du pseudo
            knex.from('user')
                .select('id_user', 'username')
                .where({
                    'id_user': user_id_user
                }).first()
                .then(async (user) => {
                    if (!user) {
                        res.status(400).json({
                            error: "l'utilisateur n'existe pas",
                            status: "error"
                        }); return;
                    }
                    const username = user.username
                    insertAnswer(res, username, present, user_id_user, events_id_events)
                })
                .catch((err) => {
                    res.status(500).json({
                        "type": "error",
                        "error": 500,
                        "message": `Erreur de connexion à la base de données ` + err
                    });
                })
            // on va chercher le username du joueur 
        } else {
            res.status(400).json({
                "type": "error",
                "error": 400,
                "message": `Erreur dans la requete`
            });
        }

    })
    .get(methodNotAllowed)

/**
 * Route : /events/comment 
 * Méthode : POST
 * Description : permet d'ajouter un evenementaire par la méthode post
 * params : events_id_events, text, user_id_user
 * retour : 201 ok ou 401 mauvaise requete ou 500 erreur serveur
 * */
router.route('/comment')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        const { events_id_events, text, user_id_user } = req.body
        // On vérifie si l'utilisateur est le créateur de l'événement 
        knex.from('events')
            .select('id_events')
            .where({
                'user_id_user': user_id_user,
                'id_events': events_id_events
            })
            .then((creator) => {
                if (creator == null || creator.length == 0) {
                    // On verifie si l'utilisateur à répondu à l'invitation avant de commenter l'evenement
                    knex.from('events_annex')
                        .select('id_events_annex')
                        .where({
                            'user_id_user': user_id_user,
                            'events_id_events': events_id_events
                        })
                        .then((answered) => {
                            if (answered == null || answered.length == 0) {
                                res.status(404).json({
                                    "type": "error",
                                    "error": 404,
                                    "message": `Il faut d'abord répondre à l'invitation de l'evenement`
                                });
                            } else {
                                knex.from('comment').insert(
                                    {
                                        'events_id_events': events_id_events,
                                        'text': text,
                                        'user_id_user': user_id_user,
                                    }
                                ).then(() => {
                                    res.status(201).json({
                                        "message": "created"
                                    })
                                }).catch((err) => {
                                    // Verifier si l'event existe
                                    // Verifier si l'user existe
                                    res.status(500).json({
                                        "type": "error",
                                        "error": 500,
                                        "message": `Erreur, lors de l'insertion en base de données`
                                    });
                                })
                            }
                        }).catch((err) => {
                            res.status(500).json({
                                "type": "error",
                                "error": 500,
                                "message": `Erreur de connexion à la base de données ` + err
                            });
                        })
                } else {
                    knex.from('comment').insert(
                        {
                            'events_id_events': events_id_events,
                            'text': text,
                            'user_id_user': user_id_user,
                        }
                    ).then(() => {
                        res.status(201).json({
                            "message": "created"
                        })
                    }).catch((err) => {
                        // Verifier si l'event existe
                        // Verifier si l'user existe
                        res.status(500).json({
                            "type": "error",
                            "error": 500,
                            "message": `Erreur, lors de l'insertion en base de données`
                        });
                    })
                }

            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })

    })
    .get(methodNotAllowed)

/**
 * Route : /events/id (id d'un event)
 * Méthode : GET
 * Description : Retourne l'event portant l'id passé en parametre
 * retour : JSON de l'evenement
 */
router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .get(function (req, res, next) {
        if (req.query.embed && req.query.embed === "comments") {
            knex.from('events')
                .select('*')
                .where({
                    'id_events': req.params.id
                }).first()
                .then((event) => {
                    if (event == null) {
                        res.status(404).json({
                            "type": "error",
                            "error": 404,
                            "message": `ressources non disponibles`
                        });
                    } else {
                        let event_json = {
                            type: "ressource",
                            event: event,
                        }
                        knex.from('comment')
                            .select('*')
                            .where({
                                'events_id_events': req.params.id
                            })
                            .then((comments) => {
                                if (comments === null) {
                                    res.status(200).json(event_json)
                                } else {
                                    event_json.comments = Array()
                                    comments.forEach(comment => {
                                        event_json.comments.push(comment)
                                    });
                                    res.status(200).json(event_json)
                                }
                            }).catch((err) => {
                                res.status(500).json({
                                    "type": "error",
                                    "error": 500,
                                    "message": `Erreur de connexion à la base de données ` + err
                                });
                            })
                    }
                }).catch((err) => {
                    res.status(500).json({
                        "type": "error",
                        "error": 500,
                        "message": `Erreur de connexion à la base de données` + err
                    });
                })
        } else {
            knex.from('events')
                .select('*')
                .where({
                    'id_events': req.params.id
                }).first()
                .then((event) => {
                    if (event == null) {
                        res.status(404).json({
                            "type": "error",
                            "error": 404,
                            "message": `ressources non disponibles`
                        });
                    } else {
                        res.status(200).json(event)
                    }
                }).catch((err) => {
                    res.status(500).json({
                        "type": "error",
                        "error": 500,
                        "message": `Erreur de connexion à la base de données ` + err
                    });
                })
        }
    })

function insertAnswer(res, pseudo, present, user_id_user, events_id_events) {
    knex.from('events_annex').insert(
        {
            'pseudo': pseudo,
            'present': present,
            'user_id_user': user_id_user,
            'events_id_events': events_id_events
        }
    ).then(() => {
        res.status(201).json({
            "message": "created"
        })
    }).catch((err) => {
        res.status(500).json({
            "type": "error",
            "error": 500,
            "message": `Erreur de connexion à la base de données ` + err
        });
    })
}


module.exports = router;
