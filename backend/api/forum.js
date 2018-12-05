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
router.post('/getComment',(req,res,next)=>{
    const query = "Select * from comment where idComment = "+req.body.idComment
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
/*
{
    "idThread": 3
}
*/

router.post('/getAThread',(req,res,next)=>{
    // console.log(req);
    const query= "Select * from thread where idThread ="+req.body.idThread+""
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
    }).catch(err=>{
        res.status(404).json(err);
    })
})

router.post('/getAComment',(req,res,next)=>{
    // console.log(req);
    const query= "select * from comment where idThread = "+req.body.idThread+" order by idComment desc"
    console.log(query);
    knex.schema.raw(query).then(ress=>{
        res.json(ress);
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

//this is put method use for update comment 
/*
please be carefull if you want to edit comment please make sure you edit your own comment.

it's gonna be checked with your token.


   please send me body like this
   {
    "idComment": "your Comment Id",
       "comment": "Comment"
}


*/

router.put('/editComment',(req,res,next)=>{
    let queryUser = "Select * From comment where idUser= "+req.user._id+" and idComment="+req.body.idComment;
    console.log(queryUser)
    knex.schema.raw(queryUser).then(ress=>{
        console.log(ress)
        if(ress.length!=0){
                    let query = "UPDATE comment set comments = '"+req.body.comment+"' where idComment ="+req.body.idComment
                    knex.schema.raw(query).then(ress=>{
                        res.json('done');
                    }).catch(err=>{
                        res.status(404);
                        res.json(err);
                    })     
        }
        else{
            res.status(401);
            const error = new Error ("Not authorized");
            next(error)
        }
    })
})

//this is put method use for update Thread 
/*
please be carefull if you want to edit comment please make sure you edit your own comment.

it's gonna be checked with your token.

   please send me body like this
   {
    "idThread": "your Thread Id",
    "post": "post"
}
*/


router.put('/editThread',(req,res,next)=>{
    let queryUser = "Select*From thread where idUser= "+req.user._id+"and idThread="+req.body.idComment;
    knex.schema.raw(queryUser).then(ress=>{
        if(ress.length!=0){
    let query = "UPDATE thread set post = '"+req.body.post+"' where idThread ="+req.body.idThread
    knex.schema.raw(query).then(ress=>{
        res.json('done');
    }).catch(err=>{
        res.status(404);
        res.json(err);
    })
}
else{
    res.status(401);
    const error = new Error ("Not authorized");
    next(error)
}

})
})

router.delete('/deleteComment',(req,res,next)=>{
    let queryUser = "Select * From comment where idUser= "+req.user._id+" and idComment="+req.body.idComment;
    console.log(queryUser)
    console.log(req.body.idComment);
    knex.schema.raw(queryUser).then(ress=>{
        console.log(ress)
        if(ress.length!=0){
                    let query = "delete comment where idComment ="+req.body.idComment
                    knex.schema.raw(query).then(ress=>{
                        res.json('done');
                    }).catch(err=>{
                        res.status(404);
                        res.json(err);
                    })     
        }
        else{
            res.status(401);
            const error = new Error ("Not authorized");
            next(error)
        }
    })
})

router.delete('/deleteThread',(req,res,next)=>{
    let queryUser = "Select * From thread where idUser= "+req.user._id+" and idThread="+req.body.idThread;
    console.log(queryUser)
    knex.schema.raw(queryUser).then(ress=>{
        console.log(ress)
        if(ress.length!=0){
                    let query = "delete thread where idThread ="+req.body.idThread
                    knex.schema.raw(query).then(ress=>{
                        res.json('done');
                    }).catch(err=>{
                        res.status(404);
                        res.json(err);
                    })     
        }
        else{
            res.status(401);
            const error = new Error ("Not authorized");
            next(error)
        }
    })
})
module.exports = router;