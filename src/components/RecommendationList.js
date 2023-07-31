//Recommendation에서 보여주는 추천 책 목록 컨테이너
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RecommendationList.css";

function RecommendationList(props) {
  const [rank, setRank] = useState(0);
  const navigate = useNavigate();

  const result = props.poplist.map((data, index) => (
    <div key={index} onClick={() => setRank(index)}>
      {index + 1}.
      <img src={data.image_url} alt={data.title} width="70px" />
      {data.title} /{Math.round(data.avg_score * 10) / 10} 점
    </div>
  ));

  const moveInfo = (index) => {
    navigate("/books/info?query=" + index);
  };

  return (
    <div>
      <div>
        현재 1위
        <div>
          <img
            onClick={() => moveInfo(props.poplist[rank].id)}
            src={props.poplist[rank].image_url}
            alt={props.poplist[rank].title}
            width="200px"
          />
          {props.poplist[rank].title} /{" "}
          {Math.round(props.poplist[rank].avg_score * 10) / 10} 점
        </div>
      </div>

      <hr />

      <div>
        현재 1- 5위 추천
        <div>{result}</div>
      </div>
    </div>
  );
}

export default RecommendationList;
