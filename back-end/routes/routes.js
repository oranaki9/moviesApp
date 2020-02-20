const express = require('express');
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const check_auth = require("../middleware/check_auth");
router.post("/api/signIn", (req, res, next) => {
  if (!req.body.userName || !req.body.email) {
    return;
  }
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        isAdmin: false
      });
      user.save()
        .then(result => {
          res.status(201).json({
            massage: "User Created!",
            data: result
          });
        })
        .catch(err => {
          res.status(400).json({
            massage: "Username allredy exist."
          });
        });
    })
    .catch(err => {});
});



router.post("/api/logIn", (req, res, next) => {
  if (!req.body.email) {
    return;
  }
  let fetchUser;
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        res.status(401).json({
          massage: "Auth failed!"
        });
        return;
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password, fetchUser.password);
    })
    .then(result => {
      if (!result) {
        res.status(401).json({
          massage: "Auth failed!"
        });
      }
      const token = jwt.sign({
          email: fetchUser.email,
          userId: fetchUser._id
        },
        "secret_this_should_be_longer"
      );
      res.status(200).json({
        token: token,
        userId: fetchUser._id
      });
    });
});

router.post("/api/favorite", check_auth, (req, res, next) => {

  if (!req.userData.userId) {
    return;
  }
  User.findById({
    _id: req.userData.userId
  }).then(userDetails => {

    res.status(200).json({
      favoriteMovies: userDetails.favoriteMovies
    });
  });
});
router.put("/api/addFavorite", check_auth, (req, res, next) => {
  if (!req.userData.userId || !req.body.imdbId) {
    return;
  }
  let done = function (err, result) {
    if (err) {
      res
        .status(404)
        .json({
          massage: "Fail to add movie to favorite",
          error: err
        });
    } else {
      res
        .status(200)
        .json({
          massage: "Added movie to favorite!",
          result: result
        });
    }
  };
  User.update({
      _id: req.userData.userId
    }, {
      $push: {
        favoriteMovies: req.body.imdbId
      }
    },
    done
  );
});
router.delete("/api/favorite/:userId/:imdbId", (req, res, next) => {
  let done = function (err, result) {
    if (err) {
      res
        .status(404)
        .json({
          massage: "Fail to remove movie from favorite",
          error: err
        });
    } else {
      res
        .status(200)
        .json({
          massage: "Movie removed from favorite!",
          result: result
        });
    }
  };

  User.updateOne({
      _id: req.params.userId
    }, {
      $pullAll: {
        favoriteMovies: [req.params.imdbId]
      }
    },
    done
  );
});
module.exports = router;
