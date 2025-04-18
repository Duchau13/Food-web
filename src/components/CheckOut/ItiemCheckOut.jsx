import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import classes from './ItiemCheckOut.module.css';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../apiRequest/axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ItemCheckOut = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([]);

    const getData = async () => {
        const res = await api.get("/cart", {
            headers: {
                access_token: token
            }
        });
        return res;
    };

    const CheckOut = () => {
        if (items.length === 0) {
            return toast.error('Giỏ hàng không có sản phẩm', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            try {
                navigate("/payment");
            } catch (error) {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        getData().then((res) => {
            setItems(res.data.itemList);
        }).catch((err) => {
            console.log(err);
        });
    }, [value]);

    const handleIncrement = (id_item) => {
        api.post(`cart/increase/${id_item}`, {}, {
            headers: {
                access_token: token
            }
        })
        .then((res) => {
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
                setItems(res.data.itemList);
            });
        })
        .catch((res) => {
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
        setValue(value + 1);
    };

    const handleDecrement = (id_item) => {
        api.post(`cart/decrease/${id_item}`, {}, {
            headers: {
                access_token: token
            }
        })
        .then((res) => {
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
                setItems(res.data.itemList);
            });
        })
        .catch((res) => {
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
        setValue(value - 1);
    };

    const handleDeleteItem = (id_item) => {
        api.delete(`cart/remove/${id_item}`, {
            headers: {
                access_token: token
            }
        })
        .then((res) => {
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
                setItems(res.data.itemList);
            });
        })
        .catch((res) => {
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
        setValue(value + 1);
    };

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.amount, 0);

    return (
        <div className={classes["cart-container"]}>
            <div className={classes["cart-items"]}>
                {items.map((item) => (
                    <div className={classes["cart-item"]} key={item.id_item}>
                        <CloseIcon
                            className={classes["icon"]}
                            onClick={() => handleDeleteItem(item.id_item)}
                        />
                        <div className={classes["image-item"]}>
                            <img src={item.image} alt="food image" width="90px" height="90px" />
                        </div>
                        <div className={classes["name-item"]}>
                            <p onClick={() => navigate(`/product-detail/${item.id_item}`)}>{item.name}</p>
                        </div>
                        <div className={classes["price"]}>
                            <p>Đơn Giá: {item.price}</p>
                        </div>
                        <div className={classes["input-quantity"]}>
                            <button onClick={() => handleDecrement(item.id_item)}> - </button>
                            <span>{item.amount}</span>
                            <button onClick={() => handleIncrement(item.id_item)}> + </button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p>Giỏ hàng trống</p>}
            </div>
            <div className={classes["cart-summary"]}>
                <h3>Tóm tắt đơn hàng</h3>
                <div className={classes["summary-items"]}>
                    {items.map((item) => (
                        <div className={classes["summary-item"]} key={item.id_item}>
                            <span>{item.name}</span>
                            <span>x{item.amount}</span>
                            <span>{item.price * item.amount} VNĐ</span>
                        </div>
                    ))}
                </div>
                <div className={classes["total"]}>
                    <span>Tổng cộng:</span>
                    <span>{totalAmount} VNĐ</span>
                </div>
                <div className={classes["checkout-button"]}>
                    <button onClick={CheckOut}>Đặt Hàng</button>
                </div>
                <div className={classes["message"]}>
                    <p>{message}</p>
                </div>
                <div className={classes["handle__error"]}>
                    <p>{error}</p>
                </div>
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
    );
};

export default ItemCheckOut;