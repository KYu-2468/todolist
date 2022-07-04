import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </div>
  );
}

export default App;
