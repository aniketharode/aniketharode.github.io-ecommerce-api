const mongoose = require('mongoose');
const express = require("express");
const appConfig = require('./config/appConfig');

const app = express();



//app.listen(appConfig.port,()=>{
    //let db =  mongoose.connect(appConfig.db.producturi,{useNewUrlParser:true});
    mongoose.connect(appConfig.db.carturi,{useNewUrlParser:true});
    //let db2 =  mongoose.connect(appConfig.db.purchaseuri,{useNewUrlParser:true});
// });

//mongoose.connect(appConfig.db.carturi,{useNewUrlParser:true});

/*
mongoose.connection.on('error',function(err){
    console.log("connection to db failed");
})




mongoose.connection.on('open',function(err){
if(err){
    console.log("connection error in open");
}
else{
    console.log("connection success!!");
}
})

*/

module.exports = exports = mongoose;

