const initialState = {
  books: [],
  error: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        books: action.payload,
        error: null,
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        books: [],
        error: action.payload,
      };
    case "MY_BOOKS_SUCCESS":
      return {
        ...state,
        books: action.payload,
        error: null,
      };
    case "MY_BOOKS_FAILURE":
      return {
        ...state,
        books: [],
        error: action.payload,
      };
    case "ADD_BOOK_SUCCESS":
      return {
        ...state,
        books: [...state.books, action.payload],
        error: null,
      };
    case "ADD_BOOK_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "EDIT_BOOK_SUCCESS":
      const editedBookIndex = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      const updatedBooks = [...state.books];
      updatedBooks[editedBookIndex] = action.payload;
      return {
        ...state,
        books: updatedBooks,
        error: null,
      };
    case "EDIT_BOOK_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_BOOK_SUCCESS":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),

        error: null,
      };
    case "DELETE_BOOK_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    // ... (다른 책 관련 액션들에 대한 리듀서 처리 추가)
    default:
      return state;
  }
};

export default bookReducer;
