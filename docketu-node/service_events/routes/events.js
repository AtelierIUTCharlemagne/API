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
                    'user_id_user':req.query.user_id
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
    })



module.exports = router;
