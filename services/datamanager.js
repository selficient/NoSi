//TODO: add description of file
const databaseClass = require("../util/database.js");
const TAG = "Data Manager";
const Debugger = require("../util/debug.js");
const Debug = Debugger(TAG);
const flasiservice = require("./flasiservice.js");

function datamanager() {
    var database = new databaseClass();

    return {
        async getData(req, res) {
            try {
                if(req.params.hardwarenaam) {
                    let hardware = await database.find("hardware", `name = '${req.params.hardwarenaam}'`);
                    let logs = await database.find("log", `hardware_id = ${hardware[0].id}`);
                    
                    let dataSet = {"label": req.params.hardwarenaam};
                    let values = [];
                    for(let log of logs) {
                        let d = new Date(log.timestamp);
                        switch (d.getMonth()) {
                            case 0:
                                if(values.findIndex(entry => entry.month == "January") == -1) {
                                    values.push({"month": "January", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "January")].count++;
                                }
                                break;
                            case 1:
                                if(values.findIndex(entry => entry.month == "February") == -1) {
                                    values.push({"month": "February", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "February")].count++;
                                }
                                break;
                            case 2:
                                if(values.findIndex(entry => entry.month == "March") == -1) {
                                    values.push({"month": "March", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "March")].count++;
                                }
                                break;
                            case 3:
                                if(values.findIndex(entry => entry.month == "April") == -1) {
                                    values.push({"month": "April", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "April")].count++;
                                }
                                break;
                            case 4:
                                if(values.findIndex(entry => entry.month == "May") == -1) {
                                    values.push({"month": "May", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "May")].count++;
                                }
                                break;
                            case 5:
                                if(values.findIndex(entry => entry.month == "June") == -1) {
                                    values.push({"month": "June", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "June")].count++;
                                }
                                break;
                            case 6:
                                if(values.findIndex(entry => entry.month == "July") == -1) {
                                    values.push({"month": "July", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "July")].count++;
                                }
                                break;
                            case 7:
                                if(values.findIndex(entry => entry.month == "August") == -1) {
                                    values.push({"month": "August", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "August")].count++;
                                }
                                break;
                            case 8:
                                if(values.findIndex(entry => entry.month == "September") == -1) {
                                    values.push({"month": "September", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "September")].count++;
                                }
                                break;
                            case 9:
                                if(values.findIndex(entry => entry.month == "October") == -1) {
                                    values.push({"month": "October", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "October")].count++;
                                }
                                break;
                            case 10:
                                if(values.findIndex(entry => entry.month == "November") == -1) {
                                    values.push({"month": "November", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "November")].count++;
                                }
                                break;
                            case 11:
                                if(values.findIndex(entry => entry.month == "December") == -1) {
                                    values.push({"month": "December", "count": 1});
                                } else {
                                    values[values.findIndex(entry => entry.month == "December")].count++;
                                }
                                break;
                        }
                    }
                    let monthNames = {
                        "January": 1,
                        "February": 2,
                        "March": 3,
                        "April": 4,
                        "May": 5,
                        "June": 6,
                        "July": 7,
                        "August": 8,
                        "September": 9,
                        "October": 10,
                        "November": 11,
                        "December": 12
                      };

                    values.sort((a, b) => {
                        return monthNames[a.month] - monthNames[b.month];
                    });

                    dataSet.labels = [];
                    dataSet.data = [];
                    for (let value of values) {
                        dataSet.labels.push(value.month);
                        dataSet.data.push(value.count);
                    }

                    res.send(dataSet);
                }
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        }
    }
}

module.exports = datamanager();