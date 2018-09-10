const mongoose = require('mongoose');
const express = require("express");
const appConfig = require('./config/appConfig');

const app = express();



//app.listen(appConfig.port,()=>{
     mongoose.connect(appConfig.db.producturi,{useNewUrlParser:true});
    //let db1 =  mongoose.connect(appConfig.db.carturi,{useNewUrlParser:true});
    //let db2 =  mongoose.connect(appConfig.db.purchaseuri,{useNewUrlParser:true});
 //});

//mongoose.connect(appConfig.db.carturi,{useNewUrlParser:true});






module.exports = exports = mongoose;

