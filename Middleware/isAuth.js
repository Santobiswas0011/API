
const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
        const authHeader=req.get("Authorization");
        if(!authHeader){
          const error=new Error("Not Authorization");
          error.statusCode=401;
          throw error;
        }
        const jwt_token=authHeader.split(' ')[1];
        let decodeToken;
        try{
           decodeToken=jwt.verify(jwt_token,process.env.JWT_SECRET);
        }catch(err){
            err.statusCode=500;
            throw err;
        }
        if(!decodeToken){
           const error=new Error("Not Authorization");
           error.statusCode=401;
           throw error;
        }
        req.email=decodeToken.email;
        next();
}
