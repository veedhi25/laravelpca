import {useForm } from 'react-hook-form'
import Form_DashBoard from './form_dashboard'
const Marking_Form = () => {

    const {handleSubmit , register , reset} = useForm()

    const onSubmit = (data)=>
    {
        console.log(data);
        reset(); 
    }

    return ( <div className="grid grid-cols-4 gap-4 ">
    <Form_DashBoard />
    <div className="col-span-3">
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-5">
    <div className="ml-2 mr-2">
    <p className="text-3xl font-bold mb-6">Marking Form</p>
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Marking ID</label>
    </div>
    <div>
    <input
    type="number"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Marking_Id")}
    />
    </div> 
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Scheme Name</label>
    </div>
    <div>
    <input
    type="text"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Scheme_Name")}
    />
    </div>
    
    
    
   

    <div className="mb-2">
    
    <label className="text-xl font-medium ">Description</label>
    </div>
    <div>
    <textarea
    type="text"
    className="text-lg border-2 w-full mb-4 h-[130px] rounded-xl bg-gray-100 pl-2 pr-2"
    {...register("Sescription")}
    />
    
    </div>

    
    
            <button className="text-lg  text-white w-[120px] h-[50px] bg-emerald-500 rounded-xl hover:bg-orange-400">Submit</button>
            </div> 
            </form>
            </div>
            </div>
            
             );
}
 
export default Marking_Form;