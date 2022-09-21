const express = require("express");

const router = express.Router();
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbac = require("../App/Middleware/rbacMiddleware");
const userController = require("../App/Controllers/userController");
const uploader = require("../App/Middleware/uploadMiddleware");

let user_obj = new userController();

let setDestination = (req, res, next) => {
  req.dest = "users";
  next();
};

// app.get("/user", (req, res, next) => {
//   //
// });

// app.post("/user", (req, res, next) => {
//   //
// });

// app.put("/user/:1", (req, res, next) => {
//   //
// });

// app.delete("/user/:1", (req, res, next) => {
//   //
// });

router.route("/").get(authMiddleware.loginCheck, rbac.isAdmin, user_obj.getAllUsers);

router
  .route("/:id")
  .put(
    authMiddleware.loginCheck,
    rbac.isAdmin,
    setDestination,
    uploader.single("image"),
    user_obj.updateUserById
  )
  .delete(authMiddleware.loginCheck, rbac.isAdmin, user_obj.deleteUserById)
  .get(user_obj.getUserById);

module.exports = router;

//write middleware to check login
