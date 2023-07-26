// 내용 수정 및 삭제 설정
import "../css/Mybook.css";
import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Mybookitem(props) {
  const [edit, setEdit] = useState(false);
  const [image_file, setImage_file] = useState(null);
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [description, setDescription] = useState(props.description);
  const [author, setAuthor] = useState(props.author);
  const [inven, setInven] = useState(props.inven);
  const navigate = useNavigate();

  const FileChange = (e) => {
    setImage_file(e.target.files[0]);
  };

  const pop = () => {
    props.pop();
  };

  const updateItem = async () => {
    if (edit) {
      //console.log(title, author, price);
      if (image_file) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("price", price);
        formData.append("id", props.id);
        formData.append("description", description);
        formData.append("file", image_file);
        formData.append("inven", inven);
        await axios
          .put(
            "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/bookimg",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((data) => {
            //console.log();
            pop();
            alert(data.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        const fdata = {
          id: props.id,
          title: title,
          author: author,
          price: price,
          description: description,
          inven: inven,
        };

        //console.log(fdata);
        await axios
          .put(
            "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/book",
            fdata
          )
          .then((data) => {
            pop();
            //console.log(data);
            alert(data.data);
          })
          .catch((error) => {
            //console.log(error);
            alert(error);
          });
      }
    }
    setEdit(!edit);
  };

  const deleteItem = async () => {
    const id = props.id;
    await axios
      .delete(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/book",
        { data: { id } }
      )
      .then((data) => {
        alert(data.data);
        pop();
        navigate("/");
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error msg: ", error);
      });
  };

  return (
    <div id="book-item">
      {edit ? (
        <input type="file" className="book-file" onChange={FileChange} />
      ) : (
        <img src={props.image_url} alt={props.title} />
      )}

      <div className="book-text">
        <div className="book-title">
          <span>제목 : </span>
          {edit ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <span>{props.title}</span>
          )}
        </div>
        <div className="book-author">
          <span>작가 : </span>
          {edit ? (
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          ) : (
            <span>{props.author}</span>
          )}
        </div>
        <div className="book-price">
          <span>가격 : </span>
          {edit ? (
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <span>{props.price}</span>
          )}
        </div>
        <div className="book-inven">
          <span>재고 : </span>
          {edit ? (
            <input
              type="text"
              value={inven}
              onChange={(e) => setInven(e.target.value)}
            />
          ) : (
            <span>{props.inven}</span>
          )}
        </div>
        <div className="book-description">
          <span>내용 : </span>
          {edit ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          ) : (
            <span>{props.description}</span>
          )}
        </div>
      </div>
      <div className="book-btn">
        {edit ? (
          <button onClick={updateItem}>저장</button>
        ) : (
          <button onClick={updateItem}>수정</button>
        )}
        {edit ? <button onClick={deleteItem}>삭제</button> : ""}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  mybooks: state.book.mybooks,
});

export default connect(mapStateToProps)(Mybookitem);
