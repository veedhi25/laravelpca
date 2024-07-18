import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import NavBar from '@components/navbar/NavBar';
const Video = () => {
    return ( <div className='bg-gray-100 min-h-screen'>
        <div className='sticky top-0 z-50'>
        <NavBar />
        </div>
        <div className='lg:grid lg:grid-cols-6'>
            <div className=''>
          <UserDashboardSideBar className='p-2' />
            </div>
        <div className="col-span-4 ml-6 mt-6">
          Videos are Comming Soon...
            </div>
        </div> 
        </div>  );
}
 
export default Video;