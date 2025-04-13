import React from "react";
import classes from './Payment.module.css';
import ItiemCheckOut from '../CheckOut/ItiemCheckOut'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PaymentDetail from "./PaymentDetail";
import Footer from "../UI/Footer";

const Payment = () => {

    return(
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5  text-center align-baseline'>Thanh Toán</h1>
                <p className="text-center "><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Thanh Toán</p>
                </div>
            </div>
            <PaymentDetail/>
            <Footer/>
        </div>
    )
}
export default Payment

