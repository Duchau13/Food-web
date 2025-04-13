import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import classes from "./Advertise.module.css";

//Background
import firstBg from "../../assets/images/advertise/ad_1.jpg";
import secondBg from "../../assets/images/advertise/ad_2.jpg";
import secondBg2 from "../../assets/images/advertise/ad_2_2.jpg";
import thirdBg from "../../assets/images/advertise/ad_3.jpg";

//icons
import scooter from "../../assets/icons/scooter_yellow.png";
import clock from "../../assets/icons/clock.png";
import pizza from "../../assets/icons/pizza.png";

import SmallButton from "../UI/Button/SmallButton";

const Advertise = () => {
  return (
    <section className="Adversisement" style={{ padding: "40px 0" }}>
      <Container fluid="lg">
        <div className={classes["ad-img"]}>
          <Row>
            <Col md={5} className={classes.col}>
              <div className={classes["ad-img__item"]}>
                <img src="https://phuclong.com.vn/uploads/dish/e3a453a57402ee-65000307trsanhnsen.png" alt="first-ad" />
                <div className={`${classes.content} ${classes["content-1"]}`}>
                  <h3>American</h3>
                  <h2>Burger</h2>
                  <h6>* giao hàng nội thành TpHCM</h6>
                  <Link to="menu" className={classes.btn}>
                    <SmallButton>Order ngay</SmallButton>
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={4} className={classes.col}>
              <Row className="flex-column h-100 flex-nowrap">
                <Col md={12} className={classes["middle-item"]}>
                  <div className={classes["ad-img__item"]}>
                    <img src={secondBg} alt="second-ad" />
                    <div
                      className={`${classes.content} ${classes["content-2"]}`}
                    >
                      <h3>Ưu đãi</h3>
                      <h2>Chất lượng</h2>
                      <h6>Chỉ dành cho các khách hàng thành viên</h6>
                      <Link to="menu" className={classes.btn}>
                        <SmallButton>Order ngay</SmallButton>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={12} className={classes["middle-item"]}>
                  <div className={classes["ad-img__item"]}>
                    <img src={secondBg2} alt="second-ad-2" />
                    <div
                      className={`${classes.content} ${classes["content-3"]}`}
                    >
                      <h3>Combo</h3>
                      <h2>Hấp dẫn</h2>
                      <h6>Ghé thăm cùng nhiều combo dành cho bạn</h6>
                      <Link to="menu" className={classes.btn}>
                        <SmallButton>Ghé menu</SmallButton>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={3} className={classes.col}>
              <div className={classes["ad-img__item"]}>
                <img src={thirdBg} alt="third-ad" />
                <div className={`${classes.content} ${classes["content-4"]}`}>
                  <h3>Món chiên</h3>
                  <h2>Đặc biệt</h2>
                  <h6>Nước sốt đậm vị</h6>
                  <Link to="menu" className={classes.btn}>
                    <SmallButton>Ghé menu</SmallButton>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={classes["ad-block"]}>
          <Row className="justify-content-center">
            <Col lg={4} md={6} style={{ padding: "12px" }}>
              <div className={classes["ad-block__item"]}>
                <div className={classes["img-wrapper"]}>
                  <img src={scooter} alt="scooter" />
                </div>
                <div className={classes["item_content"]}>
                  <h4>Miễn phí giao hàng</h4>
                  <p>Miễn phí giao hàng với đơn hàng trị giá hơn 200.000 đ</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} style={{ padding: "12px" }}>
              <div className={classes["ad-block__item"]}>
                <div className={classes["img-wrapper"]}>
                  <img src={clock} alt="clock" />
                </div>
                <div className={classes["item_content"]}>
                  <h4>Giao hàng hỏa tốc</h4>
                  <p>Giao hàng nội thành tối đa trong 1 giờ</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} style={{ padding: "12px" }}>
              <div className={classes["ad-block__item"]}>
                <div className={classes["img-wrapper"]}>
                  <img src={pizza} alt="pizza" />
                </div>
                <div className={classes["item_content"]}>
                  <h4>Sản phẩm chất lượng</h4>
                  <p>Chuỗi hệ thống cửa hàng với nhiều sản phẩm hấp dẫn</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Advertise;
