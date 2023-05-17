import React from 'react'
import { FaFacebook, FaGlobe, FaInstagram, FaMedal, FaPhone, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    /* <<!-- Footer container --> */
<footer
  className="bg-cyan-600 text-center text-neutral-600 dark:bg-cyan-600 dark:text-neutral-200 lg:text-left">
  <div
    className="flex items-center justify-center border-b-2 border-neutral-200 p-6 lg:justify-between">
    <div className="mr-12 hidden lg:block">
      <span>Get connected with us on social networks:</span>
    </div>
    {/* <!-- Social network icons container --> */}
    <div className="flex justify-center">
      <Link href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200">
        <FaTwitter />
      </Link>
      <Link href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200">
        <FaFacebook />
      </Link>
      <Link href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200">
       <FaInstagram/>
      </Link>
    
    </div>
  </div>

{/*   <!-- Main container div: holds the entire content of the footer, including four sections (Tailwind Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. -->
 */}  <div className="mx-6 py-10 text-center md:text-left">
    <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
     {/*  <!-- Tailwind Elements section --> */}
      <div className="">
        <h6
          className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
          Tailwind ELEMENTS
        </h6>
        <p>
          Here you can use rows and columns to organize your footer
          content. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit.
        </p>
      </div>
     {/*  <!-- Products section --> */}
      <div className="">
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Products
        </h6>
        <p className="mb-4">
          <Link href="#!" className="text-neutral-600 dark:text-neutral-200">
          </Link>
        </p>
        <p className="mb-4">
          <Link href="#!" className="text-neutral-600 dark:text-neutral-200">
            Link 4 
        </Link>
        </p>
        <p className="mb-4">
          <Link href="#!" className="text-neutral-600 dark:text-neutral-200">
            Vue
          </Link>
        </p>
        <p>
          <Link href="#!" className="text-neutral-600 dark:text-neutral-200">
            angular
            </Link>
        </p>
      </div>
      {/* <!-- Useful links section --> */}
      <div className="">
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Useful links
        </h6>
        <p className="mb-4">
          <Link href="#!" className="text-neutral-600 dark:text-neutral-200"> 
          Pricing</Link>
        </p>
        <p className="mb-4">
          <Link href="#!" className="text-neutral-600 dark:text-neutral-200">
            Contacts
            </Link>
        </p>
        <p className="mb-4">
          <Link href="#!" className="text-neutral-600 dark:text-neutral-2"> 
          Socials</Link>
        </p>
        <p>
          <Link href="#!" className="text-neutral-600 dark:text-neutral-200">Soehging </Link>
        </p>
      </div>
    {/*   <!-- Contact section --> */}
      <div>
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Contact
        </h6>
        <p className="mb-4 flex items-center justify-center md:justify-start">
          <FaGlobe />
          New York, NY 10012, US
        </p>
        <p className="mb-4 flex items-center justify-center md:justify-start">
          <FaMedal/>
          info@example.com
        </p>
        <p className="mb-4 flex items-center justify-center md:justify-start">
          <FaPhone />
          + 01 234 567 88
        </p>
        <p className="flex items-center justify-center md:justify-start">
          <FaPhone />
          + 01 234 567 89
        </p>
      </div>
    </div>
  </div>

  {/* <!--Copyright section--> */}
  <div className="bg-neutral-200 p-6 text-center dark:bg-cyan-600">
    <span>© 2023 Copyright:</span>
    <Link
      className="font-semibold "
      href="https://tailwind-elements.com/"
      > VenexCon</Link>
  </div>
</footer>
  )
}

export default Footer