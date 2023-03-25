import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'

function UserProfile() {
    const {user} = useSelector((state) => state.auth)

  return (
    <div>
        <h1>{user.name}</h1>
    </div>
  )
}

export default UserProfile