const express = require('express');
const router = express.Router();
const sellerController=require('../controller/sellerController')
const productController=require('../controller/productController')
const middleware=require('../middleware/auth')




router.post('/register', sellerController.createSeller)
router.post('/login', sellerController.loginSeller)
router.post('/createProduct/:sellerId',middleware.Auth, productController.createProduct )
router.get('/getTopProduct/:sellerId',middleware.Auth,productController.getTop5Product)
router.get('/todaysRevenue/:sellerId',middleware.Auth,productController.todayTotalRevenue)




module.exports = router;