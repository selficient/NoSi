const db = require('../util/database');
const config = require('../config.json');
const fetch = require('node-fetch');
function flasiService(){
    
    const queryURL = config.FlaSi.urlbase + "/query/execute";

    return {
        
        sync(req, res) {
            //Vraagt nieuwe data op uit FlaSi, stopt de data in MongoDB.

            //TODO: tijd aan geven vanaf waar gesynct moet worden
            //TODO: Sql bepalen en vervangen voor de temp sql
            
            const tempSqlQuery = "select * from aankoop limit 50"
            let body = JSON.stringify([{
                name: "query",
                type: "mysql-query",
                example: "",
                value: tempSqlQuery
            }])
            fetch(queryURL, { method: 'POST', body: body })
                .then(data => data.json())
                .then(data => {

                    //Doe dingen met de result.

                }).catch(err => res.sendStatus(500));
        },

        sendStateChange(harware, interaction, state){
            //Verzend nieuwe state op naar FlaSi.
        }
    }
}

module.exports = flasiService();