const express = require('express');
const router = express.Router();
const userController=require('../controller/userController')
const productController=require('../controller/productController')
const middleware=require('../middleware/auth')




router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/createProduct',middleware.Authorise, productController.createProduct )
router.get('/getTopProduct',middleware.Authorise,productController.getTop5Product)
router.get('/todaysRevenue',middleware.Authorise,productController.todayTotalRevenue)




module.exports = router;