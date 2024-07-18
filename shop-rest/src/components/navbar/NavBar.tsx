
import { useModalAction } from "@components/ui/modal/modal.context";
import React, { useState } from 'react';
import Link from 'next/link';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faChalkboardTeacher, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { useUI } from "@contexts/ui.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { NavbarIcon } from "@components/icons/navbar-icon";
import UserDashboardSideBar from "src/pages/user-dashboard-sidebar";
import UserDashboardSideBarMobile from "src/pages/user-dashboard-sidebar-mobile";


const NavBar = ({isHome = false}) => {
  const [menuOpen, setMenuOpen] = useState(false);
    
  const {isAuthorize} = useUI()
  console.log("isAuthorize" , isAuthorize)

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const {data : user } = useCustomerQuery()

  console.log("user" , user)

  const { openModal }  = useModalAction()

  function handleJoin() {
    return  openModal('OTP_REGISTER') 
  }

  return (
    <div className="bg-white">
    <nav className="flex justify-between items-center h-22 p-4 border">
      <div className="flex gap-4  items-center">

      <div className="lg:hidden h-10 flex items-center">
        
      { !menuOpen && !isHome &&  <div onClick={handleMenuToggle}> <NavbarIcon />  </div> }

      {/* <div className={`fixed top-6 left-0  transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
  {menuOpen && <UserDashboardSideBarMobile handleMenuToggle={handleMenuToggle} />}
</div> */}

<div
      className={`fixed top-6 left-0 transition-transform duration-300 transform ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
     {menuOpen &&  <UserDashboardSideBarMobile handleMenuToggle={handleMenuToggle} />}
    </div>


      </div>


     
      <div className="text-xl font-bold ml-4">
        <Link href="/">
          <span className=" ml-4">
            {/* <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
            Acharyakulam */}
            { !menuOpen &&  <img src="/frontPhoto/patanLogo.png" className="w-[200px] h-10 mb-6 cursor-pointer" />}
          </span>
        </Link>
      </div>

      </div>
      <ul className={`flex ${menuOpen ? 'flex-col items-center' : 'hidden'} lg:flex lg:space-x-4`}>
        {/* <li> <UserDashboardSideBar /></li> */}

        {/* hi */}
        {/* <li>
          <Link href="/">
            <span className="hover:text-green-400">
             
              Home
            </span>
          </Link>
        </li> */}
        <li>
          {/* <Link href="/Forms/student_form">
            <span className="text-white hover:text-gray-200">
             
              Forms
            </span>
          </Link> */}
        </li>
        <li>
          {/* <Link href="/jee_mains_paper/front_page">
            <span className="text-white hover:text-gray-200">
             
              Mock Exam
            </span>
          </Link> */}
        </li>
        {/* <li>
          <Link href="/about">
            <span className=" hover:text-green-400">
             
              About
            </span>
          </Link>
        </li> */}
      </ul>

      {/* <div>

        <button className="font-medium mr-6 hover:bg-gray-200 text-base border h-12 w-32 rounded-lg border-black" onClick={handleJoin}>  
           Register
        </button>
        </div> */}
    </nav>
    </div>
  );
};

export default NavBar;



