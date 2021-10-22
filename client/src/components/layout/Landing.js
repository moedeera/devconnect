import React from 'react'
import {Link} from 'react-router-dom'

export const Landing = () => {
    return (
        <div>

<section className="landing">
      <div classNameName="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large"><i class="fas fa-share-alt-square"></i>GameSpace </h1>
          <p className="lead">
          Connect with loved ones by playing fun games
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
            
        </div>
    )
}

export default Landing