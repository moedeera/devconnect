import React from "react";
import {Link} from 'react-router-dom'


export const Navbar = () => {
    return (
        <div>

<nav className="navbar bg-dark">
      <h1>
        <Link to ='/'>
          <i className="fas fa-code"></i> DeeraCode
          </Link>
      </h1>
      <ul>
        <li><Link to ="#!">Developers</Link></li>
        
        <li><Link to ="/register">Portfolio</Link></li>
        <li><Link to ="/login">Projects</Link></li>
      </ul>
    </nav>

            
        </div>
    )
}


export default Navbar 