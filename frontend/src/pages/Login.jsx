import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {login} from '../features/auth/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Login() {

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

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginData)).unwrap().then((user) => {
          toast.success(`Logged in as ${user.name}`)
          navigate('/')
        }).catch(toast.error)
        

    }

    if(isPending) {
    return <Spinner />
  }

  return (
     <>
    <section className="bg-grey dark: bg-gray-900 min-h-screen flex items-center justify-center " >
      <div className=" flex flex-col mx-auto sm:h-full md:min-h-full lg:py-0 items-center justify-center w-full bg-rounded rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 ">
          <h1 className='text-xl flex justify-center items-center gap-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            <FaUser/>Login to Your Account
          </h1>
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
              </form>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default Login