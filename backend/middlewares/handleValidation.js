const {validationResult} = require("express-validator");

const validate = (req, res, next) => {

    //pegango os erros da requisição 
    const erros = validationResult(req);

    //verificando se ah algum erro 
    if(erros.isEmpty()){
        return next();
    }

    //extraindo o erro 
    const extractedErros = []

    erros.array().map((err) => extractedErros.push(err.msg))

    return res.status(422).json({
        erros: extractedErros
    })
}

module.exports = validate;