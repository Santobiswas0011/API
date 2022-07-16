const express=require("express");
const auth_router=express.Router();
const {body,check}=require("express-validator");

const authContImport=require('../Controllers/authController');

auth_router.post('/register',[
    body("u_name","Enter valid user name").isLength({min:3,max:12}),
    check("email").isEmail().withMessage("Enter valid email"),
    body("password","Enter valid password").matches('^(?=.*[a-z0-9])(?=.*[A-Z])(?=.*[!@#&*]).{4,12}$')
],authContImport.registerController);

auth_router.post('/login',authContImport.loginController);


module.exports=auth_router;
