import React, { useState, useEffect } from 'react';
import classes from './WishListItiem.module.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../apiRequest/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishListItem = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [wishLists, setWishLists] = useState([]);
    const [value, setValue] = useState(1);
    const [isLoading, setIsLoading] = useState({});

    const getData = async () => {
        const res = await api.get("/wishlist", {
            headers: {
                access_token: token
            }
        });
        return res;
    };

    const handleAddToCart = async (id_item) => {
        setIsLoading((prev) => ({ ...prev, [id_item]: true }));
        try {
            const res = await api.post(`cart/add/${id_item}`, { quantity: 1 }, {
                headers: {
                    access_token: token
                }
            });
            setValue(value + 1);
            toast.success('Thêm vào giỏ hàng thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(res);
        } catch (error) {
            console.log(error);
            toast.warn('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setIsLoading((prev) => ({ ...prev, [id_item]: false }));
        }
    };

    const handleRemoveFromWishList = async (id_item) => {
        setIsLoading((prev) => ({ ...prev, [id_item]: true }));
        try {
            const res = await api.post(`wishlist/${id_item}`, {}, {
                headers: {
                    access_token: token
                }
            });
            setValue(value + 1);
            toast.success('Đã xoá khỏi danh sách yêu thích', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(res);
        } catch (error) {
            console.log(error);
            toast.warn('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setIsLoading((prev) => ({ ...prev, [id_item]: false }));
        }
    };

    useEffect(() => {
        getData().then((res) => {
            setWishLists(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [value]);

    return (
        <div>
            <div className={classes['main-content']}>
                <div className={classes['header']}>
                    <h1>Wishlist</h1>
                    <p>
                        <Link to='/'>Home</Link>
                        <ChevronRightIcon />
                        Wishlist
                    </p>
                </div>
            </div>
            <div className={classes['container']}>
                {wishLists.length === 0 ? (
                    <p className={classes['empty-message']}>Danh sách yêu thích trống</p>
                ) : (
                    <div className={classes['wishlist-items']}>
                        {wishLists.map((wishList) => (
                            <div className={classes['wishlist-item']} key={wishList.id_item}>
                                <div className={classes['item-image']}>
                                    <Link to={`/product-detail/${wishList.id_item}`}>
                                        <img src={wishList.image} alt="food image" />
                                    </Link>
                                </div>
                                <div className={classes['item-details']}>
                                    <p
                                        className={classes['item-name']}
                                        onClick={() => navigate(`/product-detail/${wishList.id_item}`)}
                                    >
                                        {wishList.name}
                                    </p>
                                    <p className={classes['item-price']}>Giá: {wishList.price} VNĐ</p>
                                    <p className={classes['item-date']}>20-11-2021</p>
                                </div>
                                <div className={classes['item-actions']}>
                                    <button
                                        className={classes['add-button']}
                                        onClick={() => handleAddToCart(wishList.id_item)}
                                        disabled={isLoading[wishList.id_item]}
                                    >
                                        {isLoading[wishList.id_item] ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                                    </button>
                                    <button
                                        className={classes['remove-button']}
                                        onClick={() => handleRemoveFromWishList(wishList.id_item)}
                                        disabled={isLoading[wishList.id_item]}
                                    >
                                        {isLoading[wishList.id_item] ? 'Đang xoá...' : 'Xoá'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default WishListItem;