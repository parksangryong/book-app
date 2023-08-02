//리뷰 컨테이너
import { useState } from "react";
import "../css/Review.css";
import axios from "axios";

function Review(props) {
  const [rating, setRating] = useState(props.rating);
  const [comment, setComment] = useState(props.comment);
  const [edit, setEdit] = useState(false);

  const updateReview = async () => {
    if (edit) {
      const upObj = { id: props.id, rating: rating, comment: comment };
      const result = await axios.put(
        `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/review`,
        upObj
      );
      alert(result.data);
      props.Opts(0);
      setEdit(!edit);
    }
    setEdit(!edit);
  };

  const deleteRiview = async () => {
    const id = props.id;
    const result = await axios.delete(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/review`,
      { data: { id } }
    );
    alert(result.data);
    props.Opts(1);
  };

  if (!edit) {
    return (
      <div id="review-item">
        <div>ID : {props.username} </div>
        <div>평점: {rating} 점</div>

        <div className="review-btn">
          {props.user === props.user_id ? (
            <button onClick={updateReview}>수정</button>
          ) : (
            ""
          )}
          {props.user === props.user_id ? (
            <button onClick={deleteRiview}>삭제</button>
          ) : (
            ""
          )}
        </div>
        <div>{comment}</div>
      </div>
    );
  } else {
    return (
      <div id="review-item">
        <div>{props.username} : </div>
        <div>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="review-btn">
          {props.user === props.user_id ? (
            <button onClick={updateReview}>수정</button>
          ) : (
            ""
          )}
          {props.user === props.user_id ? (
            <button onClick={deleteRiview}>삭제</button>
          ) : (
            ""
          )}
        </div>
        <div>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default Review;
