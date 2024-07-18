import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import NavBar from '@components/navbar/NavBar';
import Card from '@components/ui/card';
import { useCoursesQuery }from '@data/courses/use-courses.query'

const Courses = () => {

   const {data : courses } = useCoursesQuery()
  console.log('courses' , courses);
    return ( <div className='bg-gray-100 min-h-screen' >
        <div className='sticky top-0 z-50'>
        <NavBar />
        </div>
        <div className='lg:grid lg:grid-cols-6'>
            <div className=''>
          <UserDashboardSideBar className='p-2' />
            </div>
        <div className="col-span-5 ml-6 mr-6 lg:ml-16 mt-10 lg:mr-16">
            <div className="text-center mb-10">
                <h1 className='text-2xl font-bold  text-[#3C4852]'>Courses</h1>
            </div>
        <div className=" grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
           
           
           {courses?.data?.courses?.map((course)=>
           {
             return (<div>
                <Card className='border w-full h-20 drop-shadow-xl text-center'>
                   {course.name}
                  </Card>
                  </div>)
           })}
          
          
         

          
        </div>
            </div>
        </div> 
        </div>);
}
 
export default Courses;