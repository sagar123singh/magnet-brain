const productModel=require('../model/productModel')
const validator = require('../validator/validator');

const createProduct=async function(req,res){
    try{
        const body=req.body
        const {productName,quantity,amount,NoOfProductSale,isDeleted}=body

        if (!validator.isValidBody(body)) {
            return res.status(400).send({ status: false, msg: "User body should not be empty" });
        }
        if (!validator.isValid(productName)) {
            return res.status(400).send({ status: false, msg: "product name is required" });
        }

        if (!validator.isValid(quantity)) {
            return res.status(400).send({ status: false, msg: "quantity is required" });
        }

        if (!validator.isValid(amount)) {
            return res.status(400).send({ status: false, msg: "amount is required" });
        }
        if (!validator.isValid(NoOfProductSale)) {
            return res.status(400).send({ status: false, msg: "total number of sale  is required" });
        }
        if (!validator.isValid(isDeleted)) {
            return res.status(400).send({ status: false, msg: "plz mention product the product deleted or not" });
        }


        const productData=await productModel.create(body)
        res.status(201).send({status:true,msg:productData})

    }catch(err){
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


const getTop5Product=async function(req,res){
    try{
        const top5Sale=await productModel.find({isDeleted:false}).sort({NoOfProductSale:-1}).limit(5)
        res.status(200).send({status:true,count:top5Sale.length, data:top5Sale})

    }catch(err){
        res.status(500).send({status:false, msg:"error",error:err.msg})
    }
}

const todayTotalRevenue=async function (req,res){
    try{
const data=await productModel.find({currentDate:"2022-08-25"})
let totalRevenue=null;
for(let i=0;i<data.length;i++){
    totalRevenue+=data[i].amount
}
res.status(200).send({ status:true, data:totalRevenue })
    }catch(err){
        res.status(500).send({status:false,msg:"server error", error:err.msg})
    }
}
module.exports.createProduct=createProduct
module.exports.getTop5Product=getTop5Product
module.exports.todayTotalRevenue=todayTotalRevenue