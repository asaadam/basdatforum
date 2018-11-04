const express = require('express');
const Joi = require('joi');
var bcrypt = require('bcryptjs');
const db = require('../db/connection');
const users =db.get('users');
users.createIndex('username',{unique:true});



const router = express.Router();
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required()
})

router.get('/',(req,res)=>{
    res.json({
        message :'Hello' 
    });
});

router.post('/signup',(req,res,next)=>{
    console.log(req.body);
    const result = Joi.validate(req.body,schema);
    if (result.error === null){
        users.findOne({
            username: req.body.username
        }).then(user=>{
            if (user){
                const error = new Error('Username Allready Created');
                res.status(409);
                next(error);
            }
            else{
                bcrypt.hash(req.body.password, 12).then(hashedPassword =>{
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                      };
                      users.insert(newUser).then(insertedUser=>{
                          res.json(insertedUser);
                      })
                })
            }
        });
    }
    else{
        res.status(406);                
        next(result.error);
    }
})

module.exports=router;