const express = require('express');
const options = require('../db/connectionAzure');
const router = express.Router();

var knex = require('knex')(options);


router.get('/',(req,res)=>{
    res.json({
        message:'Hello',
    })
})
//doesn't need any body to accses . this is get method
router.get('/getThread',(req,res,next)=>{
    knex.schema.raw("Select * from thread").then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404);
        const error = 'Something Error  , please contact adminstrator'
        next(error);
    })
})


//when you want to accses with post method in this route , 
//you need to pass body like this
/*

{
    "idUser": 6,
    "title": "Coba dari Backend 2",
    "post": "Mari kita coba apakah bisa pada percobaan ke 2 ini"
}
 make sure you pass with right key , so backend can catch your pass , otherwise
 it will return an error

*/

router.post('/postThread',(req,res,next)=>{
    let query="insert into thread(idUser,title,post) values("+req.body.idUser+",'"+req.body.title+"','"+req.body.post+"')"
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.json(err);
    })
})


module.exports = router;