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
import BusinessRoute from "./components/BusinessRoute";
import NewListing from "./pages/NewListing";
import ListingsPage from "./pages/ListingsPage";
import Listing from "./pages/Listing";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import PasswordReset from "./pages/PasswordReset";
import PasswordUpdate from "./pages/PasswordUpdate";

function App() {
  return (
    <>
      <Router>
        <div className="Container">
          <Navbar />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/register" element={<Register />} />{" "}
            <Route path="/listing" element={<ListingsPage />} />
            {/* Instead of having /users/register & /business/register */}
            <Route path="/login" element={<Login />} />
            <Route path="/listing/new" element={<CreateListing />} />
            <Route path="/passwordReset" element={<PasswordReset />} />
            <Route
              path="/passwordReset/passwordUpdate/:token"
              element={<PasswordUpdate />}
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/listing/:listingId"
              element={
                <PrivateRoute>
                  <Listing />
                </PrivateRoute>
              }
            />
            {/* Business acc only routes */}
            <Route
              path="/listing/new"
              element={
                <BusinessRoute>
                  <NewListing />
                </BusinessRoute>
              }
            />
            <Route
              path="/listing/:listingId/edit"
              element={
                <BusinessRoute>
                  <EditListing />
                </BusinessRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
