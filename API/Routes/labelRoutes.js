const express = require("express");
const router = express.Router();
const LabelContoller = require("../App/Controllers/labelController");
const lblCtrlObject = new LabelContoller();
const uploader = require("../App/Middleware/uploadMiddleware");
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbac = require("../App/Middleware/rbacMiddleware");

let setDestination = (req, res, next) => {
  req.dest = "label_image";
  next();
};

router.get("/", lblCtrlObject.getAllLabels);

router.post(
  "/",
  authMiddleware.loginCheck,
  rbac.isAdmin,
  setDestination,
  uploader.single("image"),
  lblCtrlObject.createLabel
);

router.get("/:id", lblCtrlObject.getLabelById);
router.put(
  "/:id",
  authMiddleware.loginCheck,
  rbac.isAdmin,
  setDestination,
  uploader.single("image"),
  lblCtrlObject.updateLabel
);
router.delete(
  "/:id",
  authMiddleware.loginCheck,
  rbac.isAdmin,
  lblCtrlObject.deleteLabelById
);

module.exports = router;
