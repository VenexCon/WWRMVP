import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import UserRegister from '../components/UserRegister.jsx'


function Register() {

  const navigate = useNavigate()

  const [page, setPage] = useState({
    user:true,
    business:false
  })



  return (
    <>
    <section className="bg-grey dark: bg-gray-900 min-h-screen " >
      <div className=" flex flex-col mx-auto sm:h-full md:min-h-full lg:py-0 items-center justify-center w-full bg-rounded rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 ">
          <h1 className='text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Create an Account
          </h1>
          <h2>Choose from either a User or Business account</h2>
             <div className="flex flex-col">
              <button className='btn btn-primary'>User</button>
              <button className='btn btn-primary'>Button</button>
             </div>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default Register