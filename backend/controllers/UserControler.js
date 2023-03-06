const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

//generate user token 

const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    } );
};

//register user and sign in 
const register = async (req, res) => {

    const {name, email, password} = req.body

    //checked user
    const user = await User.findOne({email}) //buscando email ja cadastrado

    if (user){
        res.status(422).json({errors: ["email ja cadastrado, utilize outro email !"]})
        return
    }

    //generate password hash 
    const salt = await bcrypt.genSalt() //gerando valor aleatoria

    const passwordHash = await bcrypt.hash(password, salt) //encriptando a senha com o valor aleatorio

    //create user
    const newUser = await User.create({
        name,
        email, 
        password: passwordHash
    })

    //consfirmação do usuario e gerando o token 
    if (!newUser){
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde"]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

//sign user in 
const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    //checando se o usuario ja foi cadastrado
    if(!user){
        res.status(404).json({errors: ["Usuario não econtrado !"]})
        return
    }

    //checando se a senha inserida e valida para esse usuario
    if(!(await bcrypt.compare(password, user.password))){
        //essa condição verifica se a senha do login e diferente da senha q foi utilizada no cadastro

        res.status(422).json({errors: ["senha invalida"]})
        return
    }

    //token do login
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });

}

//get current logedd is user

const getCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}

module.exports = {
    register,
    login,
    getCurrentUser,
}