const express = require('express');
const router = express.Router();
const sellerController=require('../controller/sellerController')
const productController=require('../controller/productController')
const middleware=require('../middleware/auth')




router.post('/register', sellerController.createSeller)
router.post('/login', sellerController.loginSeller)
router.post('/createProduct',middleware.Auth, productController.createProduct )
router.get('/getTopProduct',middleware.Auth,productController.getTop5Product)
router.get('/todaysRevenue',middleware.Auth,productController.todayTotalRevenue)




module.exports = router;