const sellerModel=require('../model/sellerModel')
const validator = require('../validator/validator');
const jwt = require('jsonwebtoken')

const createSeller = async function(req,res) {
    try {
        const body = req.body;
        const {name,phone,email,password} = body;

        //Validate body
        if (!validator.isValidBody(body)) {
            return res.status(400).send({ status: false, msg: "seller body should not be empty" });
        }


        //Validate name
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "seller name is required" });
        }

        // Validate phone
        if(!validator.isValid(phone)) {
            return res.status(400).send({ status: false, msg: "seller phone number is required"});
        }

        // Validation of phone number
        if(!validator.isValidNumber(phone)) {
            return res.status(400).send({ status: false, msg: "Invalid phone number"});
        }

        //Validate email
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "seller email is required" });
        }
        
        // Validation of email
        if(!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "Invalid email Id"});
        }

        //Validate password
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, msg: "Seller password is required" });
        }

        // Validation of password
        if(!validator.isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: "Invalid password"});
        }


        // Cheking duplicate Entry Of Seller 
        let duplicateEntries = await sellerModel.find();
        let duplicateLength = duplicateEntries.length

        if (duplicateLength != 0) {
            // Checking duplicate name
            const duplicateName = await sellerModel.findOne({ name: name });
            if (duplicateName) {
                return res.status(409).send({status: false, msg: "seller Name already exists" });
            }

           // Checking duplicate phone
           const duplicatePhone = await sellerModel.findOne({ phone: phone });
           if (duplicatePhone) {
               return res.status(409).send({status: false, msg: "seller phone number already exists" });
            }
            
            // Checking duplicate email
           const duplicateEmail = await sellerModel.findOne({ email: email });
           if (duplicateEmail) {
               return res.status(409).send({status: false, msg: "seller emailId already exists" });
            }
        

        }

        // Finally the registration of seller is successful
        const userData = await sellerModel.create(body)
        res.status(201).send({ status: true, msg: userData})

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}




const loginSeller = async function (req, res) {
    try {
        const requestBody = req.body;
         //Validate body
         if (!validator.isValidBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Seller body should not be empty" });
        }

        const {email,password }= requestBody                ///destructuring method

          //Validate email
          if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "Seller email is required" });
        }
        
        // Validation of email
        if(!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "Invalid email Id"});
        }

        //Validate password
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, msg: "Seller password is required" });
        }

        // Validation of password
        if(!validator.isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: "Invalid password"});
        }

       

      let seller = await sellerModel.findOne({ email, password });
      if (!seller){
        res.status(400).send({ status: false, msg: "invalid login credentials" });
        return
    }

      //On a successful login attempt return a JWT token contatining the sellerId, exp, iat.
  
      const token = jwt.sign(
        {
          sellerId: seller._id,
          expiry: Math.floor(Date.now( )/ 1000) +20*60*60,       
          iat : Math.floor(Date.now()/1000)
        },
        "sagar123singh123solanki")
    
      res.setHeader("x-auth-token", token);
      res.status(200).send({ status: true,message:"seller login successfully", data: token });
    } catch (error) {
      res.status(500).send({ status: "failed", message: error.message });
    }
  };
  module.exports.createSeller=createSeller
  module.exports.loginSeller=loginSeller
  