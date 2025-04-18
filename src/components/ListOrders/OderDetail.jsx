import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../apiRequest/axios";
import classes from "./OderDetail.module.css";
import Footer from "../UI/Footer";

const OrderDetail = () => {
  const token = localStorage.getItem("token");
  const { id_order } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [infoOrder, setInfoOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Hàm format tiền
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
  };

  // Hàm format ngày giờ

  // Lấy chi tiết đơn hàng
  const getOrdersDetail = async () => {
    const res = await api.get(`/orders/detail/${id_order}`, {
      headers: {
        access_token: token,
      },
    });
    return res;
  };

  // Kiểm tra đăng nhập và lấy chi tiết đơn hàng
  useEffect(() => {
    if (!token) {
      toast.error("Bạn cần đăng nhập để xem chi tiết đơn hàng", {
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

    setIsLoading(true);
    getOrdersDetail()
      .then((res) => {
        setItems(res.data.itemList || []);
        setInfoOrder(res.data.info || {});
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
        toast.error("Không thể tải chi tiết đơn hàng", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, id_order, navigate]);

  // Hủy đơn hàng
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

  // Hiển thị trạng thái đơn hàng
  const Status = ({ value }) => {
    const statusMap = {
      0: {
        text: "Chưa xác nhận",
        className: classes["text-wait"],
        animate: true,
        action: (
          <button
            className={classes["cancel-button"]}
            onClick={hanleCancelOrder}
          >
            Hủy đơn hàng
          </button>
        ),
      },
      1: {
        text: ["Đã xác nhận", "Chờ vận chuyển"],
        className: classes["text-confirm"],
      },
      3: {
        text: ["Đã xác nhận", "Đang giao hàng"],
        className: classes["text-confirm"],
      },
      4: {
        text: ["Đã xác nhận", "Hoàn thành"],
        className: classes["text-confirm"],
      },
      2: { text: "Đã hủy", className: classes["text-cancel"] },
    };

    const status = statusMap[value] || statusMap[2];
    return (
      <div className={classes["status"]}>
        {Array.isArray(status.text) ? (
          status.text.map((text, index) => (
            <p
              key={index}
              className={`${status.className} ${status.animate && index === 0 ? classes["pulse"] : ""}`}
            >
              {text}
            </p>
          ))
        ) : (
          <p className={`${status.className} ${status.animate ? classes["pulse"] : ""}`}>
            {status.text}
          </p>
        )}
        {status.action && <div className={classes["status-action"]}>{status.action}</div>}
      </div>
    );
  };

  return (
    <div className={classes["main-container"]}>
      <div className={classes["title"]}>
        <h1>Chi Tiết Hoá Đơn</h1>
      </div>
      <div className="container">
        {isLoading ? (
          <div className={classes["loading"]}>Đang tải...</div>
        ) : (
          <div className="row">
            <div className="col-12 col-md-8">
              <div className={classes["list__items"]}>
                {items.length === 0 ? (
                  <p className={classes["no-items"]}>Không có sản phẩm nào trong đơn hàng.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id_item} className={classes["cart-item"]}>
                      <div className={classes["image-item"]}>
                        <img
                          src={item.image}
                          alt={item.name}
                          width="90px"
                          height="90px"
                          className="rounded"
                        />
                      </div>
                      <div className={classes["name-item"]}>
                        <p>{item.name}</p>
                      </div>
                      <div className={classes["price"]}>
                        <p>
                          Đơn Giá: <span className={classes["highlight-price"]}>{formatPrice(item.price)}đ</span>
                        </p>
                      </div>
                      <div className={classes["input-quantity"]}>
                        <p>Số lượng: {item.quantity}</p>
                      </div>
                      <div className={classes["total-price"]}>
                        <p>
                          Tổng Giá: <span className={classes["highlight-price"]}>{formatPrice(item.price * item.quantity)}đ</span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={classes["info__order"]}>
                <div className={classes["info__order-title"]}>Thông tin thanh toán</div>
                <div className={classes["info__user"]}>
                  <div className={classes["info__user-item"]}>
                    <span>Tên người dùng:</span>
                    <span>{infoOrder.name_customer || "N/A"}</span>
                  </div>
                  <div className={classes["info__user-item"]}>
                    <span>Số điện thoại:</span>
                    <span>{infoOrder.phone || "N/A"}</span>
                  </div>
                  <div className={classes["info__user-item"]}>
                    <span>Phương thức thanh toán:</span>
                    <span>{infoOrder.name_payment || "N/A"}</span>
                  </div>
                  <div className={classes["info__user-item"]}>
                    <span>Đơn vị vận chuyển:</span>
                    <span>{infoOrder.name_shipping_partner || "N/A"}</span>
                  </div>
                  <div className={classes["info__user-item"]}>
                    <span>Ghi chú:</span>
                    <span>{infoOrder.description || "Không có"}</span>
                  </div>
                  <div className={classes["info__user-item"]}>
                    <span>Ngày đặt hàng:</span>
                    <span>{infoOrder.time_order}</span>
                  </div>
                  <div className={classes["info__user-pay"]}>
                    <span>Tiền hoá đơn:</span>
                    <span className={classes["highlight-price"]}>{formatPrice(infoOrder.item_fee)}đ</span>
                  </div>
                  <div className={classes["info__user-pay"]}>
                    <span>Trạng thái đơn hàng:</span>
                    <Status value={infoOrder.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
      <Footer />
    </div>
  );
};

export default OrderDetail;