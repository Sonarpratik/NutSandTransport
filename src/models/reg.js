const mongoose = require("mongoose");
console.log("reg is connected")

const yarrSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    confirm: {
        type: String,
        require: true,
    }

})


// now we need to createthe collections

const Register =new mongoose.model("2ndfata",yarrSchema);

module.exports=Register;