exports.isAdmin = (req, res, next) => {
  let role = req.auth_user.role;
  if (role.includes("admin")) {
    next();
    return;
  }
  next({
    status: 403,
    msg: "Unauthorized",
  });

  //next maa kehi parameter haalera pathaaye error handling middleware maa jane garxa.
};

exports.isSeller = (req, res, next) => {
  let role = req.auth_user.role;
  if (role.includes("seller")) {
    next();
    return;
  }
  next({
    status: 403,
    msg: "Unauthorized",
  });
  //next maa kehi parameter haalera pathaaye error handling middleware maa jane garxa.
};

exports.isAdminSeller = (req, res, next) => {
  let role = req.auth_user.role;

  if (role.includes("seller") || role.includes("admin")) {
    next();
  } else {
    next({
      status: 403,
      msg: "Unauthorized",
    });
  }
};

exports.isCustomer = (req, res, next) => {
  let role = req.auth_user.role;
  if (role.includes("customer")) {
    next();
    return;
  }
  next({
    status: 403,
    msg: "Unauthorized",
  });
  //next maa kehi parameter haalera pathaaye error handling middleware maa jane garxa.
};
