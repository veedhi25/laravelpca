const Language = () => {
    return ( <div className="flex justify-end h-11 bg-[#337ab7] text-white text-sm font-semibold items-center">
         <div>View in :</div>
         <div>
            <select className=" w-[120px] h-7 ml-1 mr-4 text-black">
                <option value="English">English</option>
                {/* <option value="Hindi">Hindi</option> */}
            </select>
         </div>
          </div>  );
}
 
export default Language;