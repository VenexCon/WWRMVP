
import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {login} from '../../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight, FaLockOpen } from 'react-icons/fa'
import Spinner from '../Spinner.jsx'

function UserLogin() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isPending} = useSelector((state) => state.auth)

    const [loginData, setLoginData] = useState({
        email:'',
        password:'',
    })

    const onMutate = (e) => {
        setLoginData((prevState) => ({
        ...prevState, 
        [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
    e.preventDefault()
    const {email, password} = loginData 
      try {
      let userData = {email: email.toLowerCase(), password}
      const user = await dispatch(login(userData)).unwrap()
      toast.success(`Logged in as ${user.name}`)
      navigate('/profile')
    } catch (error) {
      toast.error(error)
    }
}

         if(isPending) {
    return <Spinner />
  }

  return (
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={onMutate} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={onMutate} placeholder="••••••••" pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$' minLength={8}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  
                  
                  {/* button for form submission here once completed  */}
                  <button className="w-full flex items-center justify-center gap-x-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <p>Login</p>
                    <FaArrowCircleRight />
                    </button>
                    <Link to={'/passwordReset'} className='w-full flex items-center justify-center gap-x-2 text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                     <button className="w-full flex items-center justify-center gap-x-2">
                    <p>Forgotten Password?</p>
                    <FaLockOpen />
                    </button>
                    </Link>
                    <Link to={'/register'} className=' flex mt-6 items-center justify-center gap-x-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-small rounded-lg text-sm px-5 py-2.5 text-center text-white'>
                     Register for an Account
                    </Link>
              </form>
  )
}

export default UserLogin