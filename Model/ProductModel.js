const mongoose=require('mongoose');
const SchemeVar=mongoose.Schema;

const productData=new SchemeVar({
     p_title:{
         type:String,
         required:true
     },
     p_price:{
         type:String,
         required:true
     },
     p_desc:{
         type:String,
         required:true
     },
     p_image:{
         type:String,
         required:true
     }
});

module.exports=mongoose.model("product_data",productData);
