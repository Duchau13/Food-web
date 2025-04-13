import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../apiRequest/axios";
import AuthContext from "../../apiRequest/Authprovider";
import RatingStars from "../UI/RatingStars/Index";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Footer from "../UI/Footer/index";
import classes from "./ListItem.module.css";

const ListItem = () => {
  const [listItems, setListItems] = useState([]); // Sản phẩm hiển thị trên trang hiện tại
  const [allItems, setAllItems] = useState([]); // Toàn bộ sản phẩm của type
  const [types, setTypes] = useState([]);
  const [activeTypes, setActiveTypes] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const quantity = { quantity: 1 };
  const { auth, setAuth } = useContext(AuthContext);

  // Hàm format tiền
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
  };

  // API lấy loại món
  const getTypes = async () => {
    const res = await api.get("/types");
    return res;
  };

  useEffect(() => {
    getTypes()
      .then((res) => {
        setTypes(res.data);
        setAuth(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // API lấy toàn bộ sản phẩm theo type
  const fetchData = async (id_type) => {
    const res = await api.get(`/items?id_type=${id_type}`);
    return res.data.itemList;
  };

  // Lấy dữ liệu mặc định (type 1, page 1)
  const getData = async () => {
    const items = await fetchData(1);
    setAllItems(items);
    setTotalPages(Math.ceil(items.length / itemsPerPage));
    setListItems(items.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  useEffect(() => {
    getData();
  }, []);

  // Xử lý khi chuyển type
  const handleTypes = async (id_type) => {
    const items = await fetchData(id_type);
    setAllItems(items);
    setTotalPages(Math.ceil(items.length / itemsPerPage));
    setListItems(items.slice(0, itemsPerPage));
    setActiveTypes(id_type);
    setCurrentPage(1);
  };

  // Xử lý khi chuyển trang
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setListItems(allItems.slice(start, end));
    setCurrentPage(page);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async (id_item) => {
    api
      .post(`cart/add/${id_item}`, quantity, {
        headers: {
          access_token: token,
        },
      })
      .then((res) => {
        toast.success("Thêm hàng thành công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((res) => {
        toast.error("Thêm hàng thất bại", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // Tạo danh sách số trang
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${classes["page-btn"]} ${currentPage === i ? classes["active-page"] : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={classes["pagination"]}>
        <button
          className={classes["page-btn"]}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages}
        <button
          className={classes["page-btn"]}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="container">
        <h1 className={classes["head-content"]}>Thực đơn hôm nay</h1>
        <div className={classes["list-type"]}>
          {types.map((type) => (
            <div
              key={type.id_type}
              className={
                activeTypes === type.id_type
                  ? classes["active_type"]
                  : classes["type-item"]
              }
              onClick={() => handleTypes(type.id_type)}
            >
              <span>{type.name}</span>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row">
            {listItems.map((listItem) => (
              <div key={listItem.id_item} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div className={`${classes["item"]} border rounded`}>
                  <div
                    className={classes["image"]}
                    onClick={() => navigate(`/product-detail/${listItem.id_item}`)}
                  >
                    <img
                      src={listItem.image}
                      alt={`product ${listItem.name}`}
                      width="100%"
                      height="200px"
                      className="rounded-top"
                    />
                  </div>
                  <div className={classes["content"]}>
                    <div className={classes["rating"]}>
                      <RatingStars rating={listItem.rating} />
                    </div>
                    <div
                      className={classes["name"]}
                      onClick={() => navigate(`/product-detail/${listItem.id_item}`)}
                    >
                      {listItem.name}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className={classes["highlight-price"]}>
                        {formatPrice(listItem.price)} VND
                      </span>
                      <div
                        className={classes["to-cart-btn"]}
                        onClick={() => handleAddToCart(listItem.id_item)}
                      >
                        <ShoppingBasketIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && renderPagination()}
          <ToastContainer
            position="top-right"
            autoClose={1500}
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
  );
};

export default ListItem;