//TODO: add description of file
const database = require("../util/database.js");
const uuid = require("uuid/v4");
const Debug = require("../util/debug.js");
const TAG = "Hardware Manager";
const flasiservice = require("./flasiservice.js");
function hardwaremanager() {
    
    //Checks if apikey is valid
    
    return {
        updateState(req, res) {
            //TODO: Add security checks
            if (!req.body || !req.body.name || !req.body.interaction || !req.body.state) {
                return res.send("No Data Found");
            }

            Debug.log(TAG, req.body);
            
            //Zoek hardware in de database
            database.find("hardware", { name: req.body.name }).then(result => {
                if (result.length == 0) {
                    return res.send("No Data Found");
                }
                //Haar result uit een array voor convenience (de array bevat maar 1 item)
                result = result[0];

                //TODO: Dit stuk afhandelen in db filter:
                let interaction = result.interactions.find(x => x.name === req.body.interaction);
                if (!interaction) return res.send("No Interaction Found");
                let action = interaction.actions.find(x => x.description === req.body.state);
                if (!action) return res.send("No action found");

                let date = new Date();

                //Insert een niew actionlog item in de database
                database.insert("actionlog", {
                    hardwareID: result.id,
                    hardwareName: result.name,
                    date: date.toLocaleString(),
                    interaction: interaction.name,
                    action: action.description,
                    state: action.code
                }, () => Debug.log(TAG, "inserted"));

                result.state.find(x => x.name === req.body.interaction).state = action.code;
                //Update de daadwerkelijke state in de database
                database.update("hardware", { name: req.body.name }, result, x => {
                    res.send(x);
                    flasiservice.sendStateChange(result.flasi_id,0, action.code);
                });

                //Send request to FlaSi
                
            }).catch(err => console.log(err));
        },

        testSecurity(req, res) {
            //TODO: Test security HIER

            res.send("Response");
            JSON.stringify``
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
                res.send(JSON.stringify({hardware: result}));
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
