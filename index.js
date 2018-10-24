const express = require("express");
const appConfig = require('./config/appConfig');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const fs = require('fs');
const handler = require('./middleware/appErrorHandlers');
const routeLogger = require('./middleware/routeLogger');
const helmet = require('helmet');
const http = require('http');
const logger = require('./libs/loggerLib');
//const controller = require('./controllers/eController');

const app = express();

let db1;
let db2;
let db3;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(handler.errorHandler);

app.use(routeLogger.logIp);

app.use(helmet());


 let modelpath = './model';

 fs.readdirSync(modelpath).forEach((file) => {
     console.log("in model path");
     if(~file.indexOf('.js')){
     require(modelpath+'/'+file);
     }
     });
 
    
 
 
 let routespath = './routes';
 
 fs.readdirSync(routespath).forEach((file) => {
    console.log("in routes path");
 if(~file.indexOf('.js')){
 let route = require(routespath+'/'+file);
 route.setRouter(app);
 }
 });


 app.use(handler.notFoundHandler);
 



/**
 * Create HTTP server.
 */

const server = http.createServer(app);
server.listen(appConfig.port);
server.on('error',onError);
server.on('listening',onListening);


function onError(error) {
    if(error.syscall != 'listen'){
      logger.error(error.code+ ' not equal listen', 'serverOnErrorHandler', 10);
    }

    switch(error.code){
       case 'EACCES':
       logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
       process.exit(1)
       break
   case 'EADDRINUSE':
       logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
       process.exit(1)
       break
   default:
       logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
       throw error
    }

}



/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})




/*
 app.listen(appConfig.port,()=>{
    let db =  mongoose.connect(appConfig.db.uri,{useNewUrlParser:true});
    //let db1 =  mongoose.connect(appConfig.db.carturi,{useNewUrlParser:true});
    //let db2 =  mongoose.connect(appConfig.db.purchaseuri,{useNewUrlParser:true});
 });
*/





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


 //app.post('/product',controller.createProduct);




 

