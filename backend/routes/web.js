const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user/user');
const ProductController = require('../controllers/product/product');
const OrderController = require('../controllers/orderlist/orderlist');




//AUTH
router.post('/users', UserController.createUser);
router.post('/users/login', UserController.loginUser);

// MiddleWare
router.use(UserController.verifyToken);

//USER
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);


//Product
router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProductById);
router.get('/products/search/:name', ProductController.getProductByName);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

//Order
router.post('/order', OrderController.createOrderList);
router.get('/order', OrderController.getOrderLists);
router.get('/order/:id', OrderController.getOrderListById);
router.delete('/order/:id', OrderController.deleteOrderList);


module.exports = router;