import NavBar from "@components/navbar/NavBar";
import UserDashboardSideBar from "./user-dashboard-sidebar";

const About = () => {
    return (<div className='bg-gray-200'>
    <NavBar />
    <div className='grid grid-cols-6'>
        <div className=''>
      <UserDashboardSideBar className='p-2' />
        </div>
    <div className="col-span-5 mr-2">
        
    
    <div>This is about page</div> 
       

    
    

 

      
      
     

      
   
        </div>
    </div> 
    </div>
        );
}
 
export default About;