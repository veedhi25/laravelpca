
const Instruction_Heading = ({handleSubmit , register , onSubmit}) => {

   

    return ( <div className=" h-[200px] lg:h-[80px] flex flex-col lg:flex-row  items-center justify-between mt-2 bg-[url('https://www.nta.ac.in/img/texture-frozen-window.jpg')]">
        
        <div className="flex h-[90px] ml-14 items-center ">
        <div className="text-2xl font-bold text-[#012B55] tracking-[3px]">
        GENERAL INSTRUCTIONS
        </div >
        

        
        </div>

        <div >
        <div className="h-10 w-[300px] mr-12 sm:pt-2  flex-col text-lg pl-4">
        <div>Choose Your Default Language</div>
        </div>
           <form onChange={handleSubmit(onSubmit)}>
           
            <select {...register("data")}  className="h-10 w-[250px] mr-12 sm:pt-2 border border-black flex-col text-base pl-4 ml-4" >
            
                <option value="1">English</option>
                <option value="2">Hindi</option>
                <option value="3">Gujrati</option>
               
            </select>
            </form>

            
            
        </div>
    </div> );
}
 
export default Instruction_Heading;