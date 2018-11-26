const express = require('express');
const options = require('../db/connectionAzure');
const router = express.Router();

var knex = require('knex')(options);


router.get('/',(req,res)=>{
    res.json(
     req.user
    )
})




//doesn't need any body to accses . this is get method
router.get('/getThread',(req,res,next)=>{
    const query= "Select * from thread order by idThread desc"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404).json(err);
    })
})
//doesn't need any body to accses . this is get method

router.get('/getOwnThread',(req,res,next)=>{
    const query= "Select * from thread where idUser ='"+req.user._id+"'"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404).json(err);
    })
})

//this get method need body of idThread . 
//idThread is used to create an array of comment.
router.get('/getComment',(req,res,next)=>{
    const query = "Select * from comment where idThread = "+req.body.idThread
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.json(err);
    })

})

//doesn't need any body to accses . this is get method
router.get('/getOwnComment',(req,res,next)=>{
    const query = "select * from comment where idUser = "+req.user._id
    knex.schema.raw(query).then(ress=>{
        res.json(ress)
    }).catch(err=>{
        res.status(404).json(err);
    })
})




//when you want to accses with post thread method in this route , 
//you need to pass body like this
/*

{
    "title": "Coba dari Backend 2",
    "post": "Mari kita coba apakah bisa pada percobaan ke 2 ini"
}
 make sure you pass with right key , so backend can catch your pass , otherwise
 it will return an error

*/

router.post('/postThread',(req,res,next)=>{
    console.log(req.user);
    let query="insert into thread(idUser,title,post,username)" +
    "values("+req.user._id+",'"+req.body.title+"','"+req.body.post+"','"+req.user.username+"')"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })
})

//when you want to accses with post comment method in this route , 
//you need to pass body like this
/*

{
    "idThread": "YourIDTHread",
    "comment": "Comment"
}
 make sure you pass with right key , so backend can catch your pass , otherwise
 it will return an error

*/

router.post('/postComment',(req,res,next)=>{

    let query= "INSERT into comment (idThread,idUser,comments)"+
    "VALUES ("+req.body.idThread+","+req.user._id+",'"+req.body.comment+"')"

    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })


})




module.exports = router;