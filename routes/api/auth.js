const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require ('config')
const {check, validationResult} = require('express-validator')



// @route GET API/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res)=>

{

try { 
// Will see if user is same as one of the users already there
const user = await User.findById(req.user.id).select('-password')
res.json(user);
}

catch (err){

console.error(err.message)
res.status(500).send('Server Error')
}

}





)


// @route POST API/auth
// @desc Authenticate token
// @access Public


router.post('/', async (req,res)=>
{
const {email,password} = req.body;


if(!email||!password){
    res.send("Please enter all fields")
   
} else {
try{
//Check if user exists 
let user = await User.findOne({email})
if (!user){
    return res.status(400).json({errors:[{msg:'User does not exist'}]});
}
//check to see if password is match
const isMatch = await bcrypt.compare(password, user.password);
// if its not a match
if (!isMatch){return res.status(400).json({errors:[{msg:'Incorrect Password'}]}) }



const payload ={

    user:{
        id:user.id
    }
}
jwt.sign(payload,
     config.get('jwtSecret'),
     {expiresIn:360000},
     (err,token)=>{
         if(err) throw err;
         res.json({token})
     }
     )


res.json(token)
}
catch (err){

console.err(err.message)
res.status(500).send('Server error')
}


    
}




    



   
})







module.exports = router;