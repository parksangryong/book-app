//책 목록 컴포넌트
import { useEffect, useState } from "react";
import "../css/BookList.css";
import { Link } from "react-router-dom";
import { fetchBooks } from "../actions/bookActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookList({ books, fetchBooks, id }) {
  const booklist = books;
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const fullpage = Math.floor(booklist.length / 9) + 1;
  const alist = [];

  if (page <= 10) {
    for (var i = 1; i <= fullpage; i++) {
      alist.push(i);
    }
  } else if (page >= fullpage - 10) {
    for (var i = page - 9; i <= fullpage; i++) {
      alist.push(i);
    }
  } else {
    for (var i = page - 4; i <= page + 5; i++) {
      alist.push(i);
    }
  }
  useEffect(() => {
    //getBooklist();
    fetchBooks();
  }, []);

  const addCart = async (bookid) => {
    if (id) {
      //console.log(bookid, id);
      const postObj = { user_id: id, book_id: bookid, quantity: 1 };

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

  const moveInfo = (index) => {
    navigate("/books/info?query=" + index);
  };

  const bookresult = booklist
    .slice(page * (page * 9), (page + 1) * 9)
    .map((data, index) => (
      <div id="book" key={index}>
        <img
          onClick={() => moveInfo(data.id)}
          src={data.image_url}
          alt={data.title}
        />
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
            <span>{data.price} 원</span>
          </div>
          <div className="book-inven">
            <span>재고 : </span>
            <span>{data.inven} 권</span>
          </div>
        </div>
        <div className="book-btn">
          <button onClick={() => addCart(data.id)}>장바구니 담기</button>
        </div>
      </div>
    ));

  const pages = alist.map((data, index) => (
    <div
      className="pageNum"
      key={index}
      onClick={() => setPage(data - 1)}
      id={page == data - 1 ? "active" : ""}
    >
      {data}
    </div>
  ));

  const prev = () => {
    if (page == 0) {
      alert("처음 페이지 입니다.");
      return;
    }
    setPage(page - 1);
  };
  const next = () => {
    if (page == fullpage - 1) {
      alert("마지막 페이지 입니다.");
      return;
    }
    setPage(page + 1);
  };

  return (
    <div id="booklist">
      <h1>Book Shop BookList</h1>

      <div className="pagelist">
        <div className="prev" onClick={prev}>
          &lt;
        </div>
        {pages}
        <div className="next" onClick={next}>
          &gt;
        </div>
      </div>
      <hr />
      <div>
        {id ? (
          <Link to="/books/add" className="booklist-form-btn">
            상품등록
          </Link>
        ) : (
          ""
        )}
      </div>
      <div id="bookfull">{bookresult}</div>
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
