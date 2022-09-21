const User = require("../Models/userModel");
const AuthService = require("../Services/authService");
class UserController {
  constructor() {
    this.authServiceObject = new AuthService();
  }
  getAllUsers = async (req, res, next) => {
    try {
      let filters = {};
      if (req.query.role && req.query.role !== "all") {
        filters = {
          role: req.query.role,
        };
      }
      let result = await User.find(filters);
      res.json({
        result: result,
        msg: "User fetching done succesfully",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };

  updateUserById = (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      req.myEvent.emit("registerEvent", { result: data });

      let registrationError = this.authServiceObject.registrationValidate(data, true);

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
        console.log("Data", data);
        User.findByIdAndUpdate(req.params.id, {
          $set: data,
        })
          .then((ack) => {
            res.json({
              result: ack,
              status: true,
              msg: "User updated succesfully",
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

  deleteUserById = async (req, res, next) => {
    try {
      let result = await User.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({
          result: result,
          msg: "User deleted succesfully",
          status: true,
        });
      } else {
        next({
          status: 400,
          msg: "User not found.",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      let result = await User.findById(req.params.id);
      if (result) {
        res.json({
          result: result,
          msg: "User fetched",
          status: true,
        });
      } else {
        next({
          status: 404,
          msg: "User not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
