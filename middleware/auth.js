const jwt = require ('jsonwebtoken')
const config = require('config')



module.exports = function(req,res,next){
// Get token from header 
const token = req.header('x-auth-token');

// Check if no token
if (!token){

    return res.status(401).json({msg:'No token'})
}

// verify token
try {
 //get token async
const decoded = jwt.verify(token, config.get('jwtSecret'))
//compare with user input
req.user = decoded.user;
// move on once everything is good
next();
console.log(req.user)

}
// if not verified 
catch (err){
//send error message
res.status(401).json({msg:'Token is not valid'})

}




}