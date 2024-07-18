
import { useForm } from 'react-hook-form';
import Form_DashBoard from './form_dashboard';

const Courses_Form = () => {
    
    
    
    const resetForm = (e)=>
    {
        console.log(e)
        
        reset();
    }

    const {handleSubmit , register , reset} = useForm();


    return (<div className="grid grid-cols-4 gap-4 ">
    <Form_DashBoard />
    <div className="col-span-3">
         <form onSubmit={handleSubmit(resetForm)} className="max-w-lg mx-auto mt-5">
<div className="ml-2 mr-2">
<p className="text-3xl font-bold mb-6">Course Form</p>

<div className="mb-2">

<label className="text-xl font-medium ">Course ID</label>
</div>
<div>
<input
type="number"
className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
{...register("Course_Id")}
/>
</div> 

<div className="mb-2">

<label className="text-xl font-medium ">Course Name</label>
</div>
<div>
<input
type="text"
className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
{...register("Course_Name")}
/>
</div>

<div className="mb-2">

<label className="text-xl font-medium ">Course Code</label>
</div>
<div>
<input
type="text"
className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
{...register("Course_Code")}
/>

</div>

<div className="mb-2">

<label className="text-xl font-medium ">Course Description</label>
</div>
<div>
<input
type="long text"
className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
{...register("Course_Description")}
/>
</div>

        <button className="text-lg text-white w-[120px] h-[40px] bg-emerald-500 rounded-lg hover:bg-orange-400">Submit</button>
        </div> 
        </form>
        </div>
        </div>
        
         );
}
 
export default Courses_Form;