//This file acts as the entry point of elearning server application

//Requiring all the packages necessary and making server.JS as entry point of application
const express = require("express"); //express package to render HTML pages using JS
const morgan = require("morgan"); //Morgan is used for logging request details
const bodyParser = require("body-parser"); //body-parser to parse the JSON Data
const mongoose = require("mongoose"); //Mongoose package to connect to back-end mongoDB
const cors = require("cors"); //Package to connect middle-ware or cross-platform applications
const config = require("./config");

const app = express(); //wrapping the new express application in app variable

// Only include useMongoClient only if your mongoose version is < 5.0.0
mongoose.connect(config.database, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Mongoose Init: Success");
  }
});

//express application using required packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DETELE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
app.use(morgan("dev"));
app.use(cors());

const userRoutes = require("./routes/account");
const mainRoutes = require("./routes/main");
const sellerRoutes = require("./routes/seller");
const productSearchRoutes = require("./routes/product-search");
const index = require("./index")

//express application using Routes from this application
app.use("/api", mainRoutes);
app.use("/api/accounts", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/search", productSearchRoutes);
app.use("/", index)

//Setting up the port for server to run on
app.listen(process.env.PORT || config.port, (err) => {
  console.log("Server has started on Init: <port> " + config.port);
});