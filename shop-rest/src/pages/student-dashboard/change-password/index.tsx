import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import NavBar from './../../../components/navbar/NavBar';
import BookCard from '@components/book-card/book-card';
import { useBooksQuery } from '@data/book/use-books.query';
import { useUpdatePasswordMutation } from '@data/user/use-user-update-password.mutation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const UpdatePassword = () => {



    const [serverError, setServerError] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const updatePasswordMutation = useUpdatePasswordMutation();


    const {data:user} = useCustomerQuery();
    const student_id = user?.me?.id;
    const router = useRouter();
    const onSubmit = (data) => {

        console.log(data)
        if (data.new_password !== data.new_password_confirmation) {
          setServerError('New password and confirmation do not match.');
          return;
        }
  
        updatePasswordMutation.mutate({...data, student_id}, {
            onSuccess: () => {
                toast.success('Password Updated Successfully');
                router.push('/student-dashboard')
            },
            onError: (error) => {
                console.log('Mutation error:', error);
                console.log('Sent data:', { ...data, student_id });
            }
        });
        
    };
  
    // Watch the new password fields to reset server error when they change
    watch(['new_password', 'new_password_confirmation']);
 

    return (<div className='bg-gray-100 min-h-screen w-full' >
       <div className='sticky top-0 z-50'>
        <NavBar />
        </div>
        <div className='lg:grid lg:grid-cols-6'>
            <div className=''>
          <UserDashboardSideBar className='p-2' />
            </div>
        <div className=" px-3 w-full mx-auto col-span-5 lg:ml-3 mt-2">
          <div className='w-full mx-auto  lg:ml-14 sm:ml-0 grid sm:grid-cols-3 grid-cols-1 lg:grid-cols-5 gap-4'>
             
            {/* <span className='text-lg text-gray-700'>Please Update your password</span> */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full mx-auto  ">
            <div  className=' flex flex-col space-y-2 text-sm text-semibold text-gray-700'>
                <span className='text-gray-700 font-semibold'>Hi, {user?.me?.name}</span>
                <span className='text-gray-600 font-semibold'>Please update your password</span>
            </div>
            <div>
                <label htmlFor="old_password" className="block text-sm font-medium text-gray-700">Old Password</label>
                <input 
                    type="password" 
                    {...register('old_password', { required: true })}
                    name="old_password"
                    autoComplete="new-password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />

                {errors.old_password && <span className="text-red-500">This field is required</span>}
            </div>
            
            <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">New Password</label>
                <input 
                    type="password" 
                      autoComplete="new-password" // This can help in disabling the autofill
                    {...register('new_password', { required: true })} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.new_password && <span className="text-red-500">This field is required (min 8 characters)</span>}
            </div>

            <div>
                <label htmlFor="new_password_confirmation" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input 
                    type="password" 
                      autoComplete="new-password" // This can help in disabling the autofill
                    {...register('new_password_confirmation', { required: true })} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.new_password_confirmation && <span className="text-red-500">This field is required (min 8 characters)</span>}
            </div>

            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update Password
                </button>
            </div>
        </form>
                
               
               
            </div>
            </div>
        </div> 
        </div> );
}
 
export default UpdatePassword;