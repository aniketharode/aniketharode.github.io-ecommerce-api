// importing mongoose module
//const indexproduct = require('../product');
///const indexcarts = require('../carts');
const mongoose = require('mongoose')
// import schema 
const proSchema = mongoose.Schema;
const carSchema = mongoose.Schema;

console.log("insde the schema 1");

let cartSchema = new carSchema(
    {
        productId: {
            type: String,
            unique: true
        },
        productName:{
            type:String,
            default:''
        },
        cartPrice:{
            type:Number,
            default:''
        },
        cartQuantity:{
            type:Number,
            default:1
        }
    }
)




let productSchema = new proSchema(
    {
        productId: {
            type: String,
            unique: true
        },
        productName:{
            type:String,
            default:''
        },
        price:{
            type:Number,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        image:{
            type:String,
            default:''
        },
        category:{
            type:String,
            default:''
        },
        quantityAvailable:{
            type:Number,
            default:1
        },
       
    }
)





console.log("insde the schema 2");

mongoose.model('product', productSchema);
mongoose.model('carts', cartSchema);