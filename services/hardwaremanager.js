//TODO: add description of file
const databaseClass = require("../util/database.js");
const TAG = "Hardware Manager";
const Debugger = require("../util/debug.js");
const Debug = Debugger(TAG);
const flasiservice = require("./flasiservice.js");

function hardwaremanager() {

    var database = new databaseClass();

    //Checks if apikey is valid
    databasename = "area";
    var hardwarenames = ["Staande_lamp_1",
        "slide-door",
        "VE_Air_Terminal_Wall_Grille_MEPcontent_Trox_SL-DG",
        "VK102",
        "Paneli1_vin",
        "Fire_Alarm-Intelligent_Detector-UTC-Multisensor_Detectors",
        "32_binnendeur[7206040]",
        "Lamp_eettafel[4643785]",
        "Lamp_eettafel[4688990]",
        "Lamp_eettafel[4689006]",
        "arwa_cityplus_basin_faucet[4794141]",
        "Fire_Alarm-Intelligent_Detector-UTC-Multisensor_Detectors [4689",
        "Inperla[4679315]",
        "32_binnendeur[7202788]",
        "Wasmachine",
        "Inperla[4679340]",
        "Inperla[4679360]"];

    function indexof(index) {
        var i = hardwarenames.indexOf(index);
        return i;
    }

    return {
        async updateState(req, res) {
            //TODO: Add security checks try and do this with API keys.
            if (!req.body || !req.body.name || !req.body.interaction || !req.body.state) {
                return res.send("No Data Found");
            }

            //Zoek hardware in de database
            try {
                let hardwareResult = await database.find("hardware", `name = '${req.body.name}'`);
                if (hardwareResult.length == 0) {
                    return res.send("No Data Found");
                }
                //Haar result uit een array voor convenience (de array bevat maar 1 item)
                hardwareResult = hardwareResult[0];

                //TODO: Dit stuk afhandelen in db filter:
                let interactionResult = await database.find("interactions", `hardware_id = ${hardwareResult.id} AND name = '${req.body.interaction}' AND code = '${req.body.state}'`);
                interactionResult = interactionResult[0];
                if (!interactionResult) res.send("No Interaction Found");

                //Insert een niew actionlog item in de database
                let result = await database.insert("log", {
                    "hardware_id": hardwareResult.id,
                    "timestamp": "CURRENT_TIMESTAMP()",
                    "interactions_id": interactionResult.id,
                    "state": interactionResult.code
                });

                if(result) Debug(`Inserted into log: ${result}`);

                //console.log(result);
                hardwareResult.state = interactionResult.code;
                //  result.state.find(x => x.name === req.body.interaction).state = action.code;
                //Update de daadwerkelijke state in de database
                let updateResult = await database.update("hardware", "state", hardwareResult.state, `id = ${hardwareResult.id}`);
                if(updateResult) {
                    Debug(`updated ${updateResult} rows`);
                    res.send ('succes');
                }

                //Send request to FlaSi
            }
            catch(error) {
                Debug(error);
                res.status(500).send(error.message);
            }
        },
        updateBase(req, res) {
            if (!req.body || !req.body.name || !req.body.base || !req.body.type || !req.body.dataset) {
                return res.send("No Data Found");
            }

            Debug(req.body);
            index= indexof(req.body.name);
            querybase= "hardware."+index+".log.0.base64";
            querydata= "hardware."+index+".log.0.type";
            querytype= "hardware."+index+".log.0.dataset";
            console.log(querytype);
            database.update("area", {id: '4'}, {$set: {querybase: req.body.base}});
            database.update("area", {id: '4'}, {$set: {querytype: req.body.type}});
            database.update("area", {id: '4'}, {$set: {querydata: req.body.dataset}});
        },
        testSecurity(req, res) {
            //TODO: Test security HIER

            res.send("Response");
            JSON.stringify``
        },

        async getState(req, res) {
            //TODO: Add security checks
            try {
                if (!req.params.name) {
                    return res.send("No Data Found");
                }
                let result = await database.find("hardware", `name = '${req.params.name}'`);
                if (result.length == 0) {
                    res.send("No Data Found");
                } else {
                    res.send(JSON.stringify(result[0].state));
                }
            }
            catch(error) {
                Debug(error);
                res.status(500).send(error.message);
            }
        },
        getBase(req, res) {
            if (!req.params.name) {
                return res.send("No Data Found");
            }
            database.find(databasename, {$and: [{id: '4'}, {hardware: {$elemMatch: {name: req.params.name}}}]}).then(result => {
                if (result.length == 0) {
                    return res.send("No Data Found");
                }

                res.send(result[0].hardware[indexof(req.params.name)].log[0]);
            });
        },
        async newHardware(req, res) {
            try {
                if (!req.body.hardware) return res.send("No Data");
                    let result = await database.insert("hardware", req.body.hardware);

                    if(result) {
                        Debug(`inserted with id: ${result}`);
                        res.send ('succes');
                    }
            }
            catch (error) {
                Debug(error);
                res.status(500).send(error.message);
            }
        },

        async getAllHardware(req, res) {
            try {
                let result = {};
                let area1 = {};
                let area = await database.find('area', `name = 'keuken'`);
                area1.id = area[0].id;
                area1.areaname = area[0].name; 
                let hardwareArray = await database.find('hardware', `area_id = ${area[0].id}`);

                let hardwareOutput = [];
                for (let hardware of hardwareArray) {
                    let stateResult = await database.find('interactions', `code = ${hardware.state} AND hardware_id = ${hardware.id}`);
                    let state = {"description":stateResult[0].description, "code":stateResult[0].code, "name":stateResult[0].name};

                    let interactionsResult = await database.find('interactions', `hardware_id = ${hardware.id}`);
                    let interactions = [];
                    for (let interaction of interactionsResult) {
                        let interactionIndex = interactions.findIndex(inter => inter.name == interaction.name);
                        if (interactionIndex == -1) {
                            interactions.push({ "name": interaction.name, "actions": [{"description":interaction.description, "code":interaction.code, "name":interaction.name}]});
                        } else {
                            interactions[interactionIndex].actions.push({"description":interaction.description, "code":interaction.code, "name":interaction.name});
                        }
                    } 

                    hardwareOutput.push({"id":hardware.id, "name":hardware.name, "state": state, "type": { "name":hardware.type}, "interactions": interactions});
                }
                area1.hardware = hardwareOutput;
                let areas = [area1];
                result.area = areas;
                res.send(JSON.stringify(result));
            }
            catch(error) {
                Debug(error);
                res.status(500).send(error.message);
            }
        },

        async getAreas(req, res) {
            //TODO: Implementeer security checks
            try {
                let result = await database.find('area');
                res.send(JSON.stringify(result));
            }
            catch(error) {
                Debug(error);
                res.status(500).send(error.message);
            }
        }
    };
}

module.exports = hardwaremanager();
