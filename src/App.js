import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main_page";
import MyLibrary from "./pages/Mylibrary"; // mylibrary.js 파일을 import

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
