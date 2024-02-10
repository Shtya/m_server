

const sharp            = require("sharp")
const multer           = require("multer")
const { v4: uuidv4 } = require("uuid")
const express = require("express")
const M_images = require("../models/M_images")
const router = express.Router()


const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('only images allowed'), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

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

        // Save images into database
        req.body.images.push(filename);
      })
    );
  }
  next();
}


const Create = async (req, res) => {
  const data = await M_images.create(req.body)
  res.status(200).json({data})
}






router.post("/"      , IMG ,Resize  , Create)
router.get("/i"       , async (req, res ) => {
  const data = await M_images.find()
  res.status(200).json(data)
})




module.exports = router