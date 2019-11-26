const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
module.exports = (req, res, next) => {
  console.log(req.body);
  try {
    const decodedToken = jwt.verify(
      req.body.token,
      "secret_this_should_be_longer"
    );
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ massage: "Auth failed!" });
  }
};
