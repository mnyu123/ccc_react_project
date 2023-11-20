import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main_page";
import BookDetail from "./pages/Book_detail";
import MyLibrary from "./pages/Mylibrary"; // mylibrary.js 파일을 import

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/bookdetail" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
