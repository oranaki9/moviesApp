const express = require("express");
const app = express();
const port = process.env.PORT || "3000";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const logger = require('morgan');
const fs = require("fs");
const path = require("path");
const cors = require('cors');


mongoose
  .connect(
    "mongodb+srv://or:3nJDrfDiJoYswuO6@cluster0-7jclm.mongodb.net/auth-app?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Conected to Mongo");
  })
  .catch(() => {
    console.log("Faild to connect to Mongo");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.all("*", router);
setLogger();


function setLogger() {
  const logsDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }
  const loggerFormat = "HTTP method: :method, call time:[:date[clf]], route path::url, status::status";
  app.use(logger(loggerFormat, {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/routes.log'))
  }));
}

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
