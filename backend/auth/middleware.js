const jwt = require('jsonwebtoken');

require('dotenv').config();

function checkToken(req,res,next){
    console.log('check auth')
    const authHeader = req.get('authorization');
        jwt.verify(authHeader,'asdfgh'),(err,user)=>{
            if (err){
                console.log(err);
            }
            else {
                req.user=user;
                next();
            }
        };
    }
  


module.exports={
    checkToken
}