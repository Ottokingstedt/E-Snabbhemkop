const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true,
        index:true,
        minlength: 3,
        maxlength: 30
    },
    lastname:{
        type:String,
        required:true,
        unique:true,
        index:true,
        minlength: 3,
        maxlength: 30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength: 3,
        maxlength: 50,
    },
    password:{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 200
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
{timestamps: true});


//Export the model
const User = mongoose.model('User', userSchema);

exports.User = User;