import {React} from 'react';
import classes from './ProductDetail.module.css'
import RatingStars from "../UI/RatingStars/Index";
import {Link} from 'react-router-dom'
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook"
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
//import AddButton from '../UI/Button/AddButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import WishButton from '../UI/Button/WishButton';
import { useState,useEffect } from 'react';
import Footer from '../UI/Footer';
import RawMaterialFood from './RawMaterialFood';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from '../../apiRequest/axios'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



const ProductDetail = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {id_item} = useParams();
    const [value, setValue] = useState(1);
    const [items,setItems] = useState([])
    const quantity = {quantity: 1}

    useEffect(() => {
        
        async function getData(){
          const res = await api.get(`/items/detail/${id_item}`)
          return res
        }
        getData().then((res) => {
          setItems(res.data.item)
          console.log(res);
          
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
    },[id_item])

    const handleAddToCart = async (id_item) => {
        api.post(`cart/add/${id_item}`,quantity,
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            console.log(res)
            toast.success('Thêm vào giỏ hàng thành công', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); 
        })
        .catch(function (res) {
            console.log(res)
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
        });
    }
    const handleWishList = async (id_item) => {
        api.post(`wishlist/${id_item}`,{},
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            console.log(res)
            toast.success('Đã thêm vào danh sách yêu thích', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); 
        })
        .catch(function (res) {
            console.log(res)
        });
    }
    
    
    
    const toggleTab = (index) => {
            setValue(index);
    }
    
    return (
        <section style={{marginTop:'4.75rem'}}>
            <div className='container' style={{marginTop:'200px'}}>
              <div className={classes['wrapper']}>
                <div className={classes['main-image']}>
                    <img src={items.image} alt="Image" width="100%"></img>
                </div>
                <div className={classes['des-food']}>
                    <h1 className={classes['food-name']}>{items.name}</h1>
                    <RatingStars rating={items.rating} />
                    <p>{items.description}</p>
                    <h1 className={classes['price']}>Giá: {items.price} VNĐ</h1>
                    <hr></hr>
                    <div className={classes['add-main']}>          
                        <button className={classes['button-add']}
                            onClick={() => handleAddToCart(items.id_item)}
                        ><ShoppingBasketIcon className={classes['icon-add']}></ShoppingBasketIcon>ADD TO CART</button> 
                        <div className={classes['wish-button']}
                            onClick={() => handleWishList(items.id_item)}
                        >
                            <div className={classes['wish-icon']}
                            >
                                <WishButton/>
                            </div>
                        </div>
                    </div>
                    <hr style={{marginBottom:'2.5rem'}}></hr>
                    <div className={classes['category-itiem']}>
                        <p>Category:  <Link className={classes['link-itiem']} to="/menu">{items.name_type}</Link></p>
                        <p>Share: <tab/>  
                            <Link to="/"><FacebookIcon className={classes['icon-category']} color="disabled"/></Link>
                            <Link to="/"><YouTubeIcon className={classes['icon-category']} color="disabled"/></Link>
                            <Link to="/"><InstagramIcon className={classes['icon-category']} color="disabled"/></Link>
                            <Link to="/"><TwitterIcon className={classes['icon-category']} color="disabled"/></Link>
                        </p>
                    </div>
                    <hr style={{marginTop:'2rem',marginBottom:'2rem'}}></hr>
                    <ul className={classes['note-content']}>
                        <li>Free global shipping on all orders</li>
                        <li>30 days easy returns if you change your mind</li>
                        <li>Order before noon for same day dispatch</li>
                    </ul>
                    <hr style={{marginTop:'1.5rem',marginBottom:'2rem'}}></hr>
                    <div>
                    <h1 style={{color:'var(--text)',fontWeight:'700',marginRight:'2rem'}}>Guaranteed Safe Checkout
                        <img className={classes['image-pay']} src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/trust-symbols.png" alt="image-"></img>
                    </h1>           
                    </div>
                </div>
              </div>
              <div>
                   
                <div className={classes['button-review']}>
                            <button
                             className = {value===1 ? classes['button-active'] : classes['']}
                             onClick={()=> toggleTab(1) }
                            >
                                Description
                            </button>
                            <button
                            className = {value===2 ? classes['button-active'] : classes['']}
                            onClick={()=> toggleTab(2)}
                            >
                                Review
                            </button>
                </div> 
                <div
                    className = {value===1 ? classes['content-active'] : classes['content-none']}
                >
                    <RawMaterialFood/>
                </div>
                <div
                 className = {value===2 ? classes['content-active'] : classes['content-none']}
                >
                    <p>Review</p>
                </div>
              </div>
              
            </div>
            <Footer/>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            
        </section>
    );
}
export default ProductDetail;