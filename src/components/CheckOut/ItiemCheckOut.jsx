import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import classes from './ItiemCheckOut.module.css'
import Table from 'react-bootstrap/Table';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../apiRequest/axios';
import Mapbox from "../Mapbox/Mapbox";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ItiemCheckOut = () => {
    const token = localStorage.getItem('token')
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    const navigate = useNavigate();

    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [value, setValue] = useState(1);
    const [paysmethod, setPaysmethod] = useState([]);
    const [pays,setPays] = useState('');
    const [items, setItems] = useState([])
    const [description,setDescription] = useState('Ghi Chu')
    const [shippings,setShippings] = useState([])
    const [code,setCode] = useState('')
    const [selectedShipper, setSelectedShipper] = useState('')
    const payments = [...paysmethod]


    const getData = async() => {
        const res = await api.get("/cart",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    const getPayment = async() => {
        const res = await api.get("/payment_methods",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    const getShipping_partners = async() => {
        const res = await api.get("/shipping_partners",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    console.log(pays,description,selectedShipper,latitude,longitude,code)
    const CheckOut = () => {
        if(items.length===0){
            return(
                toast.error('Giỏ hàng không có sản phẩm', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            ))
        }  
        else{
            try{
                navigate("/payment")
            }catch(error){
            console.log(error.response.data);
            }
        }
    }

    // gọi items trong cart
    useEffect(() => {
      
        getData().then((res) => {
          setItems(res.data.itemList)
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[value])

    // goi methods payment
    useEffect(() => {
        getPayment().then((res) => {
            setPaysmethod(res.data.paymentList)
        })
        getShipping_partners().then((res) => {
            setShippings(res.data.itemList)
            
        })
    },[])
    
    const handleChangePay = (e) => {
        setPays(e.target.value)
    }
    const handleChangeDes = (e) => {
        setDescription(e.target.value)
    }
    const handleChangeShipper = (e) => {
        setSelectedShipper(e.target.value)
    }
    //  console.log(latitude)
    // const handleChange = (event) => {
    //     setValue(Math.min(Math.max(Number(event.target.value), 1), 100));
    // };

    //Tang giam so luong items
    const handleIncrement = (id_item) =>{
        api.post(`cart/increase/${id_item}`,{},
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            console.log(res)
            toast.success('Tăng số lượng thành công', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getData().then((res) => {
                setItems(res.data.itemList)
            })
            getData().catch((err) => {
                console.log(err)
            })
        })
        .catch(function (res) {
            console.log(res)
            toast.error('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
        setValue(value + 1)
    }
    //console.log(value)
    const handleDecrement = (id_item) =>{
        api.post(`cart/decrease/${id_item}`,{},
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            console.log(res)
            toast.success('Giảm số lượng thành công', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }); 
            getData().then((res) => {
                setItems(res.data.itemList)
            })
            getData().catch((err) => {
                console.log(err)
            })
        })
        .catch(function (res) {
            console.log(res)
            toast.error('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
        setValue(value - 1)
    }
    const handleDelteitem = async (id_item) => {
        setValue(value + 1)
        api.delete(`cart/remove/${id_item}`,
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            console.log(res)
            setValue(value + 1)
            toast.success('Đã xoá khỏi giỏ hàng', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }); 
            getData().then((res) => {
                setItems(res.data.itemList)
            })
            getData().catch((err) => {
                console.log(err)
            })
        })
        .catch(function (res) {
            console.log(res)
            toast.warn('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }
    console.log();
    
    
    return (
        <div className="container">
            {items.map((item) =>{
            return(
            <div>
            <div className={classes["cart-item"]} key={item.id_item}>
                <CloseIcon className={classes["icon"]} 
                    onClick={() => handleDelteitem(item.id_item)}
                />
                <div className={classes["image-item"]}>
                    <img src={item.image} alt="food image" width="90px" height="90px"></img>
                </div>
                <div className={classes["name-item"]}>
                    <p onClick={() => navigate(`/product-detail/${item.id_item}`)}>{item.name}</p>
                </div>
                <div className={classes["price"]}>
                    <p>Đơn Giá : {item.price}</p>
                </div>
                <div className={classes["input-quantity"]}>
                        <button onClick={() => handleIncrement(item.id_item)}> + </button>
                        <button>{item.amount}</button>
                        <button onClick={() => handleDecrement(item.id_item)}> - </button>
                </div>
                <div className={classes["total-price"]}>
                    <p>Tổng Giá : {item.price * item.amount}</p>
                </div>
            </div>
            <hr></hr>
            </div>
            )})}
            <hr></hr>
            <div className={classes["message"]}>
                <p>{message}</p>
            </div>
            <div className={classes["handle__error"]}>
                <p>{error}</p>
            </div>
            {/* <div className={classes["payment__map"]}>
            <div className={classes["payment__method"]}>
            <p>Chọn Phương thức thanh toán:</p>
            <select name="lang" id="lang-select" multiple onChange={handleChangePay} className={classes["set__payment"]}>
                {payments.map((pay) => {
                    return(
                    <option value={pay.id_payment}>
                        {pay.name}
                    </option>
                )})}   
            </select>
            <p>Thêm ghi chú cho đơn hàng</p>
            <textarea name="message" rows="7" cols="38" placeholder="Ghi Chú" onChange={handleChangeDes}></textarea>
            <p>Chọn đơn vị vận chuyển:</p>
            <select name="lang" id="lang-select" multiple onChange={handleChangeShipper} className={classes["set__payment"]}>
                {shippings.map((shipping) => {
                    return(
                    <option value={shipping.id_shipping_partner}>
                        {shipping.name}
                    </option>
                )})}   
            </select>
            </div>
            {/* <div className={classes["box__map"]}>
                <Mapbox/>
            </div> 
            </div> */}
            <div className={classes["Check__out"]}>
                <button
                    onClick={CheckOut}
                >
                    Đặt Hàng
                </button>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
        
    )
}

export default ItiemCheckOut