import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

function Register() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  const registerData = useState({
    email:'',
    password:'',
    Password2:'',
    name:'',

  })

  return (
    <div>


    </div>
  )
}

export default Register