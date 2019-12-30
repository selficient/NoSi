const mysql = require('mysql');
const config = require('../config.json');
var connection = mysql.createConnection(config.database);

function insert(item, callback) {
    connection.query('INSERT INTO' )
}