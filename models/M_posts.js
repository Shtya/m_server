const {Schema, model} = require("mongoose") 
const postSchema = new Schema ({
    title : {type : String, required : true}, 
    description : {type : String, required : true}, 
    category : {type : String }, 
    thumbnail : {type : String, required : true}, 
    titleData : {type : String}, 
    descData : {type : String}, 

  }, {timestamps : true}) 
  

module.exports = model("posts" , postSchema)