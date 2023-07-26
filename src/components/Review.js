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
      <div>
        <hr />
        <div>{props.username} : </div>
        <div>{rating} 점</div>
        <div>{comment}</div>
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
      </div>
    );
  } else {
    return (
      <div>
        <hr />
        <div>{props.username} : </div>
        <div>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
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
      </div>
    );
  }
}

export default Review;
