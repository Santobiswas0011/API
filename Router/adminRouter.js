const express=require("express");
const admin_router=express.Router();
const Auth=require("../Middleware/isAuth");
const adminContImport=require('../Controllers/adminController');

admin_router.get('/',adminContImport.showHomePage);
admin_router.get('/home',Auth,adminContImport.loginCont);

// admin_router.get('/addProduct',adminContImport.addProductCont);

admin_router.post('/productData',adminContImport.productDataCont);

admin_router.get('/showData',adminContImport.showDataCont);

admin_router.put('/update/:e_id',adminContImport.updateCont);

admin_router.delete('/delete/:id',adminContImport.deleteCont);

module.exports=admin_router; 
