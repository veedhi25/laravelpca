import { useForm } from 'react-hook-form';
import Form_DashBoard from './form_dashboard';


const Subject_Form = () => {
    
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
    <p className="text-3xl font-bold mb-6">Subject Form</p>
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Subject ID</label>
    </div>
    <div>
    <input
    type="number"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Subject_Id")}
    />
    </div> 
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Subject Name</label>
    </div>
    <div>
    <input
    type="text"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Subject_Name")}
    />
    </div>
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Course ID</label>
    </div>
    <div>
    <input
    type="text"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Course_ID")}
    />
    
    </div>

    <div className="mb-2">
    
    <label className="text-xl font-medium ">Subject Code</label>
    </div>
    <div>
    <input
    type="long text"
    className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
    {...register("Subject_code")}
    />
    </div>
    
    <div className="mb-2">
    
    <label className="text-xl font-medium ">Subject Description</label>
    </div>
    <div>
    <textarea
    type="long text"
    className="text-lg border-2 w-full mb-4  rounded-md bg-gray-100 pl-2 h-[135px]"
    {...register("Subject_Description")}
    />
    </div>
    
            <button className="text-lg text-white w-[120px] h-[40px] bg-emerald-500 rounded-lg hover:bg-orange-400">Submit</button>
            </div> 
            </form>
            </div>
            </div>
            );
}
 
export default Subject_Form;