const express = require("express");
const router = express.Router();

//controller
const {register} = require("../controllers/UserControler");

//middlewares
const validate = require("../middlewares/handleValidation")

//routes
router.post("/register", validate, register);

module.exports = router;