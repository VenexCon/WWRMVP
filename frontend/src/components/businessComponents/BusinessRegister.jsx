import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {registerBusiness} from '../../features/businessAuth/businessSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../Spinner'

function BusinessRegister() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isPending} = useSelector((state) => state.businessAuth)
  
  const [registerData, setRegisterData] = useState({
    businessEmail:'',
    businessPassword:'',
    businessPassword2:'',
    businessName:'',
    businessAddress:'',
    businessTerms:false, 
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
      businessTerms: !registerData.businessTerms
    }))
  }


  //submit user for registration
  const onSubmit = async (e)=> {

    const {businessEmail, businessName, businessPassword,  businessPassword2, businessTerms, businessAddress} = registerData

    e.preventDefault()
    

    if(!businessTerms) return toast.error('You must agree to the Terms and Conditions')
    if(!businessAddress || businessAddress.includes('undefined')){toast.error('Please enter correct address')}
    
    if(businessPassword !== businessPassword2) {
      toast.error('Passwords do not match')
    } else {

        
    const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${businessAddress}&key=${process.env.REACT_APP_GEOCODING_KEY}`)
    const data =await response.json()
    console.log(data)
    let latitude = data.results[0]?.geometry.location.lat ?? 0
    let longitude = data.results[0]?.geometry.location.lng ?? 0


      const businessData = {
        businessEmail,
        businessName,
        businessAddress,
        businessPassword,
        businessTerms,
        latitude,
        longitude
      }

      try {
        const business = await dispatch(registerBusiness(businessData)).unwrap()
        toast.success(`Registered new business - ${business.name}`)
        navigate('/')
      } catch (error) {
        return toast.error(error)
      }
      
    }
  }

  if(isPending) {
    return <Spinner />
  }



  return (
     <>
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
          <h1 className='text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white'>Business</h1>
                  <div>
                      <label htmlFor="businessName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Name</label>
                      <input type="name" name="businessName" id="businessName" onChange={onMutate}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" />
                  </div>
                  <div>
                      <label htmlFor="businessAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Address</label>
                      <textarea  name="businessAddress" id="businessAddress" onChange={onMutate}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10 downing street, london" required="" />
                  </div>
                  <div>
                      <label htmlFor="businessEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business email</label>
                      <input type="businessEmail" name="businessEmail" id="BusinessEmail" onChange={onMutate} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="businessPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Password</label>
                      <input type="password" name="businessPassword" id="businessPassword" onChange={onMutate} placeholder="••••••••" pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$' minLength={8}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  valid:border-green-500 invalid:border-red-500  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                      <span className='font-style: italic font-size: 0.75rem display: block mt-4  text-gray-900 md:text-2xl dark:text-white'>
                        Password must contain 8 characters, one uppercase and one special character</span>
                  </div>
                  <div>
                      <label htmlFor="businessPassword2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Business password</label>
                      <input type="password" name="businessPassword2" id="businessPassword2" onChange={onMutate} minLength={8} placeholder="••••••••" pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg valid:border-green-500 invalid:border-red-500 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" onChange={onSelect} defaultChecked ={registerData.businessTerms} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
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
                      Already have a business account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
    </>
  )
}

export default BusinessRegister