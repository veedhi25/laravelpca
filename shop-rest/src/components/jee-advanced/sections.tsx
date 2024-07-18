import { useEffect, useState } from 'react';





const Sections = ({currSubSecName ,setAllSubSectionsImage, setCurrSubSecName , subSection , subSections , setSubsections}) => {

 
  

useEffect(()=>
{
  
  let allSections = []
  let allSubSectionsImage = {}
  subSection.forEach((data)=>
  {
    
    // data?.subSections?.forEach((data1)=>
    // {
    //   if(data1?.name){
    //   allSections.push({name : data1?.name})
    //   // allSubSectionsImage.push({data?.name : data?.section_instruction_img})

    //   allSubSectionsImage[data1.name] = data1?.section_instruction_img
    //   }
    // })

    if(data?.hasSubsections){
      data?.subSections?.forEach((data1)=>
      {
        if(data1?.name){
          allSections.push({name : data1.name , isSubSection : data?.hasSubsections  })
        // allSubSectionsImage.push({data?.name : data?.section_instruction_img})
  
        allSubSectionsImage[data1.name] = data1?.section_instruction_img
        }
      })
      }
      else
      {
        allSections.push({name : data.sectionName , isSubSection : data?.hasSubsections  })
      }
  
  })

  setSubsections(allSections)
  setCurrSubSecName(allSections[0]?.name)
  setAllSubSectionsImage(allSubSectionsImage)

  console.log("saurav sectoin allSections" , allSections )

},[])
  

const hnadleCurrentSection = (name)=>
{
  setCurrSubSecName(name);
}

    return ( <div className='border-t border-b'>
      <div className="flex ml-8 ">
      {subSections.map((item) => {
        return  <div key={item.name} onClick={() => hnadleCurrentSection(item.name)} className= {`cursor-pointer text-base border h-[42px] w-[135px] text-[#38aae9] font-semibold flex items-center justify-center  ${currSubSecName == item.name ? "bg-[#337ab7] text-white" : ""}  `} >
           <span>{item.name}</span> 
            </div>
      } )}
    </div>
    </div> );
}
 
export default Sections; 