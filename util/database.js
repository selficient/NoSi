const mysql = require('mysql');
const config = require('../config.json');
const util = require('util');
const connection = mysql.createConnection(config.database);
const query = util.promisify(connection.query).bind(connection);

class database {

    constructor(){}

    async find(table, constraint) {
        try {
            if (!constraint) {
                var results = await query(`SELECT * FROM ${table};`);
            } else {
                var results = await query(`SELECT * FROM ${table} WHERE ${constraint};`);
            }
            return results;
        }
        catch (error) {
            throw error;
        }
    }

    async insert(table, values) {
        try  {
            var result;
            if (values) {
                var insQuery1 = `INSERT INTO ${table} (`;
                var insQuery2 = ` VALUES (`;
                var first = true;
                for (let element in values) {
                    if(first) {
                        insQuery1 += element;
                        insQuery2 += values[element];
                        first = false;
                    } else {
                        insQuery1 += ',' + element;
                        insQuery2 += `,${values[element]}`;
                    }
                }
                insQuery1 += ')';
                insQuery2 += ');';
                let insQuery = insQuery1 + insQuery2;
                let results = await query(insQuery);
                result = results.insertId;
            }
            else {
                throw 'cannot insert without values';
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    async update(table, column, value, constraint) {
        try{
            var result;
            if (column && value && constraint) {
                let results = await query(`UPDATE ${table} SET ${column} = ${value} WHERE ${constraint};`);
                result = results.affectedRows;
            } else {
                throw 'cannot update without column, value or constraint';
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = database;