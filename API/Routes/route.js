const express = require("express");
const app = express();
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const labelRoutes = require("./labelRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
app.get("/", (req, res, next) => {
  return res.render("index");
});

// app.get("/product/:id", (req, res, next) => {
//   res.json({
//     result: {
//       params: req.params,
//       id: req.body,
//       query: req.query,
//     },
//   });
// });

app.use("/user", userRoutes);
app.use(authRoutes);
app.use("/label", labelRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

module.exports = app;
