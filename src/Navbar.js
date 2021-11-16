import React, { Component } from 'react';

function Navbar(props) {

  
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a style={{ fontSize: 40, fontWeight: "bold"}}
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
         
          GoodNFT DAPP
        </a>
        <ul className="navbar-nav px-3">
          <li style={{ textAlign: "right", fontSize: 20}} className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{props.account}</small>
            </small>
            {props.account
              ? null
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  
}

export default Navbar;

