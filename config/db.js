const mongoose = require ('mongoose');
const config =require ('config');
const db = config.get ('mongoURI');

const connectDB = async ()=>{

try {
// Waits for a promise to connect to Mongo DB 
await mongoose.connect(db, {useNewUrlParser:true} )
//{useNewUrlParser:true} is to prevent possible errors due to deprecation 
console.log('MongoDB Connected.....')

}

// Lets us know what the error is if promise is not fulfilled
catch (err) {

console.log(err.message);
// exit process
process.exit(1);

}



}


module.exports = connectDB