const router = require("express").Router();
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbac = require("../App/Middleware/rbacMiddleware");
const uploader = require("../App/Middleware/uploadMiddleware");
const CategoryContoller = require("../App/Controllers/categoryController");
const categoryCtrlObj = new CategoryContoller();

let setDestination = (req, res, next) => {
  req.dest = "category";
  next();
};

router.get("/", categoryCtrlObj.getAllCats);
router.get("/:id", categoryCtrlObj.getCategoryById);
router.post(
  "/",
  authMiddleware.loginCheck,
  rbac.isAdmin,
  setDestination,
  uploader.single("image"),
  categoryCtrlObj.addCategory
);

router.put(
  "/:id",
  authMiddleware.loginCheck,
  rbac.isAdmin,
  setDestination,
  uploader.single("image"),
  categoryCtrlObj.updateCategory
);

router.delete(
  "/:id",
  authMiddleware.loginCheck,
  rbac.isAdmin,
  setDestination,
  uploader.single("image"),
  categoryCtrlObj.deleteCategoryById
);

module.exports = router;
