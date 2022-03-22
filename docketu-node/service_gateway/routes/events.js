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
        axios.get('/events' + req.path).then(resp => {    
        res.json(resp.data)
    })
})

router.route('/create')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next ) => {
        axios.post('/events' + req.path, req.body).then(resp => {
        res.json(resp.data)
        return res
        })
    })
    .get(methodNotAllowed)

/*router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .get(function (req, res, next) {
        axios.get('/users/' + req.params.id).then(resp => {
            res.json(resp.data)
            return res
        })
    })
*/
module.exports = router;
