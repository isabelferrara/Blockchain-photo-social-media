import React from 'react';
import Identicon from 'identicon.js';
import photo from '../photo.png'

export default function Navbar({account}) {
  return (
    <nav className="navbar-nav fixed-top bg-white py-3 shadow" style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignContent:'center'}}>
        <img src={photo} width="30" height="30" className="mx-4" alt="" />
          <h5>Sonder</h5>
        </div>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small className="text-secondary">
            <small id="account">{account}</small>
          </small>
          {account
            ? <img
            alt="profile icon"
              className='ml-2'
              style={{borderRadius:'50%'}}
              width='30'
              height='30'
              src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
            />
            : <span></span>
          }
        </li>
      </ul>
    </nav>
  )
}