import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <NavLink className="nav-link" to={'/records'}>Records</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink className="nav-link" to={'/create'}>Create Record</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink className="nav-link" to={'/equipments'}>Equipments</NavLink>
                </li>
                <li class="nav-item">
                <NavLink className="nav-link" to={'/add'}>Add New Equipment</NavLink>
                </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
