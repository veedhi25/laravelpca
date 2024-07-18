
import { useForm } from 'react-hook-form';
import Form_DashBoard from './form_dashboard';

const Student_Form = () => {
    
    // const [fname , setFname] = useState("")
    // const [id , setId] = useState("")
    // const [lname , setLname] = useState("")
    // const [email , setEmail] = useState("")
    // const [number , setNumber] = useState("")
    // const [batch , setBatch] = useState("")
    // const resetForm = (e)=>
    // {
    //     e.preventDefault()
    //     setLname("")
    //     setFname("")
    //     setEmail("")
    //     setId("")
    //     setBatch("")
    //     setNumber("")  
    // }
    
    const resetForm = (e)=>
    {
        console.log(e)
        
        reset();
    }

    const {handleSubmit , register , reset} = useForm();


    return (
        <div className="grid grid-cols-4 gap-4 ">
    <Form_DashBoard />
    <div className="col-span-3"> <form onSubmit={handleSubmit(resetForm)} className="max-w-lg mx-auto mt-5">
<div className="ml-2 mr-2">
<p className="text-3xl font-bold mb-6">Student Form</p>

<div className="mb-2">

<label className="text-xl font-medium ">Student ID</label>
</div>
<div>
<input
// id="ID"
type="number"
// value={id}
className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
// onChange={(e) => setId(e.target.value)}
{...register("Id")}
/>
</div>
        <div className="mb-2">

        <label className="text-xl font-medium ">First Name</label>
        </div>
        <div>
        <input
        // id="first name"
        type="text"
        // value={fname}
        className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
        // onChange={(e) => setFname(e.target.value)}
        {...register("Fname")}
        />
        </div>
        <div className="mb-2">

        <label className="text-xl font-medium ">Last Name</label>
        </div>
        <div>
        <input
        // id="last name"
        type="text"
        // value={lname}
        className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
        // onChange={(e) => setLname(e.target.value)}
        {...register("Lname")}
        />
        </div>
        <div className="mb-2">

        <label className="text-xl font-medium ">Email</label>
        </div>
        <div>
        <input
        // id="email"
        type="email"
        // value={email}
        className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
        // onChange={(e) => setEmail(e.target.value)}
        {...register("Email")}
        />
        </div>
        
        <div className="mb-2">

        <label className="text-xl font-medium ">Number</label>
        </div>
        <div>
        <input
        // id="number"
        type="text"
        // value={number}
        className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
        // onChange={(e) => setNumber(e.target.value)}
        {...register("Number")}
        />
        </div>
        <div className="mb-2">

        <label className="text-xl font-medium ">Batch ID</label>
        </div>
        <div>
        <input
        // id="Batch_ID"
        type="text"
        // value={batch}
        className="text-lg border-2 w-full mb-4 h-12 rounded-full bg-gray-100 pl-2"
        // onChange={(e) => setBatch(e.target.value)}
        {...register("Batch ID")}
        />
        </div>
        <button className="text-lg text-white w-[120px] h-[40px] bg-emerald-500 rounded-lg hover:bg-orange-400">Submit</button>
        </div> 
        </form>
        </div>
        </div>
         );
}
 
export default Student_Form;