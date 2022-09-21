const express = require("express");
const app = express();
const routes = require("./Routes/route.js");
const path = require("path");
const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/apiDB";
const cors = require("cors");

const myEvent = require("./App/Events/events");

app.use(cors());
app.use((req, res, next) => {
  req.myEvent = myEvent;
  next();
});

app.use(express.json()); //application/json
app.use(
  express.urlencoded({
    extended: false,
  })
); //application/urlencoded

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

app.set("view engine", "ejs");
app.set("views", "views");
// app.use("/api/v1", routes);

app.use("/api/v1", routes);

app.use((req, res, next) => {
  next({
    status: 404,
    msg: "Not found",
  });
});

//Error handler(has 4 params)
app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.msg || "Server Error";
  console.error(err);

  res.status(status).json({
    result: "null",
    msg: msg,
    status: false,
  });
});

/*app.listen(8080, (err) => {
  if (err) {
    console.log("Error connecting to server", err);
  }
  console.log("Server running");
});
*/
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true,
    autoIndex: true,
  })
  .then((result) => {
    console.log("DB connected");
    app.listen(8080, (err) => {
      if (err) {
        console.log("Error connecting to server", err);
      }
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
//create custom routes for
// /api/v1/user for get
// /api/v1/user for post
// /api/v1/user/1 for put
// /api/v1/user/1 for delete
