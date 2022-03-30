# API

## Attribution des ports : 
    62349 : service_auth
    62347 : service_php_my_admin
    62346 : service_gateway
    62345 : service_events

## Liste des routes et leurs parametres : 

### Users
    - (POST) /users/signup
        params :
        {
            "email" : "mon@adresse.fr", 
            "username" : "unUsername",
            "passwd" : "ouioui" 
        }
        -> Retour : 201 et 
            "user": 
                {
                    'username': username,
                    'email': email,
                }
    - (POST) /users/signin
        params :
        {
            "email" : "mon@adresse.fr", 
            "passwd" : "ouioui" 
        }
        -> Retour : un token JWT contenant les infos de l'utilisateur
### Events
    - (GET) /events
        -> Retour : tous les events 
    - (GET) /events?user_id={idUSer} 
        -> Retour : les events de l'utilisitateur {idUSer}
    - (GET) /events/{idEvent}
        -> Retour : l'event {idEvent}
    - (GET) /events/{idEvent}?embed=comments
        -> Retour : l'event {idEvent} ainsi que ces commentaires
    - (POST) /events/create 
        params : 
        {
            "title": "un titre",
            "address": "à l iut",
            "localisation": "48.2 6.2",
            "date_events": "2022-12-12 00:00:00",
            "user_id_user" : 1
        }
        et il faut aussi un token JWT dans le bearer 
        -> Créer un event en base de donnée
        -> Retour : 
            "event": 
                {
                    'title': title,
                    'address': address,
                    'localisation': localisation,
                    'token': token,
                    'date_events': date_events,
                    'user_id_user': user_id_user,
                }
    - (POST) /events/answer
        params : 
        {
            "present": false,
            "user_id_user":9,
            "token":"29fbbb71-f342-4487-a949-27c8de795ade"
        }
        ou 
        {
            "present": false,
            "pseudo" : "un pseudo", 
            "token":"29fbbb71-f342-4487-a949-27c8de795ade"
        }
        -> Insere un évenement en base de données
        -> Retour : 
            201 et : 
            {
                "message": "created"
            }
    - (POST) /events/comment
        params :
        {
            "text":"Tea",
            "user_id_user":1,
            "events_id_events":2
        }
        -> Insere un commentaire en base de données
        -> Retour : 
            201 et : 
            {
                "message": "created"
            }
