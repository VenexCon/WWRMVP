import React from 'react'
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaMedal, FaPhone, FaTwitter } from 'react-icons/fa'
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
    <div className="flex justify-center h-10">
      <Link to="https://twitter.com/WhoWantsRubbish" target='_blank' className="mr-6  text-neutral-600 dark:text-neutral-200">
        <FaTwitter className='h-full  w-10' />
      </Link>
      <Link to="https://www.instagram.com/whowantsrubbish/" target='_blank' className="mr-6 text-neutral-600 dark:text-neutral-200">
       <FaInstagram className='h-full w-10'/>
      </Link>
    
    </div>
  </div>

{/*   <!-- Main container div: holds the entire content of the footer, including four sections (Tailwind Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. -->
 */}  <div className="mx-6 py-10 text-center md:text-left">
    <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Explanatory section */}
      <div className="">
        <h6
          className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
          Who Wants Rubbish
        </h6>
        <p>
            Thanks for checking us out! Be sure to follow us on our socials, and check out some of the links!
        </p>
      </div>
     {/*  <!-- Products section --> */}
     {/*  <div className="">
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Products
        </h6>
        <p className="mb-4">
          <Link to="#!" className="text-neutral-600 dark:text-neutral-200">
          </Link>
        </p>
        <p className="mb-4">
          <Link to="#!" className="text-neutral-600 dark:text-neutral-200">
            Link 4 
        </Link>
        </p>
        <p className="mb-4">
          <Link to="#!" className="text-neutral-600 dark:text-neutral-200">
            Vue
          </Link>
        </p>
        <p>
          <Link to="#!" className="text-neutral-600 dark:text-neutral-200">
            angular
            </Link>
        </p>
      </div> */}
      {/* <!-- Useful links section Not used */}
      {/* <div className="">
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Useful links
        </h6>
        <p className="mb-4">
          <Link to="#!" className="text-neutral-600 dark:text-neutral-200"> 
          Pricing</Link>
        </p>
        <p className="mb-4">
          <Link to="#!" className="text-neutral-600 dark:text-neutral-200">
            Contacts
            </Link>
        </p>
        <p className="mb-4">
          <Link to="#!" className="text-neutral-600 dark:text-neutral-2"> 
          Socials</Link>
        </p>
        <p>
          <Link to="#!" className="text-neutral-600 dark:text-neutral-200">Soehging </Link>
        </p>
      </div> */}
    {/*   <!-- Contact section --> */}
      <div>
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Contact
        </h6>
       {/*  <p className="mb-4 flex items-center justify-center md:justify-start">
          <FaGlobe />
          New York, NY 10012, US
        </p> */}
        <div className="mb-4 gap-2 flex items-center justify-center md:justify-start">
            <FaEnvelope />
            <a href="mailto:admin@whowantsrubbish.com">
            admin@whowantsrubbish.com
            </a>
        </div>
       {/*  <a href='tel:+447718081340' className="mb-4 flex gap-2 items-center justify-center md:justify-start">
          <FaPhone />
          +44 7718081340
        </a> */}
      </div>
    </div>
  </div>

  {/* <!--Copyright section--> */}
  <div className="bg-neutral-200 p-6 text-center dark:bg-cyan-600">
    <span>© 2023 Copyright: WhoWantsRubbish Ltd</span>
    {/* <Link
      className="font-semibold "
      to="https://tailwind-elements.com/"
      > VenexCon</Link> */}
  </div>
</footer>
  )
}

export default Footer