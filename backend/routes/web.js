const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user/user");
const ProductController = require("../controllers/product/product");
const TableController = require("../controllers/table/table");
const OrderController = require("../controllers/orderlist/orderlist");
const { upload } = require("../middleware/multer"); // Import multer setup


//AUTH
router.post("/users", UserController.createUser);
router.post("/users/login", UserController.loginUser);
router.post("/users/login/kasir", UserController.loginKasir);
router.post("/users/login/admin", UserController.loginAdmin);
router.post("/users/login/manager", UserController.loginManager);

//Definisi File Statis Untuk Products uploads
router.use("/products/uploads", express.static('uploads/products'))

// MiddleWare
router.use(UserController.verifyToken);

//USER
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

//Product
router.post(
  "/products",
  upload.single("gambar"),
  ProductController.createProduct,
);
router.get("/products", ProductController.getProducts);
router.get("/products/:id", ProductController.getProductById);
router.get("/products/search/:name", ProductController.getProductByName);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

//Table
router.post("/tables", TableController.createTable);
router.get("/tables", TableController.getTables);
router.get("/tables/:id", TableController.getTableById);
router.put("/tables/change/:id", TableController.updateTableStatus);
router.put("/tables/:id", TableController.updateTable);
router.delete("/tables/:id", TableController.deleteTable);

//Order
// MiddleWare
router.use(UserController.verifyTokenKasir);
router.post("/order", OrderController.createOrderList);
router.get("/order", OrderController.getOrderLists);
router.get("/order/:id", OrderController.getOrderListById);
router.delete("/order/:id", OrderController.deleteOrderList);

module.exports = router;
