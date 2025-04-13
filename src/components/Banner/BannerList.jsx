import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useContext } from "react";

import combo from "../../assets/images/banner/combo.png";
import pizza from "../../assets/images/banner/pizza.png";
import burger from "../../assets/images/banner/burger.png";
import chicken from "../../assets/images/banner/chicken.png";
import pasta from "../../assets/images/banner/pasta.png";
import drinks from "../../assets/images/banner/drinks.png";

import BannerItem from "./BannerItem";
import AuthContext from "../../apiRequest/Authprovider";

const BannerItems = [
  {
    id: 1,
    name: "Trà Sữa",
    link: "/menu",
    image: "https://gongcha.com.vn/wp-content/uploads/2019/11/Okinawa-Milk-Foam-Smoothie.png",    // Ảnh trà sữa boba tươi mát, màu sắc hấp dẫn
  },
  {
    id: 2,
    name: "Cà Phê",
    link: "/menu",
    image: "https://product.hstatic.net/1000075078/product/1737356979_cf-den-nong_48501be67be14360a18567c15ed26818_large.png",
    // Ảnh ly cà phê đen đậm đà, phong cách tối giản
  },
  {
    id: 3,
    name: "Trà Đào",
    link: "/menu",
    image: "https://gongcha.com.vn/wp-content/uploads/2018/02/%C4%90en-%C4%91%C3%A0o-2.png",
    // Ảnh trà hoa quả (gần giống trà đào), màu cam vàng nổi bật
  },
  {
    id: 4,
    name: "Đồ Ăn",
    link: "/menu",
    image: "https://gongcha.com.vn/wp-content/uploads/2018/10/kem.png",
    // Ảnh món ăn nhẹ (burger và khoai tây chiên), phù hợp menu quán
  },
  {
    id: 5,
    name: "Bánh",
    link: "/menu",
    image: "https://gongcha.com.vn/wp-content/uploads/2018/03/Kem-S%E1%BB%AFa.png",
    // Ảnh bánh ngọt (cupcake), màu sắc bắt mắt
  },
  {
    id: 6,
    name: "Khác",
    link: "/menu",
    image: "https://gongcha.com.vn/wp-content/uploads/2018/03/%C4%90%E1%BA%ADu-%C4%90%E1%BB%8F.png",
    // Ảnh smoothie trái cây, đại diện cho danh mục "Khác"
  },
];
const BannerList = () => {
  const {auth,setAuth} = useContext(AuthContext)
  console.log(auth)


  return (
    <section className="banner">
      <ul style={{ backgroundColor: "var(--green)", padding: "22px 20px" }}>
        <Container>
          <Row>
            {BannerItems.map((item) => (
              <BannerItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </ul>
    </section>
  );
};

export default BannerList;
