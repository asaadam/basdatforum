const jwt = require('jsonwebtoken');

require('dotenv').config();



//please be carefull , dont pass your token with "" , 
//otherwise it will make you unathorized.
function checkToken(req,res,next){
    console.log('check auth')
    const authHeader = req.get('authorization');
        jwt.verify(authHeader,process.env.TOKEN_SECRET,(err,user)=>{
            if (err){
                res.status(401).json("Unauthorized");
            }
            else{
                req.user=user;
                next();
            }
        })
    }

  


module.exports={
    checkToken
}