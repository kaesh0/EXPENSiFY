const jwt=require('jsonwebtoken');
const secretkey=process.env.JWT_SECRET;
function createToken(payload){
    const token=jwt.sign(payload,secretkey);
    return token;
}
function verifyToken(token){
    const payload=jwt.verify(token,secretkey);
    return payload;
}
module.exports=({createToken,verifyToken})