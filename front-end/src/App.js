import LogIn from "../src/components/LogIn";
import Registration from "../src/components/Registration";
import AddDiary from "../src/components/AddDiary";
import DiaryList from "../src/components/DiaryList";
import Home from "./components/Home";
import AdminArea from "./components/AdminArea";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home/add" element={<AddDiary />} />
        <Route path="/home/diaries" element={<DiaryList />} />
        <Route path="/home/admin" element={<AdminArea />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
