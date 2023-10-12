require('dotenv').config();
let connection = {
    development: {
        client: 'mysql2',
        connection: {
            host : process.env.DB_HOST,
            port : process.env.DB_PORT,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
    
        },
        useNullAsDefault: true, 
        migrations: {
            directory: __dirname + '/src/database/migrations',
        },
        seeds: {
            directory: __dirname + '/src/database/seeds',
        },
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: __dirname + '/src/database/migrations',
        },
        seeds: {
            directory: __dirname + '/src/database/seeds/production',
        },
    },
};

module.exports = connection;