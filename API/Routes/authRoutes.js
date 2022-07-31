const express = require("express");
const router = express.Router();
const AuthController = require("../App/Controllers/authController");
const authCtrlObject = new AuthController();
const uploader = require("../App/Middleware/uploadMiddleware");

//ekaichoti tannai file garnu cha vane single ko thaau maa array raakhne.
//kunai file upload garnu parena taipani form handle garnu parey none raakhne.
//single('image') lekhepaxi frontend bata ni name='image' maa upload hunu paro.
let setDestination = (req, res, next) => {
  req.dest = "users";
  next();
};

router.post(
  "/register",
  setDestination,
  uploader.single("image"),
  authCtrlObject.register
);

router.post("/login", authCtrlObject.login);

module.exports = router;
