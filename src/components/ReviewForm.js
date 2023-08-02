//Review 페이지에서 리뷰 등록 컨테이너
import "../css/ReviewForm.css";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

function ReviewForm({ id, user }) {
  const navigate = useNavigate();
  const query = queryString.parse(window.location.search).query;
  const title = queryString.parse(window.location.search).title;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  //console.log(id, query);

  const addReview = async () => {
    const postObj = {
      user_id: id,
      book_id: query,
      rating: rating,
      comment: comment,
    };
    const result = await axios.post(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/review`,
      postObj
    );

    alert(result.data);
    navigate("/books/info?query=" + query);
  };

  return (
    <div id="rev-form">
      <h1>Book Shop Review +</h1>
      <div id="revs">
        <div className="rev-form-id">
          ID : <b> {user}</b>
        </div>
        <div className="rev-form-book">
          책 이름 : <b>{title}</b>
        </div>
        <div className="rev-form-rating">
          평점 : &nbsp;
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>{" "}
          점
        </div>
      </div>

      <div className="rev-form-com">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="리뷰 작성"
        ></textarea>
      </div>
      <div>
        <button className="rev-form-btn" onClick={addReview}>
          저장
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
  user: state.auth.user,
});

export default connect(mapStateToProps)(ReviewForm);
