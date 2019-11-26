const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //npm install this

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  favoriteMovies: { type: Array, 'default': [] }
});
//extra hook thats check your data before he insert in to db
//now we get an error if we try to add user thats already exist in db
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
