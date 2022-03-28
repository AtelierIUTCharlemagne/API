const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


const JWT_SECRET = process.env.JWT_SECRET;

const methodNotAllowed = require('../errors/methodNotAllowed.js');

/**
 * Route : /events
 * Méthode : GET
 * Description : en ajoutant ?user_id=1 on recupère la liste des evenements de l'utilisateur portant l'id 1
 * @returns : JSON de la liste de tous les evenements
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
         let test = moment(date_events)
        console.log(test);
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
 * Route : /events/confirm/id
 * Méthode : GET
 * Description : verifie si le token de l'url et valable
 * params :
 * retour :
 * */
router.route('/confirm/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .get(function (req, res, next) {
        // On verifie si l'utilisateur a répond à l'invitation avant de le redirier vers answer
        console.log(req.params.token)
        knex.from('events')
            .select('token')
            .where({
                'token': req.params.id
            })
            .then((valide) => {
                if (valide == null || valide.length === 0) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `le token n'est pas valable`
                    });
                } else {
                    //redirige vers answer

                    // res.status(301).redirect("http://localhost:62345/answer?token=UIE14MEN6W")
                    res.status(200).json({ status: "ok" })
                }

            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })

    })


/**
 * Route : /event/token
 * Méthode : GET
 * Description : Gener un token avec les elements de l'event
 * params : title, address, token, date_events
 * Retour : JWT contenant les information event
 */
router.route('/token')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .get(function (req, res, next) {
        const { id_events } = req.body
        // knex.from('events').select('id_events','title', 'address', 'token', 'date_events')
        knex.from('events').select('token')
            .where({
                'id_events': id_events
            })
            .then( (user) => {
                console.log(user)
                const token = user.id_events
                res.status(200).json({ data: user, status: "ok" });
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
