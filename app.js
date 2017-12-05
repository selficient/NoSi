//hallo dit is een app.js
const express = require('express');
const app = express();
const router = require("./router.js");
app.use('/dashboard', express.static('./public'));
app.use("/service/", router);
app.get("/", (req, res) => {
    res.send('<head><style>#face{animation: face-color 5s infinite; animation-direction: alternate;}@keyframes face-color {from {color:black;} to {color:Chartreuse}}</style></head><body><h1 id="face">(⊙_☉)</h1></body>');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
//database.insert("hardware", template, () => console.log("bla"));
//database.find("hardware", {name:"Lampje"}, () => console.log("bla"))
