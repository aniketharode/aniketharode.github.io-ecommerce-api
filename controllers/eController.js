const mongoose = require('mongoose')

const productModel = mongoose.model('product');
const cartsModel = mongoose.model('carts');
const response = require('../libs/responselib');
const logger = require('../libs/loggerLib');

const shortid = require('shortid');

let re ;
let price;

let createProduct = (req,res) => {


    var productId = shortid.generate();


let newProduct = new productModel ({
   
    productId:productId,
    productName:req.body.productName,
    price:req.body.price,
    description:req.body.description,
    image:req.body.image,
    category:req.body.category,
    quantityAvailable:req.body.quantityAvailable,
    cartPrice:req.body.price,
    //cartQuantity:req.body.cartQuantity
    
})


newProduct.save((err, result) => {
if(err){
    logger.error('error occured ','create product',10);
    let apiresponse = response.generate(true,'error while creating the product',500,null);
    res.send(apiresponse);
}
else{
    logger.info('product created','create product',10);
    let apiresponse = response.generate(false,'created the product',200,result);
    res.send(apiresponse);
}

})

}


let viewByProductId = (req, res) => {

    productModel.findOne({ 'productId': req.params.productId }, (err, result) => {

        if (err) {

            logger.error('error occured ','viewByProductId',5);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined','viewByProductId',10);
            let apiresponse = response.generate(true,'Not find the product',403,null);
            res.send(apiresponse);

        } else {

            logger.info('Product Found Successfully','viewByProductId',10);
            let apiresponse = response.generate(false,'Product Found Successfully',200,result);
              if(req.params.flag==1)
                res.send(apiresponse);
                else{
                    createCarts(req,res,result);
                }
               
               
        }
    })
}






let createCarts = (req,res,re) => {

let newCarts = new cartsModel ({
   
    productId:req.params.productId,
    productName:re.productName,
    cartPrice:re.price,
   // cartQuantity:req.body.cartQuantity
})


newCarts.save((err, result) => {
if(err){

    logger.error('error occured ','createCarts',5);
    let apiresponse = response.generate(true,'Error occured while creating the cart product',500,null);
    res.send(apiresponse);
}
else{
    logger.info('Product is added to cart Successfully','createCarts',10);
    let apiresponse = response.generate(false,'Product is added to cart Successfully',200,result);
    res.send(apiresponse);

        
}

})

}







/**
 * function to edit blog by admin.
 */
let editProduct = (req, res) => {

    let options = req.body;
    console.log(options);
    productModel.findOneAndUpdate({ 'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {

        if (err) {

            logger.error('error occured','editProduct',10);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined','editProduct',10);
            let apiresponse = response.generate(true,'product not found in product collection',404,null);
            res.send(apiresponse);

        } else {

           logger.info('in the edit product as product found','editProduct',10);
            
            if(options.productName || options.price){

           logger.info('edited are productName and price transfer to cart to edit the product in cart as well','editProduct',10);
            editCartProduct(req,res,options,result);
           
            }
            else{
               // result = {options.productName,};
               logger.info('edited are not productName and price so in the edit product','editProduct',10);
            

                productModel.findOne({ 'productId': req.params.productId }, (err, result) => {
                    logger.info('find the updated value from the product','editProduct',10);
                    let apiresponse = response.generate(true,'Product Edited Successfully.',200,result);
                    res.send(apiresponse);
                })

            
        }
          //editCartProduct(req,res,options);
        }
    })
}




let editCartProduct = (req, res,op,re) => {

    let options = op;
    options.cartPrice = options.price;
    logger.info('options edit cart:-'+options.cartPrice,'editCartProduct',10);
    cartsModel.findOne({ 'productId': req.params.productId }).exec((err, result) => {

        if (err) {

            logger.error('error occured','editCartProduct',10);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined as the product not in cart','editCartProduct',10);
            re.price= options.price;
            let apiresponse = response.generate(true,'Product Edited Successfully.',200,re);
            res.send(apiresponse);


        } else {
          // console.log('edited carts succefully');
           result.cartPrice = options.price* result.cartQuantity;
           re.price= options.price;
           result.save((err, result) => {
            if(err){
                logger.error('error occured ','editCartProduct',10);
            }
            else{
                logger.info('product find the carts as well','editCarts',10);

                productModel.findOne({ 'productId': req.params.productId }).exec((err, result) => {
                   
                    logger.info('find the updated value from the product inside the carts','editCartProduct',10);    
                    let apiresponse = response.generate(true,'Product Edited Successfully.',200,result);
                    res.send(apiresponse);

                })

            }
            
            })
           
        }
    })
}



