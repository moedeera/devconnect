import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
const Login = () => {

    const [formData, setFormData] = useState({
    
 
    email:'',
    password :'',
 
    });
    
    const { email, password } = formData;
    const onChange = e =>
    setFormData({...formData, [e.target.name]:e.target.value})
    
    
    const onSubmit = async e => {
    e.preventDefault();
  
  
        console.log('success')
  
    }
    
    
    
    
        return (
            <div className ="Landing">
                <Fragment>
     
        <section className="Reg">
          <h1 className="large text-primary">Sign in</h1>
          <p className="lead"><i className="fas fa-user"></i> Sign Your Account</p>
          <form className="form" onSubmit = {e=>onSubmit(e)}>
            <div className="form-group">
             
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
      
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Dont have an account? <Link to ="/register"> Sign Up </Link>
          </p>
        </section>
                </Fragment>
            </div>
        )
    }
    
    export default Login