import React from 'react'
import {Link} from 'react-router-dom'

export const Landing = () => {
    return (
        <div>

<section className="landing">
  
         <div className="buttons">
            <Link to="/register" className="btn sign-up">Sign Up</Link>
            <Link to="/login" className="btn login">Login</Link>
          </div>
        <div className =" Showcase">
          <h1 className="x-large"><i class="fas fa-share-alt-square"></i>GameSpace </h1>
          <p className="lead">
          Connect with others by playing fun games
          </p>
          </div>
       
       
      
    </section>
            
        </div>
    )
}

export default Landing