//TODO: add description of file
const database = require("./database.js");
const template = require("./hardwaretemplate.json");
//database.update("hardware", {name: "Lampje"}, template, ding => {console.log("Hoi")});
function updateState(req, res){
    //TODO: Add security checks
    if(!req.body || !req.body.name || !req.body.interaction || !req.body.state){
        return res.send("No Data Found");
    }
    //TODO: Nieuwe Hardware template implementeren
    console.log(req.body)
    //Zoek hardware in de database
    database.find("hardware", {name : req.body.name}, (result) => {
        result = result[0]
        //console.log(result[0]);
        if(result.length == 0){
            return res.send("No Data Found");
        }
        if(!result.interactions[req.body.interaction]){
            return res.send("No Interaction Found");
        }
        if(!result.interactions[req.body.interaction][req.body.state]){
            return res.send("This state is not supported by interaction");
        }
        //TODO: Implementeer actionlog update.
        result.state[req.body.interaction] = result.interactions[req.body.interaction][req.body.state];
        database.update("hardware", {name: req.body.name}, result, x => res.send(x));

        //res.send(item[req.body.interaction][req.body.state]);
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
