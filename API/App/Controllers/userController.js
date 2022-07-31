class UserController {
  getAllUsers = (req, res, next) => {
    res.json({
      result: [],
      msg: "Fetched all users",
      status: true,
    });
  };

  updateUserById = (req, res, next) => {};

  deleteUserById = (req, res, next) => {};

  getUserById = (req, res, next) => {};
}

module.exports = UserController;
