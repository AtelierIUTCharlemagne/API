class returnMessage {
    static CREATED = {
        "type": "success",
        "error": 201,
        "message" : "ressource crée"
    };

    static NOTFOUND = {
        "type": "error",
        "error": 404,
        "message" : "ressource non disponibles"
    };

    static BADREQUEST = {
        "type": "error",
        "error": 400,
        "message" : "requête invalide rèfèrrez vous à la doc ici : https://documenter.getpostman.com/view/13372065/UVsTriG2"
    };

    static USERNOTFOUND = {
        "type": "error",
        "error": 404,
        "message" : "L'utilisateur demandé n'existe pas"
    };

    static EVENTNOTFOUND = {
        "type": "error",
        "error": 404,
        "message" : "L'event demandé n'existe pas"
    };

    static BADREQUESTJOI = {
        "type": "error",
        "error": 400,
        "message" : "requête invalide rèfèrrez vous à la doc ici : https://documenter.getpostman.com/view/13372065/UVsTriG2"
    };

    static MAILEXISTEDEJA = {
        "type": "error",
        "error": 400,
        "message" : "Un compte existe déjà avec cette adresse mail"
    };

    static databaseError(err){
        return ({
            "type": "error",
            "error": 500,
            "message": `Erreur de connexion à la base de données ` + err
        });
    }

}


module.exports =  returnMessage;
