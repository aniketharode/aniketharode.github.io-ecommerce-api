const controller = require('../controllers/eController');
const appConfig = require('../config/appConfig');
const auth = require('../middleware/auth');


let setRouter = (app) => {
    let baseurl = appConfig.apiversion + '/eCommerce';

    app.post(baseurl+'/createProduct',auth.isAuthenticated,controller.createProduct);
    
    /**
	 * @api {post} /api/v1/eCommerce/createProduct Create Product
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productName productName of the product passed as a body parameter
	 * @apiParam {String} description description of the product passed as a body parameter
	 * @apiParam {Number} price price of the product passed as a body parameter
	 * @apiParam {String} category category of the product passed as a body parameter
     * @apiParam {String} image image of the product passed as a body parameter
     * @apiParam {Number} quantityAvailable quantityAvailable of the product passed as a body parameter
     * 
	 *
	 * 
     * @apiSuccessExample {json} Success-Response:
     * {
	    "error": false,
	    "message": "created the product",
	    "status": 200,
	    "data": [
		     {
			productName: String,
                        price: Number,
                        description: String,
                        image: String,
                        category: String,
                        quantityAvailable: Number,
                        _id: String,
                        productId: String,
			__v: number
						
			}

	    	     ]
	     }
	}
		
}


	  @apiErrorExample {json} Error-Response:
	 *
	 * {
  "error": true,
  "message": "Error Occured.,
  "status": 500,
  "data": null
	   
}
	 */



    app.get(baseurl+'/getProduct/:productId/:flag',controller.viewByProductId);

/**
	 * @api {get} /api/v1/eCommerce/getProduct/:productId/:flag Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {Number} flag The flag of value 1 should be passed as the URL parameter
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *   @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully.",
	    "status": 200,
	    "data": [
                     {

	    	     "productName": String,
                     "price": Number,
                     "description": String,
                     "image": String,
                     "category": String,
                     "quantityAvailable": Number,
                     "_id": String,
                     "productId": String,
		      __v: number
					 
		     }
                    ]
                  
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(baseurl+'/getAllProduct',controller.getAllProduct);


    

    
/**
 * @api {get} /api/v1/eCommerce/getAllProduct Get all products 
 * @apiversion 0.0.1
 * @apiGroup read
 * 
 * 
 *@apiSuccessExample {json} Success-Response:
 * {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
			{
				"productName": String,
                                "price": Number,
                                "description": String,
                                "image": String,
                                "category": String,
                                "quantityAvailable": Number,
                                "_id": String,
                                "productId": String,
                                __v: number
			}
	    	    ]
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
 

    app.get(baseurl+'/viewByProductName/:productName',controller.viewByProductName);




  /**
	 * @api {get} /api/v1/eCommerce/viewByProductName/:productName Get a single product by name
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * 
	 * @apiParam {String} productName The productName should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully.",
	    "status": 200,
	    "data": {
	    		"productName": String,
                        "price": Number,
                        "description": String,
                        "image": String,
                        "category": String,
                        "quantityAvailable": Number,
                        "_id": String,
                        "productId": String,
                        __v: number
		     }
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */





    app.get(baseurl+'/viewByProductCategory/:category',controller.viewByProductCategory);


   

  /**
	 * @api {get} /api/v1/eCommerce/viewByProductCategory/:category Get a single product by category
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * 
	 * @apiParam {String} category The category should be passed as the URL parameter
	 *
	 *   @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully.",
	    "status": 200,
	    "data": {
	    	     "productName": String,
                     "price": Number,
                     "description": String,
                     "image": String,
                     "category": String,
                     "quantityAvailable": Number,
                     "_id": String,
                     "productId": String,
                     __v: number
		     }
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */




    app.put(baseurl+'/editProduct/:productId',auth.isAuthenticated,controller.editProduct);


    /**
	 * @api {put} /api/v1/eCommerce/editProduct/:productId Edit a product
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * 
	 * @apiParam {String} productId The productId should be passed as the URL parameter 
     * and these will automatically updated the product if present in carts 
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Edited Successfully.",
	    "status": 200,
	    "data": {

	    	     "productName": String,
                     "price": Number,
                     "description": String,
                     "image": String,
                     "category": String,
                     "quantityAvailable": Number,
                     "_id": String,
                     "productId": String,
		     __v: number
					 
		     }
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */





   app.post(baseurl+'/addToCart/:productId/:flag',auth.isAuthenticated,controller.viewByProductId);
 
   
    /**
	 * @api {post} /api/v1/eCommerce/addToCart/:productId/:flag add product to cart
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * 
	 * @apiParam {String} productId The productId should be passed as the URL parameter 
	 * @apiParam {Number} flag The flag should have the value of 0 and be passed as the URL parameter 
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product is added to cart Successfully",
	    "status": 200,
	    "data": [
			{
	    			"productName": String,
                                "cartPrice": Number,
                                "cartQuantity": Number,
                                "_id": String,
                                "productId": String,
                                "__v": Number
			}
		    ]
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
             "error": true,
             "message": "Error occured while creating the cart product",
             "status": 500,
             "data": null
        }
	 */



	 app.put(baseurl+'/increseCartPrice/:productId',controller.editCartPrice);
  
	
  /**
	 * @api {put} /api/v1/eCommerce/increseCartPrice/:productId Get a single cart product with increased qantity
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * 
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
            "message": "CartPrice and quantity edited Successfully.",
            "status": 200,
            "data": {
                      "productName": String,
                      "cartPrice": Number,
                      "cartQuantity": Number,
                      "_id": String,
                      "productId": String,
                      "__v": Number
                    }
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

   app.put(baseurl+'/decreaseCartPrice/:productId',controller.decreaseCartPrice);

   /**
	 * @api {put} /api/v1/eCommerce/decreaseCartPrice/:productId Get a single cart product with decreased qantity
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * 
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
            "message": "CartPrice and quantity edited Successfully.",
            "status": 200,
            "data": {
                      "productName": String,
                      "cartPrice": Number,
                      "cartQuantity": Number,
                      "_id": String,
                      "productId": String,
                      "__v": Number
                    }
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

	app.get(baseurl+'/getAllCartsProduct',controller.getAllCartsProduct);

    
   /**
	 * @api {get} /api/v1/eCommerce/getAllCartsProduct Get all cart product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * 
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
            "message": "CartProduct found  Successfully.",
            "status": 200,
            "data": {
                      "productName": String,
                      "cartPrice": Number,
                      "cartQuantity": Number,
                      "_id": String,
                      "productId": String,
                      "__v": Number
                    }
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


	app.post(baseurl+'/deleteProduct/:productId',auth.isAuthenticated,controller.deleteProduct);
	
    
   /**
	 * @api {post} /api/v1/eCommerce/deleteProduct/:productId Delete the product as well the product from carts if avilable
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * 
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	       "error": false,
	       "message": "Product removed Successfully.",
	       "status": 200,
	       "data": {

	    	         "productName": String,
                         "price": Number,
                         "description": String,
                         "image": String,
                         "category": String,
                         "quantityAvailable": Number,
                         "_id": String,
                         "productId": String,
		         __v: number
					 
			 }
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */




	app.post(baseurl+'/deleteCartProduct/:productId',auth.isAuthenticated,controller.deleteCart);
	
	/**
	 * @api {post} /api/v1/eCommerce/deleteCartProduct/:productId Delete cart product
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 * 
	 * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
            "message": "CartProduct removed  successfully.",
            "status": 200,
            "data": [
			{
                             "productName": String,
                             "cartPrice": Number,
                             "cartQuantity": Number,
                             "_id": String,
                             "productId": String,
                             "__v": Number
			}
		     ]
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


	app.put(baseurl+'/buyProduct/:productId',auth.isAuthenticated,controller.buyProduct);
	
	/**
	 * @api {put} /api/v1/eCommerce/buyProduct/:productId Buy the product if the product is present in carts collections and decreses the product quantity in product collections
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * 
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Buyed Successfully.",
	    "status": 200,
	    "data": [
                          {
	    			"productName": String,
                                "price": Number,
                                "description": String,
                                "image": String,
                                "category": String,
                                "quantityAvailable": Number,
                                "_id": String,
                                "productId": String,
                                __v: number
			   }
                     ]
	    	}
	    }
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    

}


module.exports = {
    setRouter:setRouter
}