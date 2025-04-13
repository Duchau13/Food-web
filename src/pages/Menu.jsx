import React from "react";
import MenuItem from "../components/Menu/MenuItem";
import Footer from "../components/UI/Footer";
const Menu = () =>{

    //setup time reset token login
    var timeOut = localStorage.getItem('timeOut'); // Reset storage 
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > timeOut*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
    return (
        <div style={{marginTop:'4.75rem'}}>
            <MenuItem/>
        </div>
    )
}

export default Menu;