import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../apiRequest/axios";
import classes from "./ListOrders.module.css";

const ListOrders = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Format giá tiền
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
  };

  // Lấy danh sách đơn hàng
  const getOrders = async () => {
    const res = await api.get("/orders", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };

  // Kiểm tra đăng nhập và lấy đơn hàng
  useEffect(() => {
    if (!token) {
      toast.error("Bạn cần đăng nhập để xem đơn hàng", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    getOrders()
      .then((res) => {
        setOrders(res.data.orderList || []);
        console.log(orders);
        
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
        toast.error("Không thể tải danh sách đơn hàng", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }, [token, navigate]);

  // Hủy đơn hàng (đồng bộ với OrderDetail.js)
  const hanleCancelOrder = (id_order) => {
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

  // Hiển thị trạng thái đơn hàng
  const Status = ({ value }) => {
    const statusMap = {
      0: { text: "Chưa xác nhận", className: classes["text-wait"], animate: true },
      1: { text: "Đã xác nhận", className: classes["text-unconfirm"] },
      2: { text: "Đã hủy", className: classes["text-cancel"] },
      3: { text: "Đang giao", className: classes["text-unconfirm"] },
      4: { text: "Hoàn thành", className: classes["text-confirm"] },
    };

    const status = statusMap[value] || statusMap[1];
    return (
      <p className={`${status.className} ${status.animate ? classes["pulse"] : ""}`}>
        {status.text}
      </p>
    );
  };

  return (
    <div className={classes["main-container"]}>
      <div className={classes["title"]}>
        <h1>Danh Sách Hoá Đơn</h1>
      </div>
      <div className="container">
        <div className={classes["container__orders"]}>
          {isLoading && <div className={classes["loading"]}>Đang xử lý...</div>}
          {orders.length === 0 ? (
            <p className={classes["no-orders"]}>Bạn chưa có đơn hàng nào.</p>
          ) : (
            orders.map((order) => (
              <div className={classes["cart-item"]} key={order.id_order}>
                <div className={classes["name-item"]}>
                  <p
                    onClick={() => navigate(`/orders/${order.id_order}`)}
                    title={`Xem chi tiết đơn hàng #${order.id_order}`}
                  >
                    Đơn hàng ngày: {order.time_order}
                  </p>
                </div>
                <div className={classes["price"]}>
                  <p>Đơn Giá: {formatPrice(order.item_fee)} VNĐ</p>
                </div>
                <div className={classes["total-price"]}>
                  <p>Tổng Giá: {formatPrice(order.item_fee)} VNĐ</p>
                </div>
                <div className={classes["status"]}>
                  <Status value={order.status} />
                </div>
                {(order.status === 0 || order.status === 1) && (
                  <div className={classes["action"]}>
                    <button
                      className={classes["button-cancel"]}
                      onClick={() => hanleCancelOrder(order.id_order)}
                      disabled={isLoading}
                    >
                      Hủy đơn
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
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
        theme="colored"
      />
    </div>
  );
};

export default ListOrders;