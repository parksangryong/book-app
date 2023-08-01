//페이지 헤더 컨테이너
import "../css/Header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginOut } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

function Header({ user, loginOut }) {
  //console.log(window.location.pathname);
  const navigate = useNavigate();

  const check = window.location.pathname;
  //console.log(check);

  const logouts = () => {
    loginOut();
    navigate("/");
  };

  return (
    <nav className="header">
      <div className="hi-box">
        <span className="hi">
          {user ? user + "님, 반갑습니다." : "로그인을 해주세요. "}
        </span>
      </div>

      <ul>
        <li>
          <Link to="/books" className={check === "/books" ? "active" : ""}>
            상품목록
          </Link>
        </li>
        <li>
          <Link
            to="/recommendation"
            className={check === "/recommendation" ? "active" : ""}
          >
            추천
          </Link>
        </li>
        <li>
          {user ? (
            <Link to="/mybook" className={check === "/mybook" ? "active" : ""}>
              판매정보
            </Link>
          ) : (
            ""
          )}
        </li>
        <li>
          {user ? (
            <Link to="/cart" className={check === "/cart" ? "active" : ""}>
              장바구니
            </Link>
          ) : (
            ""
          )}
        </li>

        <li>
          {user ? (
            <Link
              to="/profile"
              className={check === "/profile" ? "active" : ""}
            >
              회원수정
            </Link>
          ) : (
            <Link to="/signup" className={check === "/signup" ? "active" : ""}>
              회원가입
            </Link>
          )}
        </li>
        <li>
          {user ? (
            <div onClick={logouts}>로그아웃</div>
          ) : (
            <Link to="/login" className={check === "/login" ? "active" : ""}>
              로그인
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  loginOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
