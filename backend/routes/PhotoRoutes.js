const express = require("express");
const router = express.Router();

//controller
const {insertPhoto, deletePhoto} = require("../controllers/PhotoControler");

//middleware
const {photoInsertValidation} = require("../middlewares/photoValidation");
const {imageUpload} = require("../middlewares/imageUpload");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation")

//routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto)

module.exports = router;