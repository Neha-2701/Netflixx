import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div className="LeftNavbar">
            <h1>Netflixx</h1>
        </div>
        <div className="RightNavbar">
        <Link to="/" style={{textDecoration:'none'}}><h2>Movies App</h2></Link>
        <Link to="/fav" style={{textDecoration:'none'}}><h2 >Favourites</h2></Link>
        </div>
      </div>
    )
  }
}

