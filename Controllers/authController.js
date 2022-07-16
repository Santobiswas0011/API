
const RegisterModel = require('../Model/AuthModel');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.registerController = (req, res) => {
   const { u_name, email, password } = req.body;
   if (!u_name) {
      return res.status(401).json({
         success: false,
         message: "User name is required"
      })
   } else if (!email) {
      return res.status(401).json({
         success: false,
         message: "Email is required"
      })
   } else if (!password) {
      return res.status(401).json({
         success: false,
         message: "Password name is required"
      })
   } else {
      const error = validationResult(req);
      if (!error.isEmpty()) {
         const errorResponse = validationResult(req).array();
         return res.status(401).json({
            success: false,
            message: errorResponse
         })
      } else {
         RegisterModel.findOne({ email: email }).then((data) => {
            if (data) {
               return res.status(401).json({
                  success: false,
                  message: 'Email already exist'
               })
            } else {
               return bcrypt.hash(password, 10).then((hashPassword) => {
                  const registerData = new RegisterModel({
                     u_name: u_name,
                     email: email,
                     password: hashPassword
                  });
                  return registerData.save().then((data) => {
                     return res.status(201).json({
                        success: true,
                        message: "Registraion done",
                        data: data
                     })
                  }).catch((err) => {
                     return res.status(401).json({
                        success: false,
                        message: err
                     })
                  })
               })
            }
         }).catch((err) => {
            return res.status(401).json({
               success: false,
               message: err
            })
         })
      }
   }
};

exports.loginController = (req, res) => {
   const { email, password } = req.body;
   if (!email) {
      return res.status(401).json({
         success: false,
         message: "Email is requird"
      })
   } else if (!password) {
      return res.status(401).json({
         success: false,
         message: 'Password is required'
      })
   } else {
      RegisterModel.findOne({ email: email }).then((userData) => {
         if (!userData) {
            return res.status(401).json({
               success: false,
               message: "Invalid email"
            })
         } else {
            return bcrypt.compare(password, userData.password).then((data) => {
               if (!data) {
                  return res.status(401).json({
                     success: false,
                     message: "Wrong password"
                  })
               } else {
                  req.session.isLoggedIn = true;
                  req.session.user = userData;

                  return req.session.save((err) => {
                     if (err) {
                        return res.status(401).json({
                           success: false,
                           message: err
                        })
                     } else {
                        const jwt_token = jwt.sign({
                           email: userData.email
                        }, process.env.JWT_SECRET, { expiresIn: "7d" });

                        return res.status(201).json({
                           success: false,
                           message: "Login successfully",
                           token: jwt_token
                        })
                     }
                  })
               }
            }).catch((err) => {
               return res.status(401).json({
                  success: false,
                  message: err
               })
            })
         }
      }).catch((err) => {
         return res.status(401).json({
            success: false,
            message: err
         })
      })
   }
};
