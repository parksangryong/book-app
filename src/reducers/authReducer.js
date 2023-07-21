const initialState = {
  user: null,
  pass: null,
  error: null,
  id: null,
  msg: null,
  email: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.user,
        pass: action.pass,
        email: action.email,
        id: action.id,
      };
    case "LOGIN_OUT":
      return {
        ...state,
        user: null,
        pass: null,
        email: null,
        id: null,
      };

    // 액션 타입에 따른 상태 업데이트 로직을 구현합니다.
    // 예시: 회원가입 요청, 성공, 실패에 따라 상태를 업데이트하는 로직을 구현합니다.
    default:
      return state;
  }
};

export default authReducer;
