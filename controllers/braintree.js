const User = require("../models/user");

const braintree = require("braintree");

require("dotenv").config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_KEY,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, (err, responce) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(responce);
    }
  });
};

exports.processPayment = (req, res)=>{
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromClient = req.body.amount;

  //charge

  let newTransaction = gateway.transaction.sale({
    amount : amountFromClient,
    paymentMethodNonce : nonceFromTheClient,
    options : 
      {
        submitForSettlement : true
      }
    
  } , (error , result)=>{

    if(error){
      res.status(500).json(error)
    }else{
      res.json(result)
    }
  })

}