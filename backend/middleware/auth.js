const {verifyToken}=require('../service/auth');
function restrictedToLoggedOnly(req,res,next){
    try{
        const token=req.cookies?.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const user=verifyToken(token);
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
           return res.status(401).json({message:"Invaid or Expired token"});
    }
}
function checkLoggedIn(req,res,next){
    try{
        const token=req.cookies?.token;
        if(!token){
            return next();
        }
        const user=verifyToken(token);
        req.user=user;
        next();
    }
    catch(err){
        next();
    }
}
module.exports={restrictedToLoggedOnly,checkLoggedIn}