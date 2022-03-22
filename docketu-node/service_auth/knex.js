const knex = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        //user: process.env.MYSQL_USER,
        user: 'root',
        //password: process.env.MYSQL_PASSWORD,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }
});

module.exports = knex;