let editCartPrice = (req, res) => {

    cartsModel.findOne({ 'productId': req.params.productId }).exec((err, result) => {

        if (err) {

            logger.error('error occured','editCartPrice',10);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined','editCartPrice',10);
            let apiresponse = response.generate(true,'product not found in carts collection',404,null);
            res.send(apiresponse);

        } else {
          // console.log('edited carts succefully');
          if(result.cartQuantity==1)
          this.price = result.cartPrice;

          result.cartQuantity += 1;
          result.cartPrice = this.price*result.cartQuantity;
           
           result.save((err, result) => {
            if(err){

                logger.error('error occured','editCartPrice',10);
                let apiresponse = response.generate(true,'Error occured while saving the data to carts',500,null);
                res.send(apiresponse);
            }
            else{

                logger.info('carts price is increased','editCartPrice',10);    
                let apiresponse = response.generate(true,'CartPrice and quantity increased Successfully.',200,result);
                res.send(apiresponse);
            }
            
            })
           
        }
    })
}





let decreaseCartPrice = (req, res) => {

    cartsModel.findOne({ 'productId': req.params.productId }).exec((err, result) => {

        if (err) {

            logger.error('error occured','decreaseCartPrice',10);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined','decreaseCartPrice',10);
            let apiresponse = response.generate(true,'product not found in carts collection',404,null);
            res.send(apiresponse);

        } else {
          // console.log('edited carts succefully');
          if(result.cartQuantity==1){
              
            logger.error("reach the minimum qantity of 1 can't make it less",'decreaseCartPrice',10);
            let apiresponse = response.generate(true,"reach the minimum qantity of 1 can't make it less",404,null);
            res.send(apiresponse);
           
          }
          else{

            result.cartPrice -= (result.cartPrice)/result.cartQuantity;
            result.cartQuantity -= 1;
            
            
            result.save((err, result) => {
             if(err){
                logger.error('error occured','decreaseCartPrice',10);
                let apiresponse = response.generate(true,'Error occured while geting data',500,null);
                res.send(apiresponse);
             }
             else{

                logger.info('carts price is edited','editCartPrice',10);    
                let apiresponse = response.generate(true,'CartPrice and quantity edited Successfully.',200,result);
                res.send(apiresponse);

             }
             
             })
          }
          
           
        }
    })
}







