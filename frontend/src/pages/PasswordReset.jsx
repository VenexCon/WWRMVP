
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PasswordReset() {
   const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      setError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    axios
      .post("/api/reset-password", { email })
      .then((response) => {
        // Handle success response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error response
        console.log(error.response.data);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="bg-gray-600 h-screen w-screen flex ">
    <div className="bg-gray-800 w-full h-fit md:w-1/3 mx-auto mt-10 rounded-lg p-8">
      <h2 className="text-white text-2xl font-bold mb-6">RESET PASSWORD</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-bold mb-2" htmlFor="email">
            Enter Your E-Mail
          </label>
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
    </div>
  );
}

export default PasswordReset