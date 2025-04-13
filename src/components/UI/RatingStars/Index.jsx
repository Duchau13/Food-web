import RatingStarItem from "./RatingStarItem";

const Index = (props) => {
  let { rating } = props;
  const rendered = [];

  // Xử lý rating = "0.0000" hoặc 0
  if (rating === "0.0000" || Number(rating) === 0) {
    // Random từ 1 đến 5 sao
    rating = Math.floor(Math.random() * 3) + 3;
  }

  // Chuyển rating thành số để xử lý
  rating = Number(rating);

  // Tạo danh sách sao (giữ logic gốc)
  for (let i = 4; i >= 0; i--) {
    rendered.push(<RatingStarItem rating={rating} key={i} />);
    rating -= 1;
  }

  return <ul className="d-flex">{rendered}</ul>;
};

export default Index;