let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    "type": "error",
    "error": 200,
    "message": `Erreur dans la requete.`
  });
});

module.exports = router;
