//Booklist에서 연결 - 책 상세 정보 컨테이너 - 리뷰창으로 연결
import "../css/BookDetail.css";
import axios from "axios";
import queryString from "query-string";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import Review from "./Review";
import { useNavigate } from "react-router-dom";

function BookDetail({ id }) {
  const [book, setBook] = useState([]);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();
  const [opt, setOpt] = useState(0);

  useEffect(() => {
    const queryObj = queryString.parse(window.location.search);
    const query = queryObj.query;

    getbook(query);
    getReview(query);
  }, [opt]);

  const getbook = async (query) => {
    const result = await axios.get(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/bookDetail/` +
        query
    );
    //console.log(result.data);
    setBook(result.data);
  };

  const getReview = async (query) => {
    const result = await axios.get(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/review/` +
        query
    );
    //console.log(result.data);
    setReview(result.data);
    setOpt(result.data.length);
  };

  const addCart = async () => {
    if (id) {
      //console.log(book[0].id, id);
      const postObj = { user_id: id, book_id: book[0].id, quantity: 1 };

      const result = await axios.post(
        `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/cart`,
        postObj
      );

      //console.log(result);
      alert(result.data);
    } else {
      alert("로그인 해주세요.");
    }
  };

  const Opts = (num) => {
    setOpt(opt - num);
  };

  const result = review.map((data, index) => (
    <Review
      key={index}
      id={data.id}
      user_id={data.user_id}
      book_id={data.book_id}
      rating={data.rating}
      comment={data.comment}
      username={data.username}
      user={id}
      Opts={Opts}
    />
  ));

  if (book[0]) {
    return (
      <div>
        <img src={book[0].image_url} width="50px" />
        <div className="book-data">
          <div>제목 : {book[0].title}</div>
          <div>작가 : {book[0].author}</div>
          <div>가격 : {book[0].price}</div>
          <div>개수 : {book[0].inven}</div>
          <div>올린사람 : {book[0].seller_id}</div>
          <div>내용 : {book[0].description}</div>
        </div>
        <div className="book-btn">
          <button onClick={addCart}>장바구니</button>
          <button>구매</button>
        </div>

        <hr />

        <div className="review">
          리뷰개수({opt})
          {id ? (
            <button
              onClick={() =>
                navigate(
                  "/review?query=" + book[0].id + "&title=" + book[0].title
                )
              }
            >
              리뷰쓰기
            </button>
          ) : (
            ""
          )}
          {result}
        </div>
      </div>
    );
  } else {
    return <div>불러오는 중...</div>;
  }
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
});

export default connect(mapStateToProps)(BookDetail);
