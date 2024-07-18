import {useForm}  from "react-hook-form"
import Form_DashBoard from "./form_dashboard"
const Teacher_Form = () => {
 

        const {handleSubmit , register , reset} = useForm()

    const onSubmit = (data)=>
    {
        console.log(data);
        reset(); 
    }
 
    return (  <div className="grid grid-cols-4 gap-4 ">
    <Form_DashBoard />
    <div className="col-span-3">
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-5">
    <div className="ml-2 mr-2">
    <p className="text-3xl font-bold mb-6">Teacher Form</p>
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Teacher ID</label>
    </div>
    <div>
    <input
    type="number"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Teacher_Id")}
    />
    </div> 
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">First Name</label>
    </div>
    <div>
    <input
    type="text"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("First_Name")}
    />
    </div>

    <div className="mb-2">
    
    <label className="text-xl font-medium ">Last Name</label>
    </div>
    <div>
    <input
    type="text"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Last_Name")}
    />
    </div>
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Email</label>
    </div>
    <div>
    <input
    type="email"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Email")}
    />
    
    </div>

    <div className="mb-2">
    
    <label className="text-xl font-medium ">Number</label>
    </div>
    <div>
    <input
    type="number"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Number")}
    />
    </div>
    
    
    
            <button className="text-lg text-white w-[120px] h-[40px] bg-emerald-500 rounded-lg hover:bg-orange-400">Submit</button>
            </div> 
            </form>
            </div>
            </div>
            );
        
    
}
 
export default Teacher_Form;