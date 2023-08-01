//회원 수정 컨테이너
import "../css/UserProfile.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginOut, loginSuccess } from "../actions/authActions";
import { useState } from "react";
import axios from "axios";

function UserProfile({ user, pass, email, loginOut, loginSuccess }) {
  const [username, setUsername] = useState(user);
  const [password, setPassword] = useState(pass);
  const [useremail, setUserEmail] = useState(email);

  const navigate = useNavigate();

  //console.log(user, pass, email);

  const Modify = async () => {
    const formData = {
      username: username,
      email: useremail,
      password: password,
    };

    //console.log(formData);

    await axios
      .put(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/bookid",
        formData
      )
      .then((data) => {
        //console.log(data);
        alert(data.data);
        alert("다시 로그인해주세요.");
        loginOut();
        navigate("/books");
      })
      .catch((error) => {
        console.error("Error msg: ", error);
        alert("수정 실패");
      });
  };

  const Delete = async () => {
    await axios
      .delete(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/bookid",
        { data: { username } }
      )
      .then((data) => {
        //console.log(data);
        alert(data.data);
        loginOut();
        navigate("/books");
      })
      .catch((error) => {
        console.error("Error msg: ", error);
        alert("탈퇴 실패");
      });
  };

  return (
    <div>
      <div id="profile">
        <h1>Book Shop Update / Delete</h1>
        <div className="profile-id">
          <input
            type="text"
            placeholder="사용자이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            readOnly
          />
        </div>
        <div className="profile-em">
          <input
            type="text"
            placeholder="이메일명"
            value={useremail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="profile-pw">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="profile-btns">
          <button className="profile-mod" onClick={Modify}>
            수정
          </button>
          <button className="profile-del" onClick={Delete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  pass: state.auth.pass,
  error: state.auth.error,
  email: state.auth.email,
});

const mapDispatchToProps = {
  loginOut,
  loginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