let deleteProduct = (req, res) => {

    productModel.findOneAndRemove({ 'productId': req.params.productId }, (err, result) => {
        if (err) {

            logger.error('error occured','deleteProduct',4);
            let apiresponse = response.generate(true,'Error occured while deleting data from product collections',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined','deleteProduct',10);
            let apiresponse = response.generate(true,'product not found in product collection',404,null);
            res.send(apiresponse);

        } else {
            //let apiresponse = generate.generate(false,'deleted blog',200,result);
            logger.info('product is deleted from product collections now go to carts','deleteProduct',10);    
            deleteProductToCart(req,res,result);
           // res.send(result);

        }
    })
}


let deleteProductToCart = (req, res,re) => {

    cartsModel.findOneAndRemove({ 'productId': req.params.productId }, (err, result) => {
        if (err) {

            logger.error('error occured','deleteProductToCart',4);
            let apiresponse = response.generate(true,'Error occured while deleting data from carts collections',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('product not found in carts but deleted from product collections','deleteProductToCart',10);
            let apiresponse = response.generate(false,'Product removed Successfully.',200,re);
            res.send(apiresponse);
             // res.send(re);
            
        } else {
            //let apiresponse = generate.generate(false,'deleted blog',200,result);
            logger.info('product is deleted from product and carts collections','deleteProductToCart',10);    
            let apiresponse = response.generate(false,'Product removed Successfully.as well from carts',200,re);
            res.send(apiresponse);

        }
    })
}




let deleteCart = (req, res) => {

    cartsModel.findOneAndRemove({ 'productId': req.params.productId }, (err, result) => {
        if (err) {

            logger.error('error occured','deleteCart',1);
            let apiresponse = response.generate(true,'Error occured while deleting data from carts collections',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('product not found in carts collections','deleteCart',10);
            let apiresponse = response.generate(true,'product not found in carts collections',404,null);
            res.send(apiresponse);

        } else {

            logger.info('product is deleted from carts collections','deleteCart',10);    
            let apiresponse = response.generate(false,'CartProduct removed  successfully.',200,result);
            res.send(apiresponse);

        }
    })
}






let buyProduct = (req, res) => {

    cartsModel.findOneAndRemove({ 'productId': req.params.productId}, (err, result) => {
        if (err) {

            logger.error('error occured','buyProduct',1);
            let apiresponse = response.generate(true,'Error occured while getting data from carts collections',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('product not found in carts collections','buyProduct',10);
            let apiresponse = response.generate(true,'product not found in carts collections please add product in carts',404,null);
            res.send(apiresponse);

        } else {

            logger.info('product is deleted from carts collections now going to decreases the prodct quantity ','buyProduct',10);    
           
           updateProductQuantity(req,res,result);
           // res.send(result);

        }
    })
}




let updateProductQuantity = (req, res,re) => {

    //let options = op;
    //options.cartPrice = options.price;
    //console.log("options edit cart:-"+options.cartPrice+"request:-"+req.params.productId);
    productModel.findOne({ 'productId': req.params.productId }).exec((err, result) => {

        if (err) {

            logger.error('error occured','updateProductQuantity',1);
            let apiresponse = response.generate(true,'Error occured while getting data from products collections',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('product not found in products collections','updateProductQuantity',1);
            let apiresponse = response.generate(true,'product not found in products collections please add product in carts',404,null);
            res.send(apiresponse);

        } else {
         
          
          result.quantityAvailable -= re.cartQuantity;
          result.save((err, result) => {
            if(err){

                logger.error('error while decresing the product quantity in  products collections','updateProductQuantity',1);
            }
            else{

                logger.info('Product Buyed Successfully.','updateProductQuantity',10);    
                let apiresponse = response.generate(false,'Product Buyed Successfully.',200,result);
                res.send(apiresponse);

            }
            
            })
          
           
           
           
           
        }
    })
}





let viewByProductName = (req, res) => {

    productModel.find({ 'productName': req.params.productName}, (err, result) => {

        if (err) {
            logger.error('error occured','viewByProductName',5);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            logger.error('error occured as result is undefined','viewByProductName',10);
            let apiresponse = response.generate(true,'product not found',404,null);
            res.send(apiresponse);
        } else {
            logger.info('get product by name','viewByProductName',10);
            let apiresponse = response.generate(false,'Product Found Successfully.',200,result);
            res.send(apiresponse);
               
        }
    })
}




let viewByProductCategory = (req, res) => {

    productModel.find({ 'category': req.params.category}, (err, result) => {

        if (err) {
            logger.error('error occured','viewByProductCategory',5);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);
        } else if (result == undefined || result == null || result == '') {
            logger.error('error occured as result is undefined','viewByProductCategory',10);
            let apiresponse = response.generate(true,'product not found',404,null);
            res.send(apiresponse);
        } else {
            logger.info('get product by category','viewByProductCategory',10);
            let apiresponse = response.generate(false,'Product Found Successfully.',200,result);
            res.send(apiresponse);
               
        }
    })
}






let getAllProduct = (req, res) => {

    productModel.find((err, result) => {

        if (err) {

            logger.error('error occured','getAllProduct',5);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined','getAllProduct',10);
            let apiresponse = response.generate(true,'product not found',404,null);
            res.send(apiresponse);

        } else {

            logger.info('get all the products','getAllProduct',10);
            let apiresponse = response.generate(false,'All Product Details Found',200,result);
            res.send(apiresponse); 
               
        }
    });
}




let getAllCartsProduct = (req, res) => {

    cartsModel.find((err, result) => {

        if (err) {

            logger.error('error occured','getAllCartsProduct',5);
            let apiresponse = response.generate(true,'Error occured while geting data',500,null);
            res.send(apiresponse);

        } else if (result == undefined || result == null || result == '') {

            logger.error('error occured as result is undefined','getAllCartsProduct',10);
            let apiresponse = response.generate(true,'cart product not found',404,null);
            res.send(apiresponse);

        } else {

            logger.info('geting all the cart products','getAllCartsProduct',10);
            let apiresponse = response.generate(false,'CartProduct found  Successfully.',200,result);
            res.send(apiresponse); 
        }
    });
}





















module.exports = {
createProduct:createProduct,
//createCarts:createCarts
viewByProductId:viewByProductId,
//createCarts:createCarts,
editProduct:editProduct,
editCartPrice:editCartPrice,
deleteProduct:deleteProduct,
deleteCart:deleteCart,
buyProduct:buyProduct,
decreaseCartPrice:decreaseCartPrice,
viewByProductName:viewByProductName,
viewByProductCategory:viewByProductCategory,
getAllProduct:getAllProduct,
getAllCartsProduct:getAllCartsProduct
}