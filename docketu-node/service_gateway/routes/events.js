const express = require('express');
const router = express.Router();
const monAxios = require('../axios/axios')

const methodNotAllowed = require('../errors/methodNotAllowed.js');

const url = "http://service_events:3002"
const axios = monAxios(url)

//req.path 
/* GET home page. */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        if (req.query.user_id) {
            axios.get('/events' + req.path + '?user_id=' + req.query.user_id).then(resp => {
            res.json(resp.data)
        })
        }else {
            axios.get('/events' + req.path).then(resp => {
                res.json(resp.data)
            })
        }
        
    })

router.route('/create')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        axios.post('/events' + req.path, req.body).then(resp => {
            res.json(resp.data)
            return res
        })
    })
    .get(methodNotAllowed)
// Route answer
router.route('/answer')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        axios.post('/events' + req.path, req.body).then(resp => {
            res.json(resp.data)
            return res
        })
    })
    .get(methodNotAllowed)
//Route comment
router.route('/comment')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next) => {
        axios.post('/events' + req.path, req.body).then(resp => {
            res.json(resp.data)
            return res
        })
    })
    .get(methodNotAllowed)

router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .get(function (req, res, next) {
        axios.get('/events/' + req.params.id).then(resp => {
            res.json(resp.data)
            return res
        })
    })

module.exports = router;
