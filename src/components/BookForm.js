//책 등록 컨테이너
import "../css/BookForm.css";
import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookForm({ id }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image_file, setImage_file] = useState(null);
  const seller_id = id;
  const [inven, setInven] = useState("");

  const navigate = useNavigate();

  const FileChange = (e) => {
    setImage_file(e.target.files[0]);
  };

  const handleUpload = async () => {
    //console.log(title, author, price, seller_id, description, inven, image_url);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("seller_id", seller_id);
    formData.append("description", description);
    formData.append("file", image_file);
    formData.append("inven", inven);

    //console.log(formData);
    // 데이터와 파일을 함께 업로드하는 API 호출
    await axios
      .post(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/book",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/books");
        //console.log("업로드 성공:", response.data);
      })
      .catch((error) => {
        alert(error);
        //console.error("업로드 실패:", error);
      });
  };

  return (
    <div id="form">
      <h1>Book Shop Book +</h1>
      <div className="form-title">
        <input
          type="text"
          placeholder="제목"
          value={title}
          className="in-title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-author">
        <input
          type="text"
          placeholder="작가"
          value={author}
          className="in-auth"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="form-price">
        <input
          type="text"
          placeholder="가격"
          value={price}
          className="in-price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-inven">
        <input
          type="text"
          placeholder="재고"
          value={inven}
          className="in-inven"
          onChange={(e) => setInven(e.target.value)}
        />
      </div>
      <div className="form-des">
        <textarea
          placeholder="내용"
          value={description}
          className="in-desc"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-file">
        <input type="file" className="in-file" onChange={FileChange} />
      </div>

      <button className="form-btn" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
});

export default connect(mapStateToProps)(BookForm);
