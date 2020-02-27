import React from 'react'
import logo from '../../dct-final.jpg'

function Header(props) {
    return (
        <div style={{display: "flex", alignItems:"center", justifyContent:"center", background:"white", width:"100%", paddingTop:"3px"}}>
            <img src={logo} alt="logo" style={{width:180}}/>
            <h1 style={{margin:0, marginLeft:"-90px", padding:0, paddingTop:2, fontSize: "1.6em", height:40, color:"#45434f", background:"white"}}>CodeShare</h1>
        </div>
    )
}

export default Header