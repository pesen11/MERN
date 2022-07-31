const jwt = require("jsonwebtoken");
const CONFIG = require("../../Config/config");
const User = require("../Models/userModel");

exports.loginCheck = async (req, res, next) => {
  //TODO login
  let token = null;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }

  if (req.headers["x-xsrf-token"]) {
    token = req.headers["x-xsrf-token"];
  }

  //afnai header set garexa vane

  // if(req.headers['customauth']){
  //   token=req.headers['customauth']
  // }

  //query baata token pathaayemaa
  //token=req.query['token']

  if (!token) {
    next({
      status: 401,
      msg: "Unauthorized",
    });
  } else {
    try {
      //Bearer ani token auxa kaile kai. kaile kai bearer binaa nai aauxa token
      let parts = token.split(" ");
      token = parts[parts.length - 1];
      let data = jwt.verify(token, CONFIG.JWT_SECRET);
      if (data) {
        let user = await User.findById(data.id);

        if (user) {
          req.auth_user = user;
          next();
        } else {
          next({
            status: 403,
            msg: "Access denied",
          });
        }
      } else {
        next({
          status: 401,
          msg: "Unauthorized",
        });
      }
    } catch (error) {
      next({
        status: 401,
        msg: "Unauthorized",
      });
    }
  }
};
