const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const connString = `mongodb+srv://${dbUser}:${dbPass}@cluster0.mdlltrt.mongodb.net/?retryWrites=true&w=majority`;

const conn = async () => {

    try {

        const dbConn = await mongoose.connect(connString);

        console.log("conectou ao banco");

        return dbConn;
        
    } catch (error) {
        console.log(error);
    }
} 

conn();

module.exports = conn;

