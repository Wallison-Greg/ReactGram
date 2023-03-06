const multer = require("multer"); //utilizando a biblioteca de upload 
const path = require("path"); //utilizando o diretorio de caminho 

// destination to store image

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if(req.baseUrl.includes("users")){
            folder = "users"
        }else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //upload formas png and jpg
            return cb(new Error("por favor, envie apenas png ou jpg"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}