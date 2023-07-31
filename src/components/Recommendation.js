//추천 컨테이너
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Recommendation.css";
import RecommendationList from "./RecommendationList";

function Recommendation() {
  const [poplist, setPoplist] = useState([]);

  useEffect(() => {
    getPop();
  }, []);

  const getPop = async () => {
    const result = await axios.get(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/popbook"
    );

    //console.log(result.data);

    setPoplist(result.data);
  };

  if (poplist.length >= 1) {
    return (
      <div>
        <RecommendationList poplist={poplist} />
      </div>
    );
  } else {
    return <div>리뷰달린 작품이 없습니다...</div>;
  }
}

export default Recommendation;
