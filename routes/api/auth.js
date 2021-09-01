const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');



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


module.exports = router;