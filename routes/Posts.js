const {Router} = require('express') 
const {createPost, getPosts, getPost, editPost, deletePost , getPostCate} = require('../controllers/C_posts')
const M_Comment = require("../models/M_comment")
const router = Router() 

const sharp            = require("sharp")
const multer           = require("multer")
const M_images = require("../models/M_images")



const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage});
const IMG = upload.fields([
  { name: 'images', maxCount: 20 },
]);

const Resize = async (req, res, next) => {

  req.body.images = [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const ext = img.mimetype.split('/')[1];
        const filename = `products-${Date.now()}-${index + 1}.${ext}`;
        await sharp(img.buffer)
          .toFile(`uploads/image/${filename}`);

        req.body.images.push(filename);
      })
    );
  }
  next();
}


const Create = async (req, res) => {

  try {
    const data = await M_images.create(req.body)
    res.status(201).json({data})
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

router.post("/image"      , IMG ,Resize  , Create)
router.get("/image"       , async (req, res ) => {
  const data = await M_images.find()
  res.status(200).json(data)
})





router.post('/' , createPost) 
router.get('/', getPosts) 
router.get('/:id', getPost) 

router.get('/:categoryId', getPostCate) 
router.put('/:id', editPost) 
router.delete('/:id', deletePost) 

router.post('/:postId/comments', async (req, res) => {
  try {
    const { name, email, message , website , userId } = req.body;
    const postId = req.params.postId;
    const  newComment = await M_Comment.create({website, name, email, message, postId , userId })

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:postId/comments', async (req, res) => {
  try {
    const { name, email, message , website , userId } = req.body;
    const postId = req.params.postId;

    const  newComment = await M_Comment.findOneAndUpdate({_id : postId} ,{website, name, email, message , userId } ,{ new: true, upsert: true })
    console.log(postId)
    console.log(newComment)
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId
    const  newComment = await M_Comment.find({postId})

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId
    const  newComment = await M_Comment.findByIdAndDelete(postId)

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router ; 