import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main_page";
import BookDetail from "./pages/Book_detail";
import CccRegister from "./pages/ccc_Register";
import CccLogin from "./pages/ccc_Login";
import BookSearch from "./pages/BookSearch";
import MyLibrary from "./pages/Mylibrary"; // mylibrary.js 파일을 import

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/bookdetail" element={<BookDetail />} />
          <Route path="/login" element={<CccLogin />} />
          <Route path="/register" element={<CccRegister />} />
          <Route path="/login" element={<CccLogin />} />
          <Route path="/booksearch" element={<BookSearch query="해리포터" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
