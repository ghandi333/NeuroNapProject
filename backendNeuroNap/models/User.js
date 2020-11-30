const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;
const cryptoRandomString = require("crypto-random-string");

const Usermodel = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        default: false 
    },
    status: {
        type: String,
        default: "pending",
    }
    
});
Usermodel.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'myprivatekey');
    return token;
}

const User  = mongoose.model('User', Usermodel);
// function to validate user 
function validateUser(user) {
    
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
        confirmPassword: Joi.string().min(3).max(255).required()
    };
    const object = Joi.object(schema);
        
    const validation = object.validate(user);
    return validation;
}

exports.validate = validateUser;
exports.User = User;

// const signupValidation = (data) => {
//     const schema= {
//         email: Joi.string()
//             .min(6)
//             .required()
//             .email(),
//         password: Joi.string()
//         .min(6)
//         .required()
//     };
//     return Joi.validate(data,schema);
// } 
// module.exports.loginVal = signupValidation;

// const loginValidation = (data) => {
//     const schema= {
//         email: Joi.string()
//             .min(6)
//             .required()
//             .email(),
//         password: Joi.string()
//         .min(6)
//         .required()
//     };
//     return Joi.validate(data,schema);
// } 
// module.exports.loginVal = loginValidation;
// function validateUserLog(user) {
    
//     const schema = {
//         username: Joi.string().min(3).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(3).max(255).required()
//         // confirmPassword: Joi.string().min(3).max(255).required()
//     };
//     const object = Joi.object(schema);
        
//     const validating = object.validate(user);
//     return validating;
// }

// exports.validateUserLog = validateUserLog;
