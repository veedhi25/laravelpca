import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import NavBar from './../../../components/navbar/NavBar';
import BookCard from '@components/book-card/book-card';
import { useBooksQuery } from '@data/book/use-books.query';
const Book = () => {

  const {data : book} = useBooksQuery()

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
              {book?.map((item)=>
              {
                return (< div key={item.id} >
                <BookCard coverPhoto={"/book2.png"} data={item} />
                </div>
                )
              })}
                
               
               
            </div>
            </div>
        </div> 
        </div> );
}
 
export default Book;