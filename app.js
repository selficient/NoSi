//hallo dit is een app.js
var fs = require('fs');
var https = require('https');
const express = require('express');
const app = express();
const router = require("./router.js");
var helmet = require('helmet')
app.use(helmet());

  
app.use('/dashboard', express.static('./public'));
app.use("/service/", router);
app.get("/", (req, res) => {
    res.send('<head><style>#face{animation: face-color 5s infinite; animation-direction: alternate;}@keyframes face-color {from {color:black;} to {color:Chartreuse}}</style></head><body><h1 id="face">(⊙_☉)</h1></body>');
});

const options = {
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8')
};

//app.listen(3000)
https.createServer(options, app).listen(8443);


// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });



//database.insert("hardware", template, () => console.log("bla"));
//database.find("hardware", {name:"Lampje"}, () => console.log("bla"))