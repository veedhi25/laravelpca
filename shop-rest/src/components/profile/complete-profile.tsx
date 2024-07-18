import { CheckMark } from '@components/icons/checkmark';
import { CheckMarkFill } from '@components/icons/checkmark-circle-fill';
import { useUI } from '@contexts/ui.context';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import React, { useEffect, useState } from 'react';
import ProfileCompletenessBadge from './profile-completed-badge';
import Link from 'next/link';

function CompleteProfile() {

    
 const { data } = useCustomerQuery();
 const [message, setMessage] = useState('');
//  const {name, email, date_of_birth, occupation, gender, current_location} = data?.me;

  console.log('customer',data?.me);

  const { isAuthorize } = useUI();

  const handleButtonClick = () => {
    if (data?.me?.name.includes('guest') || data?.me?.email.includes('guest') || !data?.me?.date_of_birth || !data?.me?.occupation || !data?.me?.gender || !data?.me?.current_location) {
      setMessage('Please complete your profile >>>>');
    }
  };

  useEffect(()=>{
      handleButtonClick()
  },[])


  return (

    <div className={` ${isAuthorize ? 'block' : 'hidden'} relative flex  mt-4 justify-evenly px-4 lg:px-16 space-x-1 mb-2 lg:space-x-16`}>

         {/* <button onClick={handleButtonClick}></button> */}
             {message && <Link href='/user/profile'><div className='cursor-pointer text-blue-700 '>{message}</div></Link>}

        {/* <div className={`${!data?.me?.name ? 'bg-white border rounded-full border-gray-500 border-dotted relative ' : 'relative bg-green-600  ' }    `}>
              { !data?.me?.name ? <span className='absolute rounded-full h-10 border border-dotted w-10'></span> : 
               <CheckMarkFill width={20} height={20} className='absolute text-white bg-green-500 top-2 right-2 h-10 w-10 z-50 rounded-full ' /> 
               }
             <span className=' absolute font-light top-10  text-gray-700 text-xs lg:text-sm whitespace-nowrap'>Name</span>
        </div>

        <hr className='text-gray-400  mt-5 w-full'></hr>

        <div className={`${!data?.me?.email ? 'bg-white border rounded-full border-gray-500 border-dotted relative' : 'relative bg-green-600  ' }  `}>
              { !data?.me?.email ? <span className='absolute rounded-full h-10 border border-dotted w-10'></span> : 
               <CheckMarkFill width={20} height={20} className='absolute text-white bg-green-500 top-2 right-2 h-10 w-10 z-50 rounded-full ' /> 
               }
             <span className='absolute font-light top-10 text-gray-700 text-xs lg:text-sm whitespace-nowrap'>Email</span>
        </div>

        <hr className='text-gray-400  mt-5 w-full'></hr>

        <div className={`${!data?.me?.phone_number ? 'bg-white border rounded-full border-gray-500 border-dotted relative' : 'relative bg-green-600  ' }  `}>
              { !data?.me?.phone_number ? <span className='absolute rounded-full h-10 border border-dotted w-10'></span> : 
               <CheckMarkFill width={20} height={20} className='absolute text-white bg-green-500 top-2 right-2 h-10 w-10 z-50 rounded-full ' /> 
               }
             <span className='absolute font-light top-10 text-gray-700 text-xs lg:text-sm whitespace-nowrap'>Phone Number</span>
        </div>

        <hr className='text-gray-400  mt-5 w-full'></hr>

        <div className={`${!data?.me?.date_of_birth ? 'bg-white border rounded-full border-gray-500 border-dotted relative' : 'relative bg-green-600  ' }  `}>
              { !data?.me?.date_of_birth ? <span className='absolute rounded-full h-10 border border-dotted w-10'></span> : 
               <CheckMarkFill width={20} height={20} className='absolute text-white bg-green-500 top-2 right-2 h-10 w-10 z-50 rounded-full ' /> 
               }
             <span className='absolute font-light top-10 text-gray-700 text-xs lg:text-sm whitespace-nowrap'>Date of Birth</span>
        </div>

        <hr className='text-gray-400  mt-5 w-full'></hr>

        <div className={`${!data?.me?.gender ? 'bg-white border rounded-full border-gray-500 border-dotted relative' : 'relative bg-green-600  ' }  `}>
              { !data?.me?.gender ? <span className='absolute rounded-full h-10 border border-dotted w-10'></span> : 
               <CheckMarkFill width={20} height={20} className='absolute text-white bg-green-500 top-2 right-2 h-10 w-10 z-50 rounded-full ' /> 
               }
             <span className='absolute font-light top-10 text-gray-700 text-xs lg:text-sm whitespace-nowrap'>Gender</span>
        </div>

        <hr className='text-gray-400  mt-5 w-full'></hr>

        <div className={`${!data?.me?.occupation ? 'bg-white border rounded-full border-gray-500 border-dotted relative' : 'relative bg-green-600  ' }  `}>
              { !data?.me?.occupation ? <span className='absolute rounded-full h-10 border border-dotted w-10'></span> : 
               <CheckMarkFill width={20} height={20} className='absolute text-white bg-green-500 top-2 right-2 h-10 w-10 z-50 rounded-full ' /> 
               }
             <span className='absolute font-light top-10 text-gray-700 text-xs lg:text-sm whitespace-nowrap'>Occupation</span>
        </div> */}

    </div>
  );
}


export default CompleteProfile;
