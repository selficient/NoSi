//hallo dit is een app.js
const express = require('express');
const app = express();
const router = require("./router.js");
const database = require("./database.js");
const template = require("./hardwaretemplate.json");
app.use("/service/", router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
//database.insert("hardware", template, () => console.log("bla"));
//database.find("hardware", {name:"Lampje"}, () => console.log("bla"))
