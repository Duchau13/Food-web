import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../apiRequest/axios";
import classes from "./ChangePassword.module.css";
import Footer from "../UI/Footer";

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const navigate = useNavigate();

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!token) {
      toast.error("Bạn cần đăng nhập để đổi mật khẩu", {
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
    }
  }, [token, navigate]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setResetPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra mật khẩu mới và nhập lại mật khẩu có khớp không
    if (newPassword !== resetPassword) {
      toast.error("Mật khẩu mới và nhập lại không khớp", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      await api.put(
        "/account/changepassword",
        {
          oldPassword: password,
          newPassword: newPassword,
          repeatPassword: resetPassword,
        },
        {
          headers: {
            access_token: token,
          },
        }
      );
      toast.success("Đổi mật khẩu thành công", {
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
        navigate("/");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Đổi mật khẩu thất bại";
      toast.error(errorMessage, {
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

  return (
    <div className={classes["main-container"]}>
      <div className="container">
        <div className={classes["form__changepw"]}>
          <div className={classes["login"]}>
            <h1>Đổi Mật Khẩu</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">Mật Khẩu Cũ</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Nhập mật khẩu cũ"
              />
              <label htmlFor="newpassword">Mật Khẩu Mới</label>
              <input
                type="password"
                id="newpassword"
                name="newpassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                placeholder="Nhập mật khẩu mới"
              />
              <label htmlFor="repeatpassword">Nhập Lại Mật Khẩu Mới</label>
              <input
                type="password"
                id="repeatpassword"
                name="repeatpassword"
                value={resetPassword}
                onChange={handleRepeatPasswordChange}
                required
                placeholder="Nhập lại mật khẩu mới"
              />
              <button type="submit">Đổi Mật Khẩu</button>
            </form>
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
      <Footer />
    </div>
  );
};

export default ChangePassword;