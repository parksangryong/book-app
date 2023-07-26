import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import ShoppingCart from "./components/ShoppingCart";
import Review from "./components/Review";
import Recommendation from "./components/Recommendation";
import UserProfile from "./components/UserProfile";
import Mybook from "./components/Mybook";
import BookDetail from "./components/BookDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/info/*" element={<BookDetail />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<BookForm />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/review/:bookId" element={<Review />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/myBook" element={<Mybook />} />
      </Routes>
    </div>
  );
}

export default App;
