// import Link from 'next/link'
// const Navbar = () => {
//     return ( <div>
//         <ul className="  mr-4 ml-4 flex h-[80px] rounded-full border items-center justify-center text-lg space-x-3">
//         <Link href="/"> <img src="/images/arch_logo.png" className='h-[80px] lg:w-[150px] lg:ml-20 lg:mr-20 lg:pl-10' alt='logo'/></Link>
//         <Link href="/"> <li>Home </li></Link>
//             <Link href="/Forms/student_form"><li>Forms</li></Link>
//             <Link href="/jee_mains_paper/front_page">  <li>Mock Test</li></Link>
//             <Link href="/"> <li>About</li></Link>
//         </ul>
//     </div> );
// }
 
// export default Navbar;

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faChalkboardTeacher, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4">
      <div className="text-xl font-bold text-white">
        <Link href="/">
          <span>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
            Acharyakulam
          </span>
        </Link>
      </div>
      <div className="lg:hidden">
        <label htmlFor="menu-toggle" className="cursor-pointer">
          <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-white" />
        </label>
        <input
          type="checkbox"
          id="menu-toggle"
          className="hidden"
          checked={menuOpen}
          onChange={handleMenuToggle}
        />
      </div>
      <ul className={`flex ${menuOpen ? 'flex-col items-center' : 'hidden'} lg:flex lg:space-x-4`}>
        <li>
          <Link href="/">
            <span className="text-white hover:text-gray-200">
              <FontAwesomeIcon icon={faHome} className="mr-1" />
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Forms/student_form">
            <span className="text-white hover:text-gray-200">
              <FontAwesomeIcon icon={faClipboardList} className="mr-1" />
              Forms
            </span>
          </Link>
        </li>
        <li>
          <Link href="/jee_mains_paper/front_page">
            <span className="text-white hover:text-gray-200">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-1" />
              Mock Exam
            </span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span className="text-white hover:text-gray-200">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              About
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;



