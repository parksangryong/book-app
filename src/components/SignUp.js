//회원가입 컨테이너
import "../css/SignUp.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginOut } from "../actions/authActions";
import axios from "axios";

function SignUp({ loginOut }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const formData = { username: username, email: email, password: password };

    await axios
      .post(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/bookid",
        formData
      )
      .then((data) => {
        //console.log(data.data.message);
        alert(data.data.message);
        alert("다시 로그인해주십시오.");
        loginOut();
        navigate("/books");
      })
      .catch((error) => {
        console.error("Error msg: ", error);
        alert("회원가입 실패");
      });

    // 회원가입 처리 로직 구현
    // 회원가입 성공 시 navigate('/login') 등으로 이동
  };

  return (
    <div id="sign">
      <h1>Book Shop SignUp</h1>
      <div className="sign-id">
        <input
          type="text"
          placeholder="사용자 ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="sign-em">
        <input
          type="text"
          placeholder="이메일명"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="sign-pw">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="sign-btn" onClick={handleSignUp}>
        회원가입
      </button>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  pass: state.auth.pass,
  error: state.auth.error,
});

const mapDispatchToProps = {
  loginOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
