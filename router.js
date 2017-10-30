const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const hardwaremanager = require('./hardwaremanager.js');
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.send('Oh hallo, wat dou jij nou hier?')
})

router.post('/updatestate', upload.array(), function (req, res, next) {
    hardwaremanager.updateState(req, res);
});
router.post('/getstate', upload.array(), function (req, res, next) {
    hardwaremanager.getState(req, res);
});
module.exports = router
