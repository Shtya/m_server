const mongoose = require("mongoose")


const Schema = new mongoose.Schema({
  images  : [String],
})

module.exports = mongoose.model("images" , Schema)