// Database
const db = require('../config/database');

let Init = async () => {    
    /* Si on veut tester la connexion */
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = Init;