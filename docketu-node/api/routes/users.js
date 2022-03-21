const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken')
//const { v4: uuidv4 } = require('uuid');

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
    .post(async (req, res, next ) => {
        const { username, email, passwd } = req.body
        const password = await bcrypt.hash(passwd, 10);
        knex.from('user').insert(
            {
                'username' : username,
                'email': email,
                'password' : password,
            }
        ).then(() => {
            res.status(201).json({
                "user": {
                    'username' : username,
                    'email': email,
                    'password' : password,
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

router.get('/', (req, res, next) => {
  res.json({ message: "Welcome !" })
});

router.post('/', (req, res, next) => {
  if (!req.body.message || req.body.message == "" || typeof req.body.message == undefined) {
    return res.status(400).json("Missing message var in body")
  }
  res.json({ message: req.body.message });//hello world!
});

module.exports = router;
