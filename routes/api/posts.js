const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
// const checkObjectId = require('../../middleware/checkObjectId');


// @route POST API/Posts
// @desc Create a post
// @private
router.post('/', [auth], async (req,res)=>{
    
    
 const user = await User.findById(req.user.id).select('-password');

try {

newPost = new Post ({
text:req.body.text,
name: user.name,
avatar:user.avatar,
user:req.user.id
 
} )
const post = await newPost.save()

res.json(post)

} catch (err) {
 
 console.error(err.message);
res.status(500).send('Server Error')    

}



}
    
    
    )
// @route GET all API/Posts
// @desc get all posts
// @private
router.get('/', [auth] , async (req,res)=>{
    
    
try {
    
    const posts = await Post.find().sort({date:-1})
    res.json(posts)


} catch (error) {
    

    console.error(err.message)
    res.status(500).send('Server Error')
}
   

   
   
   }
       
       
       )
// @route GET all API/Posts/:
// @desc get all posts
// @private
router.get('/:id',[auth], async (req,res)=>{

 



try {
    const post = await Post.findById(req.params.id)
if(!post){ res.json('no post found')}
else {res.json(post)}

} catch (err) {

if (err.kind === 'ObjectId'){
    res.status(400).send('No posts found')  

}

    console.error(err.message)
    res.status(500).send('Server Error')  
}



})
// @route DELETE API/Posts/
// @deSC Delete a Post
// @private private
router.delete('/:id',[auth], async (req,res)=>{

 



    try {
        const post = await Post.findById(req.params.id)
    if(post.user.toString() !== req.user.id){ res.json({msg:'not authorized'})


}
    else {
        
        await post.remove();
        
        res.json('post removed')
    }
    
    } catch (err) {
    
    if (err.kind === 'ObjectId'){
        res.status(400).send('No posts found')  
    
    }
    
        console.error(err.message)
        res.status(500).send('Server Error')  
    }
    
    
    
    })
// @route LIKE API/Posts/:id
// @deSC LIKE a Post
// @private private
router.put('/like/:id',[auth], async(req, res)=>{
   
 console.log(req.user.id)
   
try {
     const post = await Post.findById(req.params.id)


if(post.likes.filter(like => like.user.toString()=== req.user.id).length>0){

   return res.status(400).json({msg:'already liked '})
}
else {
post.likes.unshift({user:req.user.id})

await post.save();
 res.json('like submitted')
}


} catch (err) {

    if (err.kind === 'ObjectId'){
         res.status(400).send('No posts found')  
    
    }
    
        console.error(err.message)
         res.status(500).send('Server Error')  
    }

    






})
// @route LIKE API/Posts/:id
// @deSC LIKE a Post
// @private private
router.put('/unlike/:id',[auth], async(req, res)=>{
   
    console.log(req.user.id)
      
   try {
        const post = await Post.findById(req.params.id)
   
   
   if(post.likes.filter(like => like.user.toString()=== req.user.id).length===0){
   
      return res.status(400).json({msg:'you have not liked '})
   }
   else {

    const removeIndex = post.likes.find(like=> like.user.toString().indexOf(req.user.id))

    post.likes.splice(removeIndex, 1)
   
   await post.save();
    res.json('unliked')
   }
   
   
   } catch (err) {
   
       if (err.kind === 'ObjectId'){
            res.status(400).send('No posts found')  
       
       }
       
           console.error(err.message)
            res.status(500).send('Server Error')  
       }
   
       
   
   
   
   })
// @route COMMENT API/posts/comment/:id
// @desc Create a comment on a post
// @private
router.post('/comments/:id', [auth], async (req,res)=>{
    
    console.log(req.body.text)
    const user = await User.findById(req.user.id).select('-password');
    console.log(user)
   
   try {
 
    const post = await Post.findById(req.params.id)

   const newComment = {
  text:req.body.text,
   name: user.name,
   avatar:user.avatar,
   user:req.user.id
    
   } 

   post.comments.unshift(newComment)
   await post.save()
   
   res.json(post.comments)

   
   } catch (err) {
    
    console.error(err.message);
   res.status(500).send('Server Error')    
   
   }
   
   
   
   }
       
       
       )   
// @route DELETE API/posts/comment/:id/comment_Id
// @desc delete  a comment on a post
// @private
router.delete('/comments/:id/:comment_Id', [auth], async (req,res)=>{
     const user = await User.findById(req.user.id).select('-password');
 try {
    
    const post = await Post.findById(req.params.id)
    const comment = post.comments.find(comment => comment._id.toString()===(req.params.comment_Id))
    if(!comment){return res.status(404).json('comment does not exist')



}


    if (comment.user.toString()!==req.user.id)
    {
        console.log('comment.user is = ',comment.user.toString(), 'req.user.id is =', req.user.id)
        return res.status(401).json(req.user.id)
    
    } else {
    post.comments.splice(comment, 1) 
    await post.save()
  }
    res.json('delete successful')
 } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')    
    
 }
       

   
   }
       
       
       )   





module.exports = router;