const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require("./config.json");
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const cors = require('cors');
//const APIKeys = require("./APIKEYS.json");
const datamanager = require("./services/datamanager.js");

//Create a Debugger
const TAG = "Graph Router"
const Debugger = require("./util/debug.js");
const Debug = Debugger(TAG);

router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/dataset/:hardwarenaam', (req, res) => {
    datamanager.getData(req, res);
});

module.exports = router;
