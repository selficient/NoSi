//hallo dit is een app.js
var fs = require('fs');
var https = require('https');
const express = require('express');
const app = express();
const router = require("./router.js");
const port = 3000;
var helmet = require('helmet')
app.use(helmet());

  
app.use('/dashboard', express.static('./public'));
app.use("/service/", router);
app.get("/", (req, res) => {
    res.send('<head><style>#face{animation: face-color 5s infinite; animation-direction: alternate;}@keyframes face-color {from {color:black;} to {color:Chartreuse}}</style></head><body><h1 id="face">(⊙_☉)</h1></body>');
});

const options = {
    key: fs.readFileSync('./turnipinator.pem', 'utf8'),
    cert: fs.readFileSync('./turnipinator.crt', 'utf8')
};

https.createServer(options, app).listen(port);



//database.insert("hardware", template, () => console.log("bla"));
//database.find("hardware", {name:"Lampje"}, () => console.log("bla"))