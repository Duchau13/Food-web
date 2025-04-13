import React from "react";
import classes from './CheckOut.module.css'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItiemCheckOut from "./ItiemCheckOut";
import Footer from "../UI/Footer";

const CheckOut = () => {
    return (
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5  text-center align-baseline'>Giỏ Hàng</h1>
                <p className="text-center "><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Giỏ Hàng</p>
                </div>
            </div>
            <ItiemCheckOut/>
            <Footer/>
        </div>
    )
}

export default CheckOut