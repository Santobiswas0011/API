//
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3241;

const mongoose = require("mongoose");
const path=require('path');
const multer=require("multer");
const session=require("express-session");
const cors=require("cors");

const RegisterModel=require('./Model/AuthModel');

// const bodyParser = require('body-parser');

// import router
const admin_router = require("./Router/adminRouter");
const auth_router = require("./Router/authRouter");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const mongodb_connect=require("connect-mongodb-session")(session);

const storage_value=new mongodb_connect({
       uri:process.env.DB_URL,
       collection:"me-session"
});

app.use(session({secret:"secret",resave:false,saveUninitialized:false,store:storage_value}))


app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views","views");
app.use(express.static(path.join(__dirname,"Public")));

app.use("/upload",express.static(path.join(__dirname,"upload")));

const valuStorage=multer.diskStorage({
     destination:(req,file,cb)=>{
        cb(null,'upload')
     },
     filename:(req,file,cb)=>{
       cb(null,file.originalname);
     }
});

const upload=multer({
   storage:valuStorage,
   limits:{
      fileSize:1024*1024*5
   },
   fileFilter:(req,file,cb)=>{
      if(file.mimetype === 'image/jpg' || 
      file.mimetype === 'image/jpeg' || 
      file.mimetype === 'image/png' || 
      file.mimetype === 'image/webp'
      ){
         cb(null,true);
      }else{
          cb(null,false);
      }
   }
});

app.use(upload.single("p_image"));

app.use(cors());

app.use((req,res,next)=>{
      if(!req.session.user){
         return next();
      }else{
         RegisterModel.findById(req.session.user._id).then((userData)=>{
                 req.user=userData;
                 next()
         }).catch((err)=>{
             return res.status(401).json({
                  success:false,
                  message:err
             })
         })
      }
});

// router
app.use(admin_router);
app.use(auth_router);


// connecte database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
          console.log("Database is connected");
          app.listen(PORT, () => {
               console.log(`Server is running`);
          });
     })
     .catch((err) => {
          console.log(err);
     });
