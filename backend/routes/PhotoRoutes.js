const express = require("express");
const router = express.Router();

//controller
const {insertPhoto, deletePhoto, getAllPhoto, getUserPhotos, getPhotoById} = require("../controllers/PhotoControler");

//middleware
const {photoInsertValidation} = require("../middlewares/photoValidation");
const {imageUpload} = require("../middlewares/imageUpload");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");


//routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhoto);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/:id", authGuard, getPhotoById)

module.exports = router;