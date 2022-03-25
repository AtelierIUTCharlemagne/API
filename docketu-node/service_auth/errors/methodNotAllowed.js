
function methodNotAllowed(req,res,next){
    res.status(500).json({
    "type": "error",
    "error": 500,
    "message": `Methode non autorisée: ` + req.method
    });
}

var CREATED = {
    "type": "success",
    "error": 201,
    "message" : "ressource crée"
};

var NOTFOUND = {
    "type": "error",
    "error": 404,
    "message" : "ressource non disponibles"
};

var BADREQUEST = {
    "type": "error",
    "error": 400,
    "message" : "requête invalide rèfèrrez vous à la doc ici : https://documenter.getpostman.com/view/13372065/UVsTriG2"
};

module.exports = methodNotAllowed, CREATED, NOTFOUND, BADREQUEST;

