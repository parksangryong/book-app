//책 목록 컴포넌트
import { useEffect } from "react";
import "../css/BookList.css";
import { Link } from "react-router-dom";
import { fetchBooks } from "../actions/bookActions";
import { connect } from "react-redux";

function BookList({ books, fetchBooks, id }) {
  const booklist = books;

  useEffect(() => {
    //getBooklist();
    fetchBooks();
  }, []);

  const bookresult = booklist.map((data, index) => (
    <div id="book" key={index}>
      <img src={data.image_url} alt={data.title} />
      <div className="book-text">
        <div className="book-title">
          <span>제목 : </span>
          <span>{data.title}</span>
        </div>
        <div className="book-author">
          <span>작가 : </span>
          <span>{data.author}</span>
        </div>
        <div className="book-price">
          <span>가격 : </span>
          <span>{data.price}</span>
        </div>
        <div className="book-inven">
          <span>재고 : </span>
          <span>{data.inven}</span>
        </div>
      </div>
      <div className="book-btn">
        <button>장바구니에 담기</button>
        <button>리뷰 쓰기</button>
      </div>
    </div>
  ));

  return (
    <div>
      <h1>상품목록</h1>
      <div>{id ? <Link to="/books/add">상품등록</Link> : ""}</div>
      {bookresult}
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
  books: state.book.books,
});

const mapDispatchToProps = {
  fetchBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
