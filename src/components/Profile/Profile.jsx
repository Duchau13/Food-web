import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../apiRequest/axios";
import classes from "./Profile.module.css";
import Footer from "../UI/Footer";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  // Lấy thông tin người dùng
  const getInfo = async () => {
    const res = await api.get("/account/profile", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };

  useEffect(() => {
    // Kiểm tra token, nếu không có thì chuyển hướng về trang chủ
    if (!token) {
      navigate("/");
      return;
    }

    // Gọi API lấy thông tin người dùng
    getInfo()
      .then((res) => {
        setInfo(res.data.userInfo);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        toast.error("Không thể tải thông tin người dùng", {
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

  // Xử lý cập nhật thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        "/account/updateprofile",
        {
          name: info.name,
          phone: info.phone,
          address: info.address,
        },
        {
          headers: {
            access_token: token,
          },
        }
      );
      toast.success("Cập nhật thông tin thành công", {
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
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err);
      toast.error("Cập nhật thông tin thất bại", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Xử lý thay đổi giá trị input
  const handleChange = (e) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={classes["main-container"]}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className={classes["user-info"]}>
              <div className={classes["main-title"]}>
                <h5>Thông tin cá nhân</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={classes["data-user"]}>
                  <div className={classes["title"]}>
                    <h6>Tên</h6>
                  </div>
                  <div className={classes["value-info"]}>
                    <input
                      name="name"
                      value={info.name || ""}
                      type="text"
                      onChange={handleChange}
                      placeholder="Nhập tên"
                    />
                  </div>
                </div>
                <hr />
                <div className={classes["data-user"]}>
                  <div className={classes["title"]}>
                    <h6>Email</h6>
                  </div>
                  <div className={classes["value-info"]}>
                    <h5>{info.email || "N/A"}</h5>
                  </div>
                </div>
                <hr />
                <div className={classes["data-user"]}>
                  <div className={classes["title"]}>
                    <h6>SDT</h6>
                  </div>
                  <div className={classes["value-info"]}>
                    <input
                      name="phone"
                      value={info.phone || ""}
                      type="text"
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                <hr />
                <div className={classes["data-user"]}>
                  <div className={classes["title"]}>
                    <h6>Địa chỉ</h6>
                  </div>
                  <div className={classes["value-info"]}>
                    <input
                      className={classes["input-location"]}
                      name="address"
                      value={info.address || ""}
                      type="text"
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                </div>
                <hr />
                <div className={classes["button__update"]}>
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    <div className={classes["log-out"]}>
                      <button type="button">Đăng Xuất</button>
                    </div>
                  </Link>
                  <div className={classes["button-update"]}>
                    <button type="submit">Cập nhật thông tin</button>
                  </div>
                  <Link to="/change-password">
                    <div className={classes["log-out"]}>
                      <button type="button">Đổi Mật Khẩu</button>
                    </div>
                  </Link>
                </div>
              </form>
            </div>
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
        theme="colored"
      />
      <Footer/>
    </div>
  );
};

export default Profile;