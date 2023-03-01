import "./App.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <div className="Container">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
