const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET;

const methodNotAllowed = require('../errors/methodNotAllowed.js');

router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {

        knex.from('events_annex')
            .select('*')
            .then((events) => {
                console.log(events)
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

    })




/**
 * Route : /events-annex/id (id d'un event)
 * Méthode : GET
 * Description : Retourne tous les annex lien a cet evenemnt
 * retour : JSON de l'evenement
 */
router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .get(function (req, res, next) {
        knex.from('events_annex')
            .select('*')
            .where({
                'events_id_events': req.params.id
            })
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

// function insertAnswer(res, pseudo, present, user_id_user, events_id_events) {
//     knex.from('events_annex').insert(
//         {
//             'pseudo': pseudo,
//             'present': present,
//             'user_id_user': user_id_user,
//             'events_id_events': events_id_events
//         }
//     ).then(() => {
//         res.status(201).json({
//             "message": "created"
//         })
//     }).catch((err) => {
//         res.status(500).json({
//             "type": "error",
//             "error": 500,
//             "message": `Erreur de connexion à la base de données ` + err
//         });
//     })
// }




/*----------------------- test 2 */

// router.route('/:id')
//     .patch(methodNotAllowed)
//     .delete(methodNotAllowed)
//     .put(methodNotAllowed)
//     .post(methodNotAllowed)
//     .get(function (req, res, next) {
//         if (req.query.user_id) {
//             knex.from('events_annex')
//                 .select('*')
//                 .where({
//                     'events_id_events': req.query.user_id
//                 })
//                 .then((events) => {
//                     if (events == null) {
//                         res.status(404).json({
//                             "type": "error",
//                             "error": 404,
//                             "message": `ressources non disponibles`
//                         });
//                     } else {
//                         let liste_events =
//                             {
//                                 type: "collection",
//                                 count: events.length,
//                                 events: events
//                             }
//                         res.status(200).json(liste_events)
//                     }
//                 }).catch((err) => {
//                 res.status(500).json({
//                     "type": "error",
//                     "error": 500,
//                     "message": `Erreur de connexion à la base de données ` + err
//                 });
//             })
//         } else {
//             knex.from('events')
//                 .select('*')
//                 .then((events) => {
//                     if (events == null) {
//                         res.status(404).json({
//                             "type": "error",
//                             "error": 404,
//                             "message": `ressources non disponibles`
//                         });
//                     } else {
//                         let liste_events =
//                             {
//                                 type: "collection",
//                                 count: events.length,
//                                 events: events
//                             }
//                         res.status(200).json(liste_events)
//                     }
//                 }).catch((err) => {
//                 res.status(500).json({
//                     "type": "error",
//                     "error": 500,
//                     "message": `Erreur de connexion à la base de données ` + err
//                 });
//             })
//         }
//     })

module.exports = router;
