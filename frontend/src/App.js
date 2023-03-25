import "./App.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Listings from "./pages/Listings";
import NewListing from "./pages/NewListing";

function App() {
  return (
    <>
      <Router>
        <div className="Container">
          <Navbar />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/register" element={<Register />} />{" "}
            {/* Instead of having /users/register & /business/register */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/new-listing" element={<NewListing />} />
            <Route path="/listings" element={<Listings />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
