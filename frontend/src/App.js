import "./App.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <div className="Container">
          <Navbar />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
