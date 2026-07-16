const express=require('express');
const router=express.Router();
const {handleUserLogin,handleUserSignUp,handleLogout,handleGetCurrentUser,handleUpdateProfile}=require('../controller/user')
const {restrictedToLoggedOnly}=require('../middleware/auth')
router.post('/signup',handleUserSignUp)
router.post('/login',handleUserLogin)
router.post('/logout',handleLogout);
router.get("/me", restrictedToLoggedOnly,handleGetCurrentUser );
router.patch("/profile",restrictedToLoggedOnly,handleUpdateProfile)
module.exports=router;
