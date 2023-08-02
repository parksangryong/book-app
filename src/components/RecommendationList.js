//Recommendation에서 보여주는 추천 책 목록 컨테이너
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Recommendation.css";

function RecommendationList(props) {
  const [rank, setRank] = useState(0);
  const navigate = useNavigate();

  const result = props.poplist.slice(0, 5).map((data, index) => (
    <div className="rere" key={index} onClick={() => setRank(index)}>
      <h4>{index + 1}위</h4>
      <img src={data.image_url} alt={data.title} width="70px" />
      <div className="text5">
        {data.title} ({Math.round(data.avg_score * 10) / 10} 점)
      </div>
    </div>
  ));

  const moveInfo = (index) => {
    navigate("/books/info?query=" + index);
  };

  return (
    <div id="recom">
      <h1>Book Shop BEST 5 </h1>
      <div className="stlist">
        <h3>현재 {rank + 1}위</h3>
        <img
          onClick={() => moveInfo(props.poplist[rank].id)}
          src={props.poplist[rank].image_url}
          alt={props.poplist[rank].title}
          width="200px"
        />
        <div className="sttext">
          {props.poplist[rank].title}(
          {Math.round(props.poplist[rank].avg_score * 10) / 10} 점)
        </div>
      </div>

      <div id="recom5">
        <div>{result}</div>
      </div>
    </div>
  );
}

export default RecommendationList;
