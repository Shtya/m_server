const Post = require("../models/M_posts")
const AsyncHandler = require("express-async-handler")


const createPost = AsyncHandler(async(req , res , next)=>{
    const data = await Post.create(req.body)
    if(!data) return next(new Error("Post couldn't be created."))
      res.status(200).json({data})
})


const  getPosts = AsyncHandler(async (req, res) => {
  let data = await Post.find(req.query).sort({createdAt:-1})
    res.status(200).json({data})
})

const  getPost = AsyncHandler(async (req, res , next) => {
  const data = await Post.findById(req.params.id)
  if(!data) next( new Error("There is not blog with this id"))
  res.status(200).json({data})
})

const  getPostCate = AsyncHandler(async (req, res , next) => {
  const data = await Post.find({category: req.params.categoryId}).sort({createAt : -1})
  if(!data) next( new Error("There is not blog with this id"))
  res.status(200).json({data})
})


const  editPost = AsyncHandler(async (req, res , next) => {
  const data = await Post.findByIdAndUpdate(req.params.id, req.body , { new: true })
  if(!data) next( new Error("There is not blog with this id"))
  res.status(201).json({data})
})


const  deletePost = AsyncHandler(async (req, res , next) => {
  const data = await Post.findByIdAndDelete(req.params.id)
  if(!data) next( new Error("There is not blog with this id"))
  res.status(200).json("Done Deleted")
})

module.exports = {createPost, getPosts, getPost, editPost, deletePost , getPostCate}

