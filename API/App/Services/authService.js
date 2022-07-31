const jwt = require("jsonwebtoken");
const CONFIG = require("../../Config/config");

class AuthService {
  loginValidate = (data) => {
    let error = {};
    if (!data.email) {
      error["email"] = "Email is required";
    } else {
      delete error["email"];
    }
    if (!data.password) {
      error["password"] = "Password is required";
    } else {
      delete error["password"];
    }

    if (Object.keys(error).length) {
      throw error;
    } else {
      return data;
    }
  };

  registrationValidate = (data) => {
    let err_msg = {};
    if (!data.name) {
      err_msg["name"] = "Name is required.";
    }

    if (!data.email) {
      err_msg["email"] = "Email is required.";
    }

    if (!data.password) {
      err_msg["password"] = "Password is required.";
    }

    if (!data.role) {
      err_msg["role"] = "Role is required.";
    }

    if (Object.keys(err_msg).length) {
      return err_msg;
    } else {
      return null;
    }
  };

  generateAccessToken = (data) => {
    let token = jwt.sign(data, CONFIG.JWT_SECRET);
    return token;
  };
}

module.exports = AuthService;
