import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight, FaEnvelope, FaPhone, FaLock,  } from 'react-icons/fa'

function UserProfile() {
    const {user} = useSelector((state) => state.auth)

      const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [password, setPassword] = useState("");

  return (
     <>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FaUser />
          <label htmlFor="name">Name</label>
        </div>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FaEnvelope />
          <label htmlFor="email">Email</label>
        </div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FaPhone />
          <label htmlFor="phone">Phone</label>
        </div>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FaLock />
          <label htmlFor="password">Password</label>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
        />
      </div>
    </>
  )
}

export default UserProfile