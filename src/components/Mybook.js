// 내가 올린 책, 내용 수정 및 삭제 설정
import "../css/Mybook.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { myBooks } from "../actions/bookActions";
import Mybookitem from "./Mybookitem";

function Mybook({ id, mybooks, myBooks }) {
  const mylist = mybooks;
  const len = mybooks.length;

  useEffect(() => {
    myBooks(id);

    //console.log(mylist);
  }, [len]);

  const pop = () => {
    myBooks(id);
  };

  const myresult = mylist.map((data, index) => (
    <Mybookitem
      key={index}
      id={data.id}
      title={data.title}
      author={data.author}
      price={data.price}
      inven={data.inven}
      description={data.description}
      image_url={data.image_url}
      seller_id={id}
      pop={pop}
    />
  ));

  return (
    <div>
      <h2>내가 올린 책({len})</h2>
      {myresult}
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
  mybooks: state.book.mybooks,
});

const mapDispatchToProps = {
  myBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mybook);
