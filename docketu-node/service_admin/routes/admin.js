const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const methodNotAllowed = require('../errors/methodNotAllowed.js');
/**
 * Route : /users
 * Méthode : GET
 * Description : récupération de tous les users 
 * retour : JSON de la liste de tous les users
 */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {

        knex.from('user')
            .select('*')
            .then((users) => {
                console.log(users)
                if (users == null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `ressources non disponibles`
                    });
                } else {
                    let liste_users =
                    {
                        type: "collection",
                        count: users.length,
                        users: users
                    }
                    res.status(200).json(liste_users)
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
 * Route : /signup
 * Méthode : POST
 * Description : permet d'inscrire un utilisateur
 * params : username, email, passwd
 * Retour : JSON de l'utilisateur contenant son username et son email
 */
router.route('/signup')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        const { username, email, passwd } = req.body
        const password = await bcrypt.hash(passwd, 10);
        knex.from('admin').insert(
            {
                'username': username,
                'email': email,
                'password': password,
            }
        ).then(() => {
            res.status(201).json({
                "user": {
                    'username': username,
                    'email': email,
                }
            })
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
 * Route : /signin
 * Méthode : POST
 * Description : permet de connecter un utilisateur
 * params : email, passwd
 * Retour : JWT contenant les informations de l'utilisateur
 */
router.route('/signin')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        const { email, passwd } = req.body
        knex.from('admin').select('id_admin', 'username', 'email', 'password', 'create_time')
            .where({
                'email': email
            }).first()
            .then(async (user) => {
                if (!user) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

                if (! await bcrypt.compare(passwd, user.password)) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

                const token = jwt.sign(
                    {
                        id: user.id_user,
                        username: user.username,
                        email: user.email,
                        create_time: user.create_time,
                    },
                    JWT_SECRET,
                );
               
                res.status(200).json({ data: token, status: "ok" });
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


/*-------------route admin -----------------*/

/**
 * Route : /delete
 * Méthode : DELETE
 * Description : suprime un user avec son id
 * params : id_user
 * Retour :
 */
router.route('/delete/:id')
    .patch(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .delete(function (req, res, next) {

        knex.from('user').delete('*')
            .where({
                'id_user': req.params.id
            })
            .then((user) => {
                // if (!user) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

                // if ( bcrypt.compare(passwd, user.password)) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

                res.status(200).json({ data: user, status: "l'utilisateur a bien etait suprimer " });
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
 * Route : /delete
 * Méthode : DELETE
 * Description : suprime un user avec son id
 * params : id_user
 * Retour :
 */
router.route('/eventdelete/:id')
    .patch(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .delete(function (req, res, next) {
        let id_events = req.params.id
        knex.from('events').delete('*')
            .where({
                'id_events': id_events
            })
            .then((user) => {
                // if (!user) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

                // if ( bcrypt.compare(passwd, user.password)) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

                res.status(200).json({ data: id_events, status: "l'utilisateur a bien etait suprimer " });
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


module.exports = router;
