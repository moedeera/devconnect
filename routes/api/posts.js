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
    
    
 

try {
const user = await User.findById(req.user.id).select('-password');
const newPost = {
text:req.body.text,
name: user.name,
avatar:user.avatar,
user:req.user.id
 
} 
const post = await newPost.save()
res.json(post)

} catch (err) {
 
 console.error(err.message);
res.status(500).send('Server Error')    

}



}
    
    
    )


module.exports = router;