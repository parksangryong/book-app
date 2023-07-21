// 내가 올린 책, 내용 수정 및 삭제 설정
import "../css/Mybook.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { myBooks } from "../actions/bookActions";

function Mybook({ id, books, myBooks }) {
  const mylist = books;

  useEffect(() => {
    myBooks(id);
  }, []);

  const myresult = mylist.map((data, index) => (
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
        <div className="book-description">
          <span>내용 : </span>
          <span>{data.description}</span>
        </div>
      </div>
      <div className="book-btn">
        <button>정보 수정</button>
        <button>도서 삭제</button>
      </div>
    </div>
  ));

  return (
    <div>
      <h2>내가 올린 책</h2>
      {myresult}
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
  books: state.book.books,
});

const mapDispatchToProps = {
  myBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mybook);
