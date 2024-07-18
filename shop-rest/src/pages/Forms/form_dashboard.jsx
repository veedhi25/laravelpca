import Link from "next/link"

const Form_DashBoard = () => {
    
    return ( 
    <div>
        
        {/* <ul className='grid grid-flow-row border no-underline'>
             <Link href="/" className=' no-underline  '>
             <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Home 
             </li>
            </Link> 
            <Link href="/Student_Form">
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Student Form 
            </li>
            </Link>
            <Link href="/Teacher_Form"> 
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Teacher Form  
            </li>
            </Link> 
            <Link href="/Batch_Form"> 
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                Batch Form  
            </li>
            </Link> 
            <Link href="/Course_Form">
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Course Form  
            </li>
            </Link>
            <Link href="/Marking_Form">
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Marking Form  
            </li>
            </Link>
            <Link href="/Question_Form">
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Question Form 
            </li>
            </Link>
            <Link href="/Exam_Form">
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Exam Form  
            </li>
            </Link>
            <Link href="/Subject_Form">
            <li className='border bg-teal-400 h-14 w-[206px] flex justify-center items-center font-bold text-lg text-white '>
                 Subject Form 
            </li>
            </Link> 

            
        </ul> */}

<ul className="py-8 snipcss-fcGjz grid grid-flow-row border underline-none">
  <li class="py-2 underline-none">
    
    <Link href="/" className=" underline-none block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl "> Home </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/student_form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Student Form </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/teacher_form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Teacher Form </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/batch_form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Batch Form  </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/courses_form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Course Form  </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/Marking_Form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Marking Form  </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/exam_form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Exam Form  </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/subject_form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Subject Form  </Link>
  </li>
  <li class="py-2">
  <Link href="/Forms/question_form" className="block py-2 px-10 font-normal text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent text-xl"> Question Form  </Link>
  </li>
  
</ul>



        

        

    </div> );
}
 
export default Form_DashBoard;