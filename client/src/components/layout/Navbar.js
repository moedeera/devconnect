import React from "react";
import {Link} from 'react-router-dom'


export const Navbar = () => {
    return (
        <div>

<nav className="navbar">
      <h1 className="header">
        <Link to ='/'>
        <i class="fas fa-share-alt-square"></i> Gamespace
          </Link>
      </h1>
      <ul>
     
        
        <li><Link to ="Login">Login</Link></li>
      </ul>
    </nav>

            
        </div>
    )
}


export default Navbar 