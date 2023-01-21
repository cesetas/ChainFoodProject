const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  owner: String,
  title: String,
  price: String,
  photo: String,
  token: String,
  foodId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);

// likes: {
//   type: [String],
//   default: [],
// },
// dislikes: {
//   type: [String],
//   default: [],
// },
