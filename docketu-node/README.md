# Docker + Node.js Bootstrap

## Configurer le projet

**adapter le fichier docker-compose.yml**

En particulier il faut choisir les ports de la machine hôte associés au port utilisé par le conteneur : 
```
ports:
  - "19100:3000"
```

**Renommer et adapter le fichier `./api/.env.exemple`** :

```
- ./api/.env
```
Les variables `http_proxy` et `https_proxy` sont nécessaires pour les conteneurs s'exécutant sur une machine hôte installée derrière un proxy.
Elles permettent aux applications dans le conteneur d'utiliser ce proxy.
C'est le cas de la machine docketu.iutnc.univ-lorraine.fr.
<br>
<br>

## Créer et démarrer les conteneurs, installer les dépendances npm

### Installation des dépendances
Les dépendances du projet (npm, package.json) doivent être installées
à l'intérieur des conteneurs. Pour cela, 3 possibilités complémentaires : 

1. installation au démarrage du conteneur grâce à la directive ```command:``` du fichier docker-compose.yml :
   
`command: bash -c 'npm i && npm start'`
   
2. en exécutant la commande d'installation depuis l'extérieur du conteneur lorsqu'il est actif :
   
`docker-compose run api npm install`
3. en exécutant un bash depuis l'extérieur du conteneur lorsqu'il est actif, puis, depuis le conteneur, exécuter la commande d'installation : 

`docker-compose run api bash`

puis

`npm install`

### Créer et démarrer les conteneurs

#### Créer  les services Docker sans les lancer

```
docker-compose up --no-start
```

<br>

#### Lancer les services Docker

```
docker-compose start
```
#### Créer et lancer les services Docker

```
docker-compose up
```

<br>

#### Créer et lancer les services Docker en background

```
docker-compose up -d
```

<br>

#### Arrêter les services Docker

```
docker-compose stop
```


## Test de l'API

### Requête HTTP GET

Après avoir démarré les services Docker sur la machine hôte, la commande suivante, exécutée depuis une machine distante:

`curl docketu.iutnc.univ-lorraine.fr:19100`

doit fournir la réponse suivante :

`{"message":"Welcome !"}`


<br>

### Requête HTTP POST

`curl docketu.iutnc.univ-lorraine.fr:19100 -H "Content-Type: application/json" -X POST -d '{"message":"Hello World!"}'`

doit fournir la réponse suivante :

`{"message":"Hello World!"}`

<br>
<br>

## Commandes utiles

### Node.js

#### Environnement de Dévelopement

Dans le fichier ./api/.env, indiquer la valeur :

`NODE_ENV=development`

#### Environnement de Production

Dans le fichier ./api/.env, indiquer la valeur :

`NODE_ENV=production`

<br>
<br>

### Docker

#### Installer les dépendances d'un service Node.js

```
docker-compose run <nom-service> npm install
```

<br>


### Docker + Node.js

#### Installer les dépendances NPM dans le dossier node_modules du container

**Les modules NPM doivent être installés directement dans le container de destination** (et pas simplement synchroniser avec le volume source).

Plusieurs solutions possibles :

<br>

1 - Via une commande docker-compose :

`docker-compose run api npm install`

<br>
<br>

2 - Via bash, au sein du container :

`docker-compose run api bash`

puis

`npm install`

<br>
<br>

3 - Via l'attribut "command" du service dans le fichier docker-compose.yml :

`command: bash -c 'npm i && npm start'`

_Répeter l'une des 3 méthodes d'installation à chaque fois qu'une nouvelle dépendance NPM est ajoutée au fichier ./api/package.json_

<br>
<br>

#### Hot Reloading

- Ajouter nodemon aux dépendances du fichier `./api/package.json`

- Installer **Nodemon** dans le container du service concerné (via l'une des 3 méthodes détaillées ci-avant)

- Activer la commande suivante dans `docker-compose.yml` pour le service concerné :

`command: bash -c 'npm run dev'`

<br>
<br>

---

**Alexandre Leroux**

- _Mail_ : alex@sherpa.one
- _Github_ : sherpa1
- _Twitter_ : @_sherpa_
- _Discord_ : sherpa#3890

_Enseignant vacataire à l'Université de Lorraine_

- IUT Nancy-Charlemagne (LP Ciasie)

- Institut des Sciences du Digital (Masters Sciences Cognitives)
