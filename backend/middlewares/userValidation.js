const {body} = require("express-validator");

const userCreateValidation = () => {
    return [ body("name").isString().withMessage("o nome e obrigatorio.") ]
}

module.exports = {
    userCreateValidation,
};