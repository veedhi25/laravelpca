import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import NavBar from '@components/navbar/NavBar';
import CustomerCreateForm from '@components/student-setting';
import { useCustomerQuery } from '@data/customer/use-customer.query';
const Setting = () => {

    const {data:user , isLoading}  = useCustomerQuery(); 
 
    if(!user)return isLoading

    return ( <div className='bg-gray-100 min-h-screen' >
        <div className='sticky top-0 z-50'>
        <NavBar />
        </div>
        <div className='lg:grid lg:grid-cols-6'>
            <div className=''>
          <UserDashboardSideBar className='p-2' />
            </div>
        <div className="col-span-5 ml-6 ">
         <CustomerCreateForm data={user} />
            </div>
        </div> 
        </div> );
}
 
export default Setting;