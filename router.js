const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require("./config.json");
const APIKeys = require("./APIKEYS.json");
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const hardwaremanager = require('./services/hardwaremanager.js');
const cors = require('cors');
router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//Register API key validation as middleware for all '/service' routes
router.use(validateAPIKey);

router.get('/', function (req, res) {
  res.send('Oh hallo, wat dou jij nou hier?');
});

router.post('/updatestate', upload.array(), function (req, res) {
    hardwaremanager.updateState(req, res);
});
router.get('/getstate/:name', upload.array(), function (req, res) {
    hardwaremanager.getState(req, res);
});
router.get('/getallhardware', upload.array(), function(req, res){
    hardwaremanager.getAllHardware(req, res);
});
router.get('/getactionlog', upload.array(), function(req, res){
    hardwaremanager.getActionLog(req, res);
});
router.post('/new', upload.array(), function(req, res){
    hardwaremanager.newHardware(req, res);
});
router.get('/test', upload.array(), function(req, res){
    hardwaremanager.testSecurity(req, res);
});

function validateAPIKey(req, res, next){
    //Valideer API key, Key object heeft een role die gebruikt kan worden om dingen af te schermen (Wordt nu nog niet gebruikt)
    console.log("Validating");
    if(!req.query.apikey) return res.sendStatus(401);
    if(!APIKeys.some(k => k.key === req.query.apikey)) res.sendStatus(401);
    
    next();
}
module.exports = router;
