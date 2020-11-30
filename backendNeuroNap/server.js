const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const bcrypt = require("bcrypt");
const cryptoRandomString = require("crypto-random-string");
const { User, validate } = require("./models/User");
const { Scode }  = require("./models/secretCode");
const mongo = require("./mongoose");
const bodyParser = require('body-parser');
const transporter = require("./nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3001

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    req.header('User-Agent');
    res.set('Content-Type', 'Content-Type');
    res.type('application/json');
    next();
});
app.get('/', (req, res) => {
    req.header('User-Agent');
    res.set('Content-Type', 'Content-Type');
    res.type('application/json');
  })
// app.get('/signup', async (req, res) => {
//     const users = await User.find({});
//     res.send(users);
// });

app.post('/sign-up', async (req, res) => {

    const { error } = validate(req.body);
    let errors = [];
    if (error) return res.status(400).send(error.details[0].message);
    
    let signup = await User.findOne({ email: req.body.email });
    if (signup) return res.status(400).send("User already registered.");

    if (req.body.password === req.body.confirmPassword){
        
            const newAccount = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }
            user = new User(newAccount);
            user.password = await bcrypt.hash(user.password, 10);
            const name = await User.findOne({username : req.body.username});
            if (name) return res.send("Username is not available please try another one.");
            await user.save();
            const token = user.generateAuthToken();
            console.log(token);
            res.send({ user: user, token: token });

            // const baseUrl = req.protocol + "://" + req.get("host");
            const secretCode = cryptoRandomString({
                length: 6,
            });
            const newCode = new Scode({
                code: secretCode,
                email: user.email,
            });
            await newCode.save();

            const data = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Your Activation Link for your NeuroNap website",
                text: `Please use the link below within the next 10 minutes to activate your account on YOUR APP: /verification/verify-account/${user._id}/${secretCode}`,
                html: `<p>Please use the following link within the next 10 minutes to activate your account on your NeuroNap website: <strong><a href="http:localhost:3001/verification/verify-account/${user._id}/${secretCode}" target="_blank">Email verification</a></strong></p>`,
                
            };
            await transporter.sendMail(data);

            // res.json({
            //     success: true,
            //     userId: user._id,
            //     userStatus: user.status,
            // });
            
    } else {
        res.send("Passwords doesn't match");
    }
    
        
});


app.post('/sign-in',async(req,res)=>{

    const {email,password} = (req.body);
    
        let user= await User.findOne({email});
        if(!user)
        { return res.status(400).json({
            message:"User doesn't exist"
        });
    }  
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
    return res.status(400).json({
        message: "Incorrect password!!"
    });
    // create and assign a token
    const token = jwt.sign({_id: user._id},"mypassword")
    res.status(400).send({token:token, user:user.username})   
});


//Verify user's email address
app.get(
    "/verification/verify-account/:user._id/:secretCode",
    async (req, res) => {
        // try {
           
            const user = await User.findById(req.params.user._id);
            const response = await Scode.findOne({
                email: user.email,
                code: req.params.secretCode,
            });

            if (!user) {
                res.sendStatus(401);
            } else {
            await User.updateOne(
                    { email: user.email },
                    { status: "active" },
                    {  isVerified: true } 
                );
                 
                // await Scode.deleteMany({ email: user.email });
            
            res.sendStatus(500);
        }
    }
);


app.get("/current", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

app.listen(port, () => {
    console.log("Server is up and runing!")
});

mongo.connect();
