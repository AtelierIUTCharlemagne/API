const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const methodNotAllowed = require('../errors/methodNotAllowed.js');

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

router.route('/signup')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        const { username, email, passwd } = req.body
        const password = await bcrypt.hash(passwd, 10);
        knex.from('user').insert(
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
                    'password': password,
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

router.route('/signin')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        const { email, passwd } = req.body
        knex.from('user').select('id_user', 'username', 'email', 'password', 'create_time', 'last_connection')
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
                        email : user.email,
                        create_time : user.create_time,
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


module.exports = router;
