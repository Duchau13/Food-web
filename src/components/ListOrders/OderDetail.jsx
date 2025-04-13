import React from "react";
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import api from '../../apiRequest/axios';
import classes from './OderDetail.module.css'
import Footer from "../UI/Footer";

const OrderDetail = () => {
  const token = localStorage.getItem('token');
  const { id_order } = useParams();

  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [infoOder, setInfoOder] = useState({})

  // Hàm format tiền thêm dấu chấm
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0';
  };

  const getOrdersDetail = async () => {
    const res = await api.get(`/orders/detail/${id_order}`, {
      headers: {
        access_token: token
      }
    })
    return res
  }
  useEffect(() => {
    getOrdersDetail().then((res) => {
      setItems(res.data.itemList)
      setInfoOder(res.data.info)
      console.log(res)
    })
    getOrdersDetail().catch((err) => {
      console.log(err)
    })
  }, [])

  const hanleCancelOrder = () => {
    try {
      api.get(`/orders/cancel/${id_order}`, {
        headers: {
          access_token: token
        }
      })
      toast.success('Đã Huỷ Đơn Hàng', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate('/orders')
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  function Status(e) {
    const order = e.value
    if (order == 0) {
      return (
        <div className={classes["status-wait"]}>
          <p className={classes['text-wait']}>Chưa xác nhận</p>
          <button
            className={`${classes['cancle-button']} btn btn-danger btn-sm`}
            onClick={hanleCancelOrder}
          >
            Huỷ đơn hàng
          </button>
        </div>
      )
    }
    if (order === 1) {
      return <div><p className={classes['text-confirm']}>Đã xác nhận</p>
        <p className={classes['text-wait']}>Chờ vận chuyển</p>
      </div>
    }
    if (order === 3) {
      return <div><p className={classes['text-confirm']}>Đã xác nhận</p>
        <p className={classes['text-wait']}>Đang giao hàng</p>
      </div>
    }
    if (order === 4) {
      return <div><p className={classes['text-confirm']}>Đã xác nhận</p>
        <p className={classes['text-confirm']}>Đơn hàng hoàn thành</p>
      </div>
    }
    else {
      return <p className={classes['text-cancel']}>Đã huỷ</p>
    }
  }

  return (
    <div className={`${classes.container} bg-white`}>
      <div className={classes["title"]}>
        <h1>Chi Tiết Hoá Đơn</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-8">
          <div className={classes["list__items"]}>
            {items.map((item) => (
              <div key={item.id_item}>
                <div className={`${classes["cart-item"]} bg-light border border-secondary rounded p-3 mb-3`}>
                  <div className={classes["image-item"]}>
                    <img
                      src={item.image}
                      alt="food image"
                      width="90px"
                      height="90px"
                      className="rounded"
                    />
                  </div>
                  <div className={classes["name-item"]}>
                    <p className="mb-0">{item.name}</p>
                  </div>
                  <div className={classes["price"]}>
                    <p className="mb-0">
                      Đơn Giá: <span className={classes["highlight-price"]}>{formatPrice(item.price)}đ</span>
                    </p>
                  </div>
                  <div className={classes["input-quantity"]}>
                    <p className="mb-0">Số lượng: {item.quantity}</p>
                  </div>
                  <div className={classes["total-price"]}>
                    <p className="mb-0">
                      Tổng Giá: <span className={classes["highlight-price"]}>{formatPrice(item.price * item.quantity)}đ</span>
                    </p>
                  </div>
                </div>
                <hr className="border-secondary" />
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className={`${classes["info__order"]} bg-light border border-secondary rounded p-4`}>
            <div className={`${classes["info__order-title"]} fw-bold mb-3`}>Thông tin thanh toán</div>
            <div className={classes["info__user"]}>
              <div className={classes["info__user-item"]}>
                <span className="fw-bold">Tên người dùng:</span>
                <span>{infoOder.name_customer}</span>
              </div>
              <div className={classes["info__user-item"]}>
                <span className="fw-bold">Số điện thoại:</span>
                <span>{infoOder.phone}</span>
              </div>
              <div className={classes["info__user-item"]}>
                <span className="fw-bold">Phương thức thanh toán:</span>
                <span>{infoOder.name_payment}</span>
              </div>
              <div className={classes["info__user-item"]}>
                <span className="fw-bold">Đơn vị vận chuyển:</span>
                <span>{infoOder.name_shipping_partner}</span>
              </div>
              <div className={classes["info__user-item"]}>
                <span className="fw-bold">Ghi chú:</span>
                <span>{infoOder.description || "Không có"}</span>
              </div>
              <div className={classes["info__user-pay"]}>
                <span className="fw-bold">Tiền hoá đơn:</span>
                <span className={classes["highlight-price"]}>{formatPrice(infoOder.item_fee)}đ</span>
              </div>
              {/* <div className={classes["info__user-deliveryfee"]}>
                <span className="fw-bold">Phí vận chuyển:</span>
                <span className={classes["highlight-price"]}>{formatPrice(infoOder.delivery_fee)}đ</span>
              </div>
              <div className={classes["info__user-deliveryfee"]}>
                <span className="fw-bold">Tổng hoá đơn:</span>
                <span className={classes["highlight-price"]}>{formatPrice(infoOder.total)}đ</span>
              </div> */}
              <div className={classes["info__user-deliveryfee"]}>
                <span className="fw-bold">Trạng thái đơn hàng:</span>
                <Status value={infoOder.status} />
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
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
      </div>
      <Footer />
    </div>
  )
}

export default OrderDetail