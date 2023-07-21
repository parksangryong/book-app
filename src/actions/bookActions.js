import axios from "axios";

// 책 목록을 불러오는 액션
export const myBooks = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/bookinfo/" +
        id
    ); // 서버의 책 목록 API 엔드포인트

    dispatch({ type: "MY_BOOKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "MY_BOOKS_FAILURE", payload: error.message });
  }
};

// 책 목록을 불러오는 액션
export const fetchBooks = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/book"
    ); // 서버의 책 목록 API 엔드포인트
    //const response = await axios.get("http://localhost:4000/book"); // 서버의 책 목록 API 엔드포인트

    dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_BOOKS_FAILURE", payload: error.message });
  }
};

// 책 등록 액션
export const addBook = (bookData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/book",
      bookData
    ); // 서버의 책 등록 API 엔드포인트
    dispatch({ type: "ADD_BOOK_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ADD_BOOK_FAILURE", payload: error.message });
  }
};

// 책 수정 액션
export const editBook = (bookData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/book`,
      bookData
    ); // 서버의 책 수정 API 엔드포인트
    dispatch({ type: "EDIT_BOOK_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "EDIT_BOOK_FAILURE", payload: error.message });
  }
};

// 책 삭제 액션
export const deleteBook = (bookId) => async (dispatch) => {
  try {
    await axios.delete(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/book`,
      { data: { bookId } }
    ); // 서버의 책 삭제 API 엔드포인트
    dispatch({ type: "DELETE_BOOK_SUCCESS", payload: bookId });
  } catch (error) {
    dispatch({ type: "DELETE_BOOK_FAILURE", payload: error.message });
  }
};
