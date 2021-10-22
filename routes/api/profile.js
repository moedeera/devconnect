const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const request = require('request')
const config = require ('config')
const axios = require('axios')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const  {check, validationResult} = require('express-validator');
const { response } = require('express');



// @route GET API/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req,res)=>
{
    try{
   //Call on to try to fetch the Profile     
   console.log((req['user'].id))
const profile =

 await Profile.findOne({user:(req['user'].id)}).populate('user', ['name', 'avatar']);
 
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
console.log('Creating')
//Else Create Profile
profile = await new Profile(profileFields)
await profile.save();
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


// @route POST API/profile
// @desc Get All profiles
// @access Private

router.get('/', async (req,res)=>{




try {
// if (){}

    const profiles = await Profile.find().populate('user',['name', 'avatar'])
    res.json(profiles)
//     else{

//  res.send('unauthorized user')

//     } 





} catch (err) {
    

    console.error(err.message)
    res.status(500).send('Server Error')
}


})
// @route POST API/profile/user/:user_id    
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', auth,  async (req,res)=>{

    try {
    
        const profiles = await Profile.findOne({user:req.params.user_id}).populate('user',['name', 'avatar'])
        res.json(profiles)
if(!profile){return res.status(400).json({msg:'there is no profile for this user'})}


        
    } catch (err) {
        
    
        console.error(err.message)
        if (err.kind == 'ObjectId'){return res.status(400).json({msg:'no profile for this user'})}
        res.status(500).send('Server Error')
    }
    
    
    })
    
// @route DELETE API/profile
// @desc delete profiles
// @access Private

router.delete('/', auth,  async (req,res)=>{

    try {
       // remove users posts* 
    // remove profile
        await Profile.findOneAndRemove({user: req.user.id})
  
        
       
// remove user 
        // await User.findOneAndRemove({_id: req.user.id})
        res.json({msg:'User deleted'})
        
    } catch (err) {
        
    
        console.error(err.message)
        res.status(500).send('Server Error')
    }
    
    
    })


// @route PUT API/profile/experience
// @desc add profiles experience
// @access Private
router.put('/experience', auth, async(req,res)=>{


    console.log(req.user.id)
   const newExp =  req.body;




try {
    const profile = await Profile.findOne({user:req.user.id})
    profile.experience.unshift(newExp);
    await profile.save() 
    res.json(profile)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

   
// const {company,experience, date} = req.body


})
// @route DELETE API/profile/experience
// @desc delete profiles experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req,res)=>{

try {

    const profile = await Profile.findOne({user:req.user.id})

    //get remove index

    const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

    //delete that  experience 
    profile.experience.splice(removeIndex, 1)
    await profile.save() 

    res.json(profile)
    
} catch (err) {
    
}


})



// @route PUT API/profile/education
// @desc add profiles education
// @access Private
router.put('/education', auth, async(req,res)=>{


    console.log(req.user.id)
   const newEdu =  req.body;




try {
    const profile = await Profile.findOne({user:req.user.id})
    profile.education.unshift(newEdu);
    await profile.save() 
    res.json(profile)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

   
// const {company,experience, date} = req.body


})
// @route DELETE API/profile/education
// @desc delete profiles education
// @access Private
router.delete('/education/:edu_id', auth, async (req,res)=>{

try {

    const profile = await Profile.findOne({user:req.user.id})

    //get remove index

    const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.exp_id);

    //delete that  experience 
    profile.education.splice(removeIndex, 1)
    await profile.save() 

    res.json(profile)
    
} catch (err) {
    
}


})

// @route GET  api/profile/github/:username
// @desc get user repos from github
// @access public

router.get('/github/:username', async (req, res) => {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      );
      const headers = {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
      };
  
      const gitHubResponse = await axios.get(uri, { headers });
      return res.json(gitHubResponse.data);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: 'No Github profile found' });
    }
  });


module.exports = router;