const Config = require("../config.json");

function Debug(){

    return {
        log(tag, msg){
            
            if(Config.runmode.toLowerCase() === "debug") console.log(`${tag}: ${msg}`);
        
        }
    }
}

module.exports = Debug();