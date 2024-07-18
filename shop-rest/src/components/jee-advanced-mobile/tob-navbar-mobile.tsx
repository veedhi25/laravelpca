import { useEffect, useState } from 'react';
import JeeAdvancedPaperScreen from './../../pages/jee_advanced_paper/index';
import { NavbarIcon } from '@components/icons/navbar-icon';


const TopNavbarMobile =  ({currSubSecName , setCurrSubSecName , subSection , subSections , setSubsections}) => {

    const [showSections , setShowSection] = useState(false)

    useEffect(()=>
    {
     
      let allSections = []
      subSection?.forEach((data)=>
      {
        if(data?.hasSubsections){
        data?.subSections?.forEach((data1)=>
        {
          allSections.push({name : data1.name , isSubSection : data?.hasSubsections  })
        })
        }
        else
        {
          allSections.push({name : data.sectionName , isSubSection : data?.hasSubsections  })
        }
      })
      console.log("lolo sube" , allSections)
      setSubsections(allSections)
      setCurrSubSecName(allSections[0]?.name)
    
    },[])
      
    
    const hnadleCurrentSection = (name)=>
    {
      setCurrSubSecName(name);
      setShowSection(false)
    
    }
    
        

return (<div className='bg-blue-950 flex justify-between h-16 pl-4 pt-2' >

            <div className='text-blue-300 flex gap-4 text-xs mt-1'>
                <div>JeeAdvancedPaperScreen</div> /
                    <div >
                       <span className='text-white relative'>*</span>
                             <span onClick={() => setShowSection(!showSections)}>{currSubSecName}</span>

                        { showSections &&  <div className=" ml-8 absolute top-10 left-46 bg-white text-black w-[40%] boredr shadow-200 z-50">
                              {subSections.map((item) => {
                              return  (<div key={item.name} onClick={() => hnadleCurrentSection(item.name)} className= "mt-3 ml-2" >
                                             <span>{item.name}</span> 
                                     </div>)  } )}
                    </div>}

                </div>
           
            </div>

            <div className='self-center'>
                <NavbarIcon className='text-white mr-4' />
            </div>
        </div>
        
        )
    }
 
export default TopNavbarMobile;