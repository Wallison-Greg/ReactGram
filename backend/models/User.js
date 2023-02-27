const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema ({ //definindo schema
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
},
{//config schema
    timestamps:true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;