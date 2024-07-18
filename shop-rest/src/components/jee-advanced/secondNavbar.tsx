const SecondNavbar = ({course}) => {
    return ( <div className="bg-gray-900 h-8 w-full flex mt-1 justify-between items-center">
    <div className="text-[#fff200] text-sm ml-4">{course} Mock Paper</div>
    <div>
       <button className="text-white text-sm font-semibold">Question Paper</button>  
       <button className="text-white pl-4 text-sm font-semibold mr-4">View Instruction</button>  
    </div>
     </div> );
}
// #38aae9 
 
export default SecondNavbar;