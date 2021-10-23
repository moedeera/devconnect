import React, {Fragment, useState} from 'react'
import axios from 'axios';

 const Register2 = () => {

const [formData, setFormData] = useState({

name:'',
email:'',
password :'',
password2: ''
});

const { name, email, password, password2 } = formData;
const onChange = e =>
setFormData({...formData, [e.target.name]:e.target.value})


const onSubmit = async e => {
e.preventDefault();
if (password !== password2){

    console.log('passwords do not match')
} 
else {

    console.log('success')
}
}




    return (
        <div className = "Landing" >
            <Fragment className="sec1">
 
    <section className="Reg" >

      <h1>Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit = {e=>onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name"
          value = {name}
          onChange = {e =>onChange(e)}
           required />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address"
           name="email"
               value = {email}
          onChange = {e =>onChange(e)}
           
           />
         
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value = {password}
            onChange = {e =>onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value = {password2}
            onChange = {e =>onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn" value="Register" />
        <p >
        Already have an account? <a href="Login">Sign In</a>
      </p>
      </form>
      
    </section>
            </Fragment>
        </div>
    )
}

export default Register2