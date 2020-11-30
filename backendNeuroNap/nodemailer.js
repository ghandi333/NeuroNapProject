const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//transpoter to connect to the host domain you want
const transporter = nodemailer.createTransport({    
     service: 'gmail',
     host: 'smtp.gmail.com', 
     port: 587,
     secure: true,
     auth: {        
          user: process.env.EMAIL,        
          pass: process.env.PASSWORD   
     }
});
module.exports = transporter;
