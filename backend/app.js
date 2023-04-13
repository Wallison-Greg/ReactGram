//utilizando o dotenv
require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT; //pegando o valor da porta dentro do arquivo ".env"

const app = express();

//consfig Json and form data response

app.use(express.json()); //habilitando o Json 
app.use(express.urlencoded({extended:false}));

//cors

app.use(cors({credentials: true, origin: "http://localhost:3000"}));

//upload directory

app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); //diretorio de imagens 

//db connection

require("./config/db.js");

//routes

const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
    console.log(`rodando na porta ${port}`);
}); //iniciar a aplicação 