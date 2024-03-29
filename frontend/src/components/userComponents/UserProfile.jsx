import React, {useState, useEffect} from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, editUser } from '../../features/auth/authSlice'
import { FaUser, FaArrowCircleRight, FaEnvelope,  FaLock, FaCog  } from 'react-icons/fa'
import DeleteModal from '../sharedComponents/DeleteModal'

function UserProfile() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user? user.email: '');
  //const [phone, setPhone] = useState(user ? user.phone: '');
   const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [edit, setEdit] =useState(false)
  const dispatch = useDispatch()

  //to ensure no crafty states
  useEffect( () => {
    return () => {
      setEdit(false)
    }
  }, [user,dispatch])


// This will be postponed, until 2FA is in-place to check for if the desired email is already in use
//And, if the email is owned by the user. 
//This will be after the confirmEmailAddress feature is in-place. 
  const selectEdit = (() => {
    setEdit((prevState) => !prevState)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    selectEdit()
    try {
    const updatedData = {
      email:email.toLowerCase(),
      name,
      userId:user._id
    }
    const data = await dispatch(editUser(updatedData))
     if(data.error) {
      toast.error('Profile not updated')
      return setEmail(user.email)
    } else {
      return toast.success('Profile Updated')
    }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

    return 
  }

  //Modal Funcs 
   //This will display the modal only
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    };

  //this will dispatch the deleteBusiness action from slice.
  const handleConfirmDelete = async () => {
    const deleted = await dispatch(deleteUser())
    console.log(deleted)
    if(deleted.error) { 
      setShowDeleteModal(false)
      return toast.error('Account could not be deleted')
    }
      setShowDeleteModal(false);
      toast.success('Account Deleted')
      //navigate('/*')
  };



  return (
     <>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FaUser />
          <label htmlFor="name">Name</label>
        </div>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled = {!edit}
          className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 
        ${edit ? 'bg-blue-700 border-blue-700 text-white' : 'dark:bg-gray-700 dark:border-gray-700 dark:text-white'}`}        />
      </div>
      <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <FaEnvelope />
        <label htmlFor="email">Email</label>
      </div>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!edit}
        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 
        ${edit ? 'bg-blue-700 border-blue-700 text-white' : 'dark:bg-gray-700 dark:border-gray-700 dark:text-white'}`}
      />
    </div>
    {/*   <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FaPhone />
          <label htmlFor="phone">Phone</label>
        </div>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled ={!edit}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
        />
      </div> */}
      {/* Place button here that follows the github way of working.*/}
     {/*  <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <FaLock />
          <label htmlFor="password">Password</label>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
        />
      </div> */}
      {/* Buttons, show or hidden based on edit state. */}
      <div className="mt-10 flex flex-col space-y-4 w-full">
        {!edit && (
          <button onClick={selectEdit}
          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300">
            <FaUser className="mr-2" /> Edit Profile
          </button>
        )}
        {edit && (
          <button onClick={handleSubmit}
           className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300">
          <FaLock className="mr-2" /> Confirm Profile
        </button>
        )}
        {!edit && (
          <Link to="/listing/search" className="w-full">
          <button className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300">
            <FaArrowCircleRight className="mr-2" /> Browse Listings
          </button>
        </Link>)}
        <button
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-300"
            onClick={handleDeleteClick}
          >
            <FaCog className="mr-2" /> Delete Account
          </button>
        </div>
        <DeleteModal
      isOpen={showDeleteModal}
      //in-line func for closing modal. 
      onClose={() => setShowDeleteModal(false)}
      onConfirmDelete={handleConfirmDelete}
    />
    </>
  )
}

export default UserProfile