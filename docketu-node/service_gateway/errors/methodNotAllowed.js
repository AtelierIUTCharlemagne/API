
function methodNotAllowed(req,res,next){
    res.status(500).json({
    "type": "error",
    "error": 500,
    "message": `Methode non autorisée: ` + req.method
    });
}

module.exports = methodNotAllowed;

