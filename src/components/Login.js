//로그인 컨테이너
import "../css/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginSuccess } from "../actions/authActions";
import axios from "axios";

function Login({ loginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const formData = { username: username, password: password };

    await axios
      .post(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/booklogin",
        formData
      )
      .then((data) => {
        //console.log(data.data.data[0]);
        alert(data.data.message);
        const email = data.data.data[0].email;
        const id = data.data.data[0].id;
        //console.log(id, username, password, email);
        loginSuccess(id, username, password, email);
        navigate("/books");
      })
      .catch((error) => {
        console.error("Error msg: ", error);
        //alert("로그인 실패");
      });

    // 로그인 처리 로직 구현
    // 로그인 성공 시 navigate('/books') 등으로 이동
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
  user: state.auth.user,
  pass: state.auth.pass,
  error: state.auth.error,
});

const mapDispatchToProps = {
  loginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
