import FrontPageForm from '@components/Front_page/front_page_form'
import React, { useState } from 'react'
import LoginForm from '@components/auth/login'
import NavBar from '@components/navbar/NavBar'
import Link from 'next/link';
import Card from '@components/common/card';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserGraduate, faChalkboardTeacher, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';

const data = [
  {name: 'UPSC CSE - GS' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/upsc.svg?q=75&auto=format%2Ccompress&w=256"},
  {name: 'IIT JEE' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/iit_jee.svg?q=75&auto=format%2Ccompress&w=256"},
  {name: 'NEET UG' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/neet_ug.svg?q=75&auto=format%2Ccompress&w=256"},
  {name: 'Bank Exam' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/bank_exams.svg?q=75&auto=format%2Ccompress&w=256"},
  {name: 'SSC Exam' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/ssc.svg?q=75&auto=format%2Ccompress&w=256"},
  {name: 'CAT  tests' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/cat.svg?q=75&auto=format%2Ccompress&w=256"},
  {name: 'CBSE class 12' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/class_12.svg?q=75&auto=format%2Ccompress&w=256"},
  {name: 'CA tests' , label: "https://static.uacdn.net/production/_next/static/images/home/goalIcons/ca.svg?q=75&auto=format%2Ccompress&w=256"},
 
 
  
]


export default function Home() {
  
  // const [isHome , setIsHome] = useState(true)

  return (


    <div className='' >
      <NavBar isHome={true} />


        <div className='grid sm:grid-cols-5 '>
          <div className='sm:col-span-3 hidden md:block'>
          <img src="/frontPhoto/arbg1.jpg" className='ml-20 rounded-xl  h-[80%] w-[80%]  mt-16' alt='logo'/>
          </div>
      <div className='mt-14 sm:col-span-2 '>
        <h1 className='text-center text-4xl font-bold font-roboto text-[#3C4852] '>Choose Your Role</h1>
        <div  className='mt-10 md:mt-12 xl:mt-20 flex justify-center flex-wrap gap-8'>
        <a href='https://pca-admin.buylowcal.com'>
      <Card className='border text-[#3C4852] font-medium h-[150px] w-[150px]  xl:h-[200px] xl:w-[200px] flex justify-center items-center drop-shadow-2xl hover:scale-110 cursor-pointer duration-150' > 
      
      <div className=''>
      
        <div>Teacher</div>
        </div>
       
      </Card>
      </a>
      <Link href='/jee_mains_paper/student_login_form'>
      <Card className='  border text-[#3C4852] font-medium h-[150px] w-[150px] xl:h-[200px] xl:w-[200px] flex justify-center items-center drop-shadow-2xl  hover:scale-110 cursor-pointer duration-150' > 
      
      
        <div>
       
        <div>Student</div>
        </div>
       
      </Card>
      </Link>
      </div>
      </div>
    </div>
     
     <div className='mr-10 ml-10 mb-10 mt-10 md:mt-6 lg:mt-0'>
     <div className='text-[#3C4852] text-3xl font-bold mb-8'>Popular Goals</div>
       
        
       <div className='grid sm:grid-cols-2  xl:grid-cols-4 lg:grid-cols-3  gap-6'> 
        {data.map((da) =>{
          return (
            <div className='flex justify-center items-center border  w-full h-[340px] rounded-xl hover:bg-[#E9EEF2] text-[#3C4852] text-xl font-bold'>
          <div >
            <div>
          <img src={da.label} />
          </div>
          <div>
          {da.name}
          </div>
          </div>
          </div>)
        })}
        
        </div>
      </div>
    </div>
  )
}
