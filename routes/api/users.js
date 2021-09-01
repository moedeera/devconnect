const express = require('express')
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require ('config')
const {check, validationResult} = require('express-validator')
const User = require ('../../models/User')



// @route POST API/USERS
// @desc Register user
// @access Public
// router.post('/', [
// check('name','Name is required').not().isEmpty(), 
// check('email', 'please Include Valid Email').isEmail,
// check('password','Please enter at least 6 characters for password')
// .isLength({min:6})
// ], (req,res)=>
// {
  
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         // return res.status(400).json({errors: errors.array()})
//         console.log('error is present')
//     }
//     res.send('User route')
// })


router.post('/', async (req,res)=>
{
const {name,email,password} = req.body;


if(!email||!password){
    res.send("please properly fill all fields")
   
} else {
try{
//Check if user exists 
let user = await User.findOne({email})
if (user){
    return res.status(400).json({errors:[{msg:'User already exists'}]});
}

//get a Users gravatar
const avatar = gravatar.url(email,{
    s:'200',
    r:'pg',
    d:'mm'
})

//Create New User
user = new User ({

name,email,avatar,password

})


//Encrypt password
const salt = await bcrypt.genSalt(10)
user.password = await bcrypt.hash(password, salt)
await user.save();
//Return JSONwebtoken
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

// res.send('User registered')
res.json(token)
}
catch (err){

console.err(err.message)
res.status(500).send('Server error')
}
// const name = req.body.name
// const email = req.body.email;
// const password = req.body.password

     res.send(req.body)
}




    



   
})






module.exports = router;