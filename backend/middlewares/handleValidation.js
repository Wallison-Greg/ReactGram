const {validationResult} = require("express-validator");

const validate = (req, res, next) => {

    //pegango os erros da requisição 
    const errors = validationResult(req);

    //verificando se ah algum erro 
    if(errors.isEmpty()){
        return next();
    }

    //extraindo o erro 
    const extractedErros = []

    errors.array().map((err) => extractedErros.push(err.msg))

    return res.status(422).json({
        errors: extractedErros
    })
}

module.exports = validate;