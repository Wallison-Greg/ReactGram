const express = require("express");
const router = express.Router();

//controller
const {
        insertPhoto, 
        deletePhoto, 
        getAllPhoto, 
        getUserPhotos, 
        getPhotoById, 
        upadatePhoto, 
        likePhoto,
        commentPhoto,
        searchPhoto
    } = require("../controllers/PhotoControler");

//middleware
const {photoInsertValidation, photoUpdateValidation, commentValidation} = require("../middlewares/photoValidation");
const {imageUpload} = require("../middlewares/imageUpload");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

//routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhoto);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", authGuard, searchPhoto)

router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, upadatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put("/comment/:id", authGuard, commentValidation(), validate,  commentPhoto)

module.exports = router;