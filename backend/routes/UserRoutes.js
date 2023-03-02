const express = require("express");
const router = express.Router();

//controller
const {register, login} = require("../controllers/UserControler");

//middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation, loginValidation} = require("../middlewares/userValidation");

//routes
router.post("/register", userCreateValidation() ,validate, register);
router.post("/login", loginValidation() ,validate, login);

//nessa rota estamos utilizando 2 middlewares para fazer a validação antes de executar a função de registro 

module.exports = router;