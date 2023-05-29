import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import UserRegister from '../components/userComponents/UserRegister.jsx'
import BusinessRegister from '../components/businessComponents/BusinessRegister.jsx'
import GenericConfirmModal from '../components/sharedComponents/GenericConfirmModal.jsx'


function Register() {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(()=> {
    setShowDeleteModal(true)
  },[])


  const [page, setPage] = useState({
    user:true,
    business:false
  })

  
  //we load either the user, or business register component.
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

  const handleConfirmClick = () => {
    setShowDeleteModal(false);
    };

  return (
    <>
    <section className=" dark: bg-gray-900 min-h-screen " >
      <div className=" flex flex-col mx-auto sm:h-full md:min-h-full lg:py-0 items-center justify-center w-full bg-rounded rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 mb-16 mt-8 ">
          <h1 className='text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Create an Account
          </h1>
          <h2 className='text-lg font-bold leading-tight text-center tracking-tight text-gray-900  dark:text-white'>Choose account type</h2>
             <div className="flex w-1/2 mx-auto flex-col gap-3 justify-around md:flex-row lg:flex-row">
              <button id='user' onClick={changePage} className='text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 '>User</button>
              <button id='business' onClick={changePage} className='text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 '>Business</button>
             </div>

             {page.user ? <UserRegister /> : <BusinessRegister />}
        </div>
      </div>
    </section>
    <GenericConfirmModal
      isOpen={showDeleteModal}
      //in-line func for closing modal. 
      onClose={() => setShowDeleteModal(false)}
      onConfirmDelete={handleConfirmClick}
    />
    </>
  )
}

export default Register