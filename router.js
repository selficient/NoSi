const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const hardwaremanager = require('./hardwaremanager.js');
const cors = require('cors');
router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function (req, res) {
  res.send('Oh hallo, wat dou jij nou hier?');
});

router.post('/updatestate', upload.array(), function (req, res) {
    hardwaremanager.updateState(req, res);
});
router.post('/getstate', upload.array(), function (req, res) {
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

module.exports = router;
