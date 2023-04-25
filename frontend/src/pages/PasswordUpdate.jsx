import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

function PasswordUpdate() {
    const {token} = useParams()
  return (
    <div>Token is {token}</div>
  )
}

export default PasswordUpdate