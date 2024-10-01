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

//3 Role Autentikasi
router.post("/users/login/kasir", UserController.loginKasir);
router.post("/users/login/admin", UserController.loginAdmin);
router.post("/users/login/manager", UserController.loginManager);

//Definisi File Statis Untuk Products uploads
router.use("/products/uploads", express.static("uploads/products"));
// Middleware untuk menyajikan file statis di folder 'receipts'
router.use("/receipts", express.static("receipts"));

// Middleware untuk verifikasi token Manager
const verifyManager = UserController.verifyTokenManager;
// Middleware untuk verifikasi token Kasir
const verifyKasir = UserController.verifyTokenKasir;
// Middleware untuk verifikasi token Admin
const verifyAdmin = UserController.verifyTokenAdmin;

// MiddleWare Seluruh Route
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
router.get("/order", OrderController.getOrderLists);
router.get("/order/:id", OrderController.getOrderListById);
router.post("/order", OrderController.createOrderList);
router.get("/order/print/:id", OrderController.printReceiptPDF);
router.delete("/order/:id", OrderController.deleteOrderList);


///AUTENTIKASI///
//MiddleWare Manager
router.use("/manager/order", verifyManager);
router.get("/manager/order", OrderController.getOrderLists);
router.get("/manager/order/:id", OrderController.getOrderListById);
router.get(
  "/manager/order/filter/by-date",
  OrderController.getOrderListsByDate,
);

// MiddleWare Kasir
router.use("/kasir/order", verifyKasir);
router.post("/kasir/order", OrderController.createOrderList);
router.get("/kasir/order/print/:id", OrderController.printReceiptPDF);

// Middleware Admin
router.use("/admin/", verifyAdmin);

//USER
router.post("/admin/users", UserController.createUser);
router.get("/admin/users/:id", UserController.getUserById);
router.put("/admin/users/:id", UserController.updateUser);
router.delete("/admin/users/:id", UserController.deleteUser);

//Product
router.post(
  "/admin/products",
  upload.single("gambar"),
  ProductController.createProduct,
);
router.get("/admin/products", ProductController.getProducts);
router.get("/admin/products/:id", ProductController.getProductById);
router.get("/admin/products/search/:name", ProductController.getProductByName);
router.put("/admin/products/:id", ProductController.updateProduct);
router.delete("/admin/products/:id", ProductController.deleteProduct);

//Table
router.post("/admin/tables", TableController.createTable);
router.get("/admin/tables", TableController.getTables);
router.get("/admin/tables/:id", TableController.getTableById);
router.put("/admin/tables/change/:id", TableController.updateTableStatus);
router.put("/admin/tables/:id", TableController.updateTable);
router.delete("/admin/tables/:id", TableController.deleteTable);



module.exports = router;
