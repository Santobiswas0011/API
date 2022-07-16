const mongoose=require("mongoose");
const SchemaVar=mongoose.Schema;

const register_data=new SchemaVar({
   u_name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   }
});

module.exports=mongoose.model("userData",register_data);
