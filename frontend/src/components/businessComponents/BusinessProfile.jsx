import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'


function BusinessProfile() {
    const {business} = useSelector((state)=>state.businessAuth)


  return (
    <div>
        <h1>{business.name}</h1>
    </div>
  )
}

export default BusinessProfile