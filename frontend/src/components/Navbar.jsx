import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../features/auth/authSlice.js'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'

const navigation = [

  { name: 'Home', href: '/', current: false },
  { name: 'Listings', href: '/listings', current: false },
  { name: 'Profile', href: '/users/me', current: false },
  { name: 'Register', href:'/register', current: false}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const {user} =useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    dispatch(logout())
    navigate('/')
  }


  return (
    <Disclosure as="nav" className="bg-cyan-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h2 className="block h-8 w-auto lg:hidden">WWWMVP Logo</h2>
                  <h2 className="hidden h-8 w-auto lg:block">WWWMVP</h2>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {!user && (
                  <div className="space-x-4 hidden align items-center sm:ml-6 sm:block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <Link to ='/users/login' className='flex h-full items-center space-x-2' >
                    <FaUser />
                    <p>Login</p>
                  </Link>
                </div>
                )}
                {user && (
                  <div className="space-x-4 hidden align items-center sm:ml-6 sm:block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <button onClick={logoutUser} className='flex h-full items-center space-x-2' >
                    <FaArrowCircleRight />
                    <p>Log out</p>
                  </button>
                </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link to={item.href} key={item.name}>
                <Disclosure.Button
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
                </Link>
              ))}
              {!user && (
                <Link to='/users/login' className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
                  <Disclosure.Button className='flex items-center space-x-2'>
                    <FaUser />
                    <p>Login</p>
                  </Disclosure.Button>
              </Link>
              )}
              {user && (
                  <div className="space-x-4 w-fit align items-center sm:ml-6 sm:block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <button onClick={logoutUser} className='flex h-full items-center space-x-2' >
                    <FaArrowCircleRight />
                    <p>Log out</p>
                  </button>
                </div>
                )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}