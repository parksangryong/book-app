import axios from "axios";

export const loginSuccess = (myid, username, password, myemail) => {
  return {
    type: "LOGIN_SUCCESS",
    msg: "good",
    user: username,
    pass: password,
    email: myemail,
    id: myid,
  };
};
//로그인 성공

export const loginOut = () => {
  return {
    type: "LOGIN_OUT",
    msg: "logout",
  };
};
//로그아웃
