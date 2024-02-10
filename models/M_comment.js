// commentModel.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  website: { type: String, required: true },
  userId: { type: String , required:true },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
