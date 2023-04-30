import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {registerUser} from '../../features/auth/authSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../Spinner'

function UserRegister() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isPending, user} = useSelector((state) => state.auth)
  const {business} = useSelector((state) => state.businessAuth)
  
  const [registerData, setRegisterData] = useState({
    email:'',
    password:'',
    Password2:'',
    name:'',
    terms:false, 
  })



  const onMutate = (e) => {

    setRegisterData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  const onSelect = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      terms: !registerData.terms
    }))
  }

  //submit user for registration
  const onSubmit = async (e)=> {
    e.preventDefault()
    const {email, name, password, password2, terms} = registerData

    if(user || business) {return toast.error('Cannot register a business whilst logged in')}

    if(!terms) return toast.error('You must agree to the Terms and Conditions')
    
    if(password !== password2) {
      return toast.error('Passwords do not match')
    } else {

      const userData = {
        name,
        email:email.toLowerCase(),
        password,
        terms
      }

      try {
        const user = await dispatch(registerUser(userData)).unwrap()
        toast.success(`Registered new user - ${user.name}`)
        navigate('/')
      } catch (error) {
        toast.error(error)
      }
      
    }
  }

  if(isPending) {
    return <Spinner />
  }

  return (
    <>
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
          <h1 className='text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white'>User</h1>
                    <p className='text-md font-bold leading-tight text-center tracking-tight text-gray-900 md:text-md dark:text-white'>User accounts can only browse listings, not create them.</p>

                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input type="name" name="name" id="name" onChange={onMutate}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={onMutate} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={onMutate} placeholder="••••••••" pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$' minLength={8}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  valid:border-green-500 invalid:border-red-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                      <span className='font-style: italic font-size: 0.75rem display: block mt-4  text-gray-900 md:text-2xl dark:text-white'>
                        Password must contain 8 characters, one uppercase and one special character</span>
                  </div>
                  <div>
                      <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="password2" id="password2" onChange={onMutate} minLength={8} placeholder="••••••••" pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg valid:border-green-500 invalid:border-red-500 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" onChange={onSelect} defaultChecked ={registerData.terms} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                          {/* Replace with terms and conditions once written & Privacy policy */}
                          I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">Terms and Conditions</a>
                          </label>
                      </div>
                  </div>
                  {/* button for form submission here once completed  */}
                  <button className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have a user account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
    </>
  )
}

export default UserRegister