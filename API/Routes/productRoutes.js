const router = require("express").Router();
const ProductContoller = require("../App/Controllers/productController");
const prodCtrl = new ProductContoller();
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbac = require("../App/Middleware/rbacMiddleware");
const uploader = require("../App/Middleware/uploadMiddleware");

let setDestination = (req, res, next) => {
  req.dest = "product";
  next();
};

router.post(
  "/",
  authMiddleware.loginCheck,
  rbac.isAdminSeller,
  setDestination,
  uploader.array("image"),
  prodCtrl.addProduct
);

router.get("/", prodCtrl.getAllProducts);
router.get("/:id", prodCtrl.getProductById);

router.put(
  "/:id",
  authMiddleware.loginCheck,
  rbac.isAdminSeller,
  setDestination,
  uploader.array("image"),
  prodCtrl.updateProduct
);

router.delete("/:id", authMiddleware.loginCheck, rbac.isAdminSeller, prodCtrl.deleteProduct);

router.get("/cat/:slug", prodCtrl.getProductByCategory);

router.get("/byslug/:slug", prodCtrl.getProductBySlug);

module.exports = router;
