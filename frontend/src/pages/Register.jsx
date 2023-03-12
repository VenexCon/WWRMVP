
import {useNavigate} from 'react-router-dom'
import UserRegister from '../components/UserRegister.jsx'


function Register() {

  const navigate = useNavigate()

  const selectBusinessPage = () => {
    navigate('/business')
  }



  return (
    <>
    <section className="bg-grey dark: bg-gray-900 min-h-screen " >
      <div className=" flex flex-col mx-auto sm:h-full md:min-h-full lg:py-0 items-center justify-center w-full bg-rounded rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 ">
          <h1 className='text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Create a User Account
          </h1>
             <UserRegister />
        </div>
              <button onClick={selectBusinessPage}  className="w-full mb-5 text-white text-bold bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Want to make a Business Account ?</button>

      </div>
    </section>
    
    </>
  )
}

export default Register