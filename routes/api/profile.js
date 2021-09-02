const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')

const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const  {check, validationResult} = require('express-validator')



// @route GET API/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req,res)=>
{
    try{
   //Call on to try to fetch the Profile     
const profile =

 await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
 
if(!profile){return res.status(400).json({msg:'No Profile exists for this username'})}
    }
catch(err){
console.error(err.message);
res.status(500).send('Server Error')
}})



// @route POST API/profile
// @desc Create or update user profile
// @access Private
router.post('/',[auth], async (req,res)=>{


const user = {company:"", skills:"",status:"",website:""}

    user.company = req.body.company
    user.skills = req.body.skills
    user.status= req.body.status
    user.website= req.body.website


   



if(!user.status||!user.skills){
  return res.status(400).json('please enter skills and status')
}


// //build profile
const profileFields ={}

profileFields.user = req.user.id;
if(user.company) profileFields.company=user.company;
if(user.website) profileFields.website = user.website;
profileFields.skills=user.skills.split(',').map(skill=>skill.trim())

// profileFields.social ={}


    // if (twitter) profileFields.social.twitter = twitter;
    // if (facebook) profileFields.social.facebook = facebook;

try{
let profile =  await Profile.findOne({user:req.user.id})
// Update if Profile found
if (profile)
{ 
    console.log('profile found')
    profile = 
await Profile.findOneAndUpdate({user:req.user.id},
    {$set:profileFields},
    {new:true});
    return res.json(profile)
    
    }
else {
console.log('profile no found')
//Else Create Profile
profile = await new Profile(profileFields)
profile.save();
return res.json(profile)

}

        
}


catch(err){

    console.error(err.message);
    return res.status(500).send('Server Error')
}


console.log(profileFields)
res.send('hello')

})




// router.post('/',
// [auth,
// check('status','status required').not().isEmpty(),
//  check('skills','skills is required').not().isEmpty()],
//  async (req,res)=>{

// const errors = validationResult(req)
// if(!errors.isEmpty()){
//     return res.status(400).json({errors:errors.array()})
// }
// const {
//     company,website,status,skills
// } = req.body
// //build profile
// const profileFields ={}
// profileFields.user = req.user.id;
// if(company) profileFields.company=company;
// if(website) profileFields.website = website;
// profileFields.skills=skills.split(',').map(skill=>skill.trim())

// // profileFields.social ={}


//     // if (twitter) profileFields.social.twitter = twitter;
//     // if (facebook) profileFields.social.facebook = facebook;

// try{
// let profile = await Profile.findOne({user:req.user.id})

// if (profile) 

// { 
//     console.log('profile found')
//     profile = 
// await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
//     return res.json(profile)
    
//     }
// profile = await new Profile(profileFields)
// await profile.save();
// res.json(Profile)
        
// }


// catch(err){

//     console.error(err.message);
//     res.status(500).send('Server Error')
// }


// console.log(profileFields)
// res.send('hello')

// })






module.exports = router;