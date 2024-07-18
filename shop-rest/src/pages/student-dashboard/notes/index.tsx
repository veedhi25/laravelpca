import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import NavBar from './../../../components/navbar/NavBar';
import BookCard from '@components/book-card/book-card';
import { useAllStudyMaterialQuery } from '@data/study-material/use-study-materials.query';
const Notes = () => {

  const {data : notes} = useAllStudyMaterialQuery();

    return (<div className='bg-gray-100 min-h-screen' >
       <div className='sticky top-0 z-50'>
        <NavBar />
        </div> 
        <div className='lg:grid lg:grid-cols-6'>
            <div className=''>
          <UserDashboardSideBar className='p-2' />
            </div>
        <div className="col-span-5 ml-3 mt-2">
        <div className='ml-14 sm:ml-0 grid sm:grid-cols-3 grid-cols-1 lg:grid-cols-5 gap-4'>
              
              {notes?.map((item)=>
              {
                return (< div key={item.id} >
                <BookCard coverPhoto={"/book4.png"} data={item} />
                </div>
                )
              })}
              
             
          </div>
            </div>
        </div> 
        </div> );
}
 
export default Notes;