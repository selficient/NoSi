//TODO: add description of file
const database = require("./database.js");
const template = require("./hardwaretemplate.json");
//database.update("hardware", {name: "Lampje"}, template, ding => {console.log("Hoi")});
function updateState(req, res){
    //TODO: Add security checks
    if(!req.body || !req.body.name || !req.body.interaction || !req.body.state){
        return res.send("No Data Found");
    }
    console.log(req.body)
    //Zoek hardware in de database
    database.find("hardware", {name : req.body.name}, (result) => {
        result = result[0]
        //console.log(result[0]);
        if(result.length == 0){
            return res.send("No Data Found");
        }
        let interaction = result.interactions.find(x => x.name === req.body.interaction);
        if(!interaction) return res.send("No Interaction Found");
        let action = interaction.actions.find(x => x.description === req.body.state);
        if(!action) return res.send("No action found");
        let date = new Date();
        database.insert("actionlog", {
            hardwareID: result.id,
            date: date.toLocaleString(),
            interaction: interaction.name,
            action: action.description,
            state: action.code
        }, x => console.log("inserted"))
        result.state.find(x => x.name === req.body.interaction).state = action.code;
        database.update("hardware", {name: req.body.name}, result, x => res.send(x));
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
