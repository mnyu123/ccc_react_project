import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main_page";
import BookDetail from "./pages/Book_detail";
import CccRegister from "./pages/ccc_Register";
import CccLogin from "./pages/ccc_Login";
import BookSearch from "./pages/BookSearch";
import MyLibrary from "./pages/Mylibrary";
import SearchBook from "./pages/SearchBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/bookDetail/:bookIsbn" element={<BookDetail />} />
          <Route path="/login" element={<CccLogin />} />
          <Route path="/register" element={<CccRegister />} />
          <Route path="/login" element={<CccLogin />} />
          <Route path="/booksearch" element={<BookSearch />} />
          <Route path="/search" element={<SearchBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
