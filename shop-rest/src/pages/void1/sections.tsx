
import { CenterTable } from './../../../../admin/src-old/components/icons/category/center-table';
import { useState } from 'react';
const section = [
   { name : "phy sec 1"},
    {name : "phy sec 2"},
    {name : "phy sec 3"},
    {name : "che sec 1"},
    {name : "che sec 2"},
    {name : "che sec  3"},
    {name : "math sec 1"},
    {name : "math sec 2"},
    {name : "math sec 3"},
]




const Sections1 = ({currSubSecName , setCurrSubSecName}) => {

  

const hnadleCurrentSection = (name)=>
{
  setCurrSubSecName(name);
   console.log(name);

}

    return ( <div className='border-t border-b'>
      <div className="flex ml-8 ">
      {section.map((item) => {
        return  <div onClick={() => hnadleCurrentSection(item.name)} className= {`text-base border h-[42px] w-[135px] text-[#38aae9] font-semibold flex items-center justify-center  ${currSubSecName == item.name ? "bg-[#337ab7] text-white" : ""}  `} >
           <span>{item.name}</span> 
            </div>
      } )}
    </div>
    </div> );
}
 
export default Sections1;