const AuthService = require("../Services/authService");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "apiDB";
const db = require("../Services/coreMongoService");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor() {
    this.authServiceObject = new AuthService();
  }
  login = (req, res, next) => {
    try {
      let data = req.body;
      let result = this.authServiceObject.loginValidate(data);

      //login logic
      /*
      db()
        .then((db) => {
          return db.collection("users").findOne({
            email: result.email,
            password: result.password,
          });
        })
        .then((user) => {
          if (user) {
            res.json({
              result: user,
              status: true,
              msg: "Login Successful!",
            });
          } else {
            next({
              status: 400,
              msg: "Credentials do not match.",
            });
          }
        })
        .catch((error) => {
          console.log("LoginError:", error);
          next({
            status: 400,
            msg: error,
          });
        });*/

      let user = User.findOne({ email: data.email })
        .then((user) => {
          if (user) {
            //
            if (bcrypt.compareSync(data.password, user.password)) {
              let accessToken = this.authServiceObject.generateAccessToken({
                id: user._id,
                name: user.name,
                role: user.role,
              });
              res.json({
                result: { user: user, accessToken: accessToken },
                status: true,
                msg: "Logged in succesfully.",
              });
            } else {
              throw "Credentials do not match.";
            }
          } else {
            throw "User does not exist.";
          }
        })
        .catch((err) => {
          next({
            status: 500,
            msg: err,
          });
        });
    } catch (error) {
      console.log("LoginError:", error);
      next({
        status: 400,
        msg: error,
      });
    }
  };

  register = (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      req.myEvent.emit("registerEvent", { result: data });

      let registrationError = this.authServiceObject.registrationValidate(data);

      if (registrationError) {
        next({
          status: 400,
          msg: registrationError,
        });
      } else {
        /*
        db()
          .then((db) => {
            db.collection("users").insertOne(data, (err, result) => {
              if (err) {
                next({
                  status: 500,
                  msg: err,
                });
              } else {
                res.json({
                  result: data,
                  status: true,
                  msg: "Registered Successfully!",
                });
              }
            });
          })
          .catch((error) => {
            next({
              status: 500,
              msg: error,
            });
          });*/
        let hash = bcrypt.hashSync(data.password, 10);
        data.password = hash;

        if (data.role) {
          data.role = data.role.split(",");
        }

        data.address = {
          billing: {
            address: data.address_billing_address,
            house_no: data.address_billing_house_no,
          },
          shipping: {
            address: data.address_shipping_address,
            house_no: data.address_shipping_house_no,
          },
        };
        let user = new User(data);

        user
          .save()
          .then((ack) => {
            res.json({
              result: user,
              status: true,
              msg: "User registerd succesfully",
            });
          })
          .catch((err) => {
            next({
              status: 500,
              msg: err,
            });
          });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };

  verifyUser = (req, res, next) => {
    if (req.auth_user) {
      res.json({
        result: req.auth_user,
        msg: "Verified",
        status: true,
      });
    } else {
      next({ status: 403, msg: "Unauthorized" });
    }
  };
}

module.exports = AuthController;
