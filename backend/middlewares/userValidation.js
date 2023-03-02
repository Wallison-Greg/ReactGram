const {body} = require("express-validator");

const userCreateValidation = () => {
    //fazendo a validação do usuario 
    return [ 
        //validando o nome 
        body("name")
            .isString().withMessage("nome obrigatorio.")
            .isLength({min: 3}).withMessage("o nome precisa ter no minimo 3 caracteres"),

        //validando o email
        body("email")
            .isString().withMessage("email obrigatorio.")
            .isEmail().withMessage("insira um email valido"),
            
        //validando a senha
        body("password")
            .isString().withMessage("senha obrigatorio")
            .isLength({min: 5}).withMessage("a senha precisa ter no minimo 5 caracteres"),

        //validando a confirmação de senha 
        body("confirmpassword")
            .isString().withMessage("confirmação de senha obrigatoria")
            .custom((value, {req}) => {
                //verificando se as senhas são iguais

                if (value != req.body.password){
                    throw new Error("as senha não são iguais.")
                }

                return true
            }),
    ];
};

module.exports = {
    userCreateValidation,
};

/*Fazendo a validação do usuario utilizando o express-validator
.isString(): verifica se o campo recebe uma string 
.isEmail(): verifica se o campo e um email
.custom(): metodo de validação customisada na qual podemos definir sua regra de negocio 
.isLength({min: }): defini a quantidade minima de caracteres a serem colocados 
.withMessage(): emite uma mensagem de erro para o usuario 
*/