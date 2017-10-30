//TODO: add description of file
const database = require("./database.js");


function updateState(req, res){
    //TODO: Add security checks
    if(!req.body || !req.body.name || !req.body.interaction || !req.body.state){
        return res.send("No Data Found");
    }
    //Zoek hardware in de database
    database.find("hardware", {name : req.body.name}, (result) => {
        if(result.length == 0){
            return res.send("No Data Found");
        }
        result.interactions.find(item => {
            if(!item[req.body.interaction]){
                return res.send("No Interaction Found");
            }
            if(!item[req.body.interaction][req.body.state]){
                return res.send("This state is not supported by interaction")
            }
            //TODO: Voeg update functionaliteit toe.
            res.send(item[req.body.interaction][req.body.state]);
        });
        //res.send(result);
    });
}
function getState(req, res){
    //TODO: Add security checks
    if(!req.body || !req.body.name){
        return res.send("No Data Found");
    }
    database.find("hardware", {name : req.body.name}, (result) => {
        if(result.length == 0){
            return res.send("No Data Found");
        }
        res.send(result);
    });
}

module.exports = {
    updateState: updateState,
    getState: getState,
    updateState: updateState
}
