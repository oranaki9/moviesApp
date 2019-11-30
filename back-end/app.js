const express = require("express");
const app = express();
const port = process.env.PORT || "3000";
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./modals/User");
const jwt = require("jsonwebtoken");
const check_auth = require("./middleware/check_auth");
mongoose
  .connect(
    "mongodb+srv://or:3nJDrfDiJoYswuO6@cluster0-7jclm.mongodb.net/auth-app?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Conected to Mongo");
  })
  .catch(() => {
    console.log("Faild to connect to Mongo");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
app.post("/api/signIn", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        isAdmin: false
      });
      user
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({ massage: "User Created!", data: result });
        })
        .catch(err => {
          console.log(err);

          res.status(400).json({ massage: "Username allredy exist." });
        });
      console.log(result);
    })
    .catch(err => {});
});
app.post("/api/logIn", (req, res, next) => {
  let fetchUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);

      if (!user) {
        res.status(401).json({ massage: "Auth failed!" });
        return;
      }
      fetchUser = user;

      return bcrypt.compare(req.body.password, fetchUser.password);
    })
    .then(result => {
      if (!result) {
        res.status(401).json({ massage: "Auth failed!" });
      }
      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id },
        "secret_this_should_be_longer"
      );
      res.status(200).json({ token: token, userId: fetchUser._id });
    });
});
app.post("/api/favorite", check_auth, (req, res, next) => {
  User.findById({ _id: req.userData.userId }).then(userDetails => {
    res.status(200).json({ favoriteMovies: userDetails.favoriteMovies });
  });
});
app.put("/api/addFavorite", check_auth, (req, res, next) => {
  let done = function(err, result) {
    if (err) {
      res
        .status(404)
        .json({ massage: "Fail to add movie to favorite", error: err });
    } else {
      res
        .status(200)
        .json({ massage: "Added movie to favorite!", result: result });
    }
  };
  User.update(
    { _id: req.userData.userId },
    { $push: { favoriteMovies: req.body.imdbId } },
    done
  );
});
app.delete("/api/favorite/:userId/:imdbId", (req, res, next) => {
  let done = function(err, result) {
    if (err) {
      res
        .status(404)
        .json({ massage: "Fail to remove movie from favorite", error: err });
    } else {
      res
        .status(200)
        .json({ massage: "Movie removed from favorite!", result: result });
    }
  };

  User.updateOne(
    { _id: req.params.userId },
    { $pullAll: { favoriteMovies: [req.params.imdbId] } },
    done
  );
});
app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
