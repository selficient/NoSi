//TODO: add description of file
const database = require("../util/database.js");
const uuid = require("uuid/v4");

function hardwaremanager() {
    
    //Checks if apikey is valid
    

    return {
        updateState(req, res) {
            //TODO: Add security checks
            if (!req.body || !req.body.name || !req.body.interaction || !req.body.state) {
                return res.send("No Data Found");
            }
            console.log(req.body);
            //Zoek hardware in de database
            database.find("hardware", { name: req.body.name }).then(result => {
                if (result.length == 0) {
                    return res.send("No Data Found");
                }
                result = result[0];

                //TODO: Dit stuk afhandelen in db filter:
                let interaction = result.interactions.find(x => x.name === req.body.interaction);
                if (!interaction) return res.send("No Interaction Found");
                let action = interaction.actions.find(x => x.description === req.body.state);
                if (!action) return res.send("No action found");

                let date = new Date();
                database.insert("actionlog", {
                    hardwareID: result.id,
                    hardwareName: result.name,
                    date: date.toLocaleString(),
                    interaction: interaction.name,
                    action: action.description,
                    state: action.code
                }, () => console.log("inserted"));
                result.state.find(x => x.name === req.body.interaction).state = action.code;
                database.update("hardware", { name: req.body.name }, result, x => res.send(x));
            }).catch(err => res.send(err));
        },

        testSecurity(req, res) {
            //TODO: Test security HIER

            res.send("Response");
        },

        getState(req, res) {
            //TODO: Add security checks
            if (!req.params.name) {
                return res.send("No Data Found");
            }
            database.find("hardware", { name: req.params.name }).then(result => {
                if (result.length == 0) {
                    return res.send("No Data Found");
                }
                res.send(result);
            }).catch(err => res.send(err));
        },

        newHardware(req, res) {
            //TODO: Add security checks
            if (!req.body.hardware) return res.send("No Data");
            req.body.object.id = uuid();
            database.insert("hardware", req.body.hardware, x => res.send(x));

        },

        getAllHardware(req, res) {
            //TODO: Implementeer security checks
            database.find("hardware", {}).then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        },

        getActionLog(req, res) {
            //TODO: Implementeer security checks
            database.find("actionlog", {}).then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        }
    };
}


module.exports = hardwaremanager();
