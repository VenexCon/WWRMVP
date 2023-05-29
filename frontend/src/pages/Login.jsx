import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login} from '../features/auth/authSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'
import UserLogin from '../components/userComponents/UserLogin.jsx'
import BusinessLogin from '../components/businessComponents/BusinessLogin'

function Login() {

const {user} =useSelector((state)=> state.auth)
const {business} = useSelector((state)=>state.businessAuth)
const navigate = useNavigate()

//sweet transition effect state
const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true);
  }, []);
        
const [page, setPage] = useState({
    user:true,
    business:false
  })

  useEffect(() => {
    if(user || business) {
      navigate('/')
    } 
    return
  },[business, user])

  

  const changePage = (e) => {
    if(e.target.id === 'user') {setPage({
      user:true,
      business:false
    })} else {
      setPage({
        user:false,
        business:true
      })
    }
  }

  return (
     <>
    <section className= {`bg-grey dark: bg-gray-900 min-h-screen flex items-center justify-center ${isLoaded ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'}`} >
      <div className=" flex flex-col mx-auto sm:h-full md:min-h-full lg:py-0 items-center justify-center w-full bg-rounded rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 ">
          <h1 className='text-xl flex justify-center items-center gap-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            <FaUser/>Login to Your Account
          </h1>
           <div className="flex w-1/2 mx-auto sm:flex-col gap-3 justify-around md:flex-row lg:flex-row">
              <button id='user' onClick={changePage} className='text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 '>User</button>
              <button id='business' onClick={changePage} className='text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 '>Business</button>
             </div>
             {page.user ? <UserLogin /> : <BusinessLogin />}

        </div>
      </div>
    </section>
    
    </>
  )
}

export default Login