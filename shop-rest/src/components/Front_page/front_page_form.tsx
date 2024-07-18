
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { useCoursesQuery } from '@data/courses/use-courses.query';
import { useExamsQuery } from '@data/exams/use-exams.query';
import { useState } from "react";

const Front_Page_Form = () => {
    
  const [filteredExam , setFilteredExam] = useState([])
    
    const {handleSubmit , register , reset , watch} = useForm()
    const router = useRouter()

    const  onSubmit = (e) =>
    {
        console.log(e);
        reset();

        router.push(`/jee_mains_paper/instruction_page/${e.Paper_Code}`)
        
    }

    const {data : courses } = useCoursesQuery()
    const {data : exam} = useExamsQuery()

    console.log('exam' , exam)
     
    const handleCourse = (e)=>
    {
      const courseId = e.target.value

      const filteredExam = exam.filter((item)=>
      {
        console.log("course id" , item.course_id)
        const Id = parseInt(courseId)
        console.log("courseId" , Id)
       return  item.course_id === Id
      })
      
      setFilteredExam(filteredExam)
      // console.log('filteredExam' , filteredExam)

    }
    
    const course = courses?.data?.courses;
    if(!course) return 'loading....'
    console.log("courses" , course);
     
    return ( <div className="bg-[#012B55] h-[700px] ">
        <div className='flex justify-center mt-2'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col bg-white mt-10 w-[30%] h-[400px] '>
               
                <label className='ml-10 mt-8 text-base mb-1'>Select exam you would like to appear</label>
                <select type='text ' className='border border-[#555]  ml-10 w-[80%] h-[40px] '
                 {...register('Exam_Code')} onChange={(e) => handleCourse(e)}>
                    <option value="">
          --Select--
          </option>
          {/* `` */}
          {course.map((courses)=>
          {
            return (<option value={courses.id}>
             {courses.name}
            </option>)
          })}




                 </select>

                <label className='ml-10 mt-6 text-lg mb-1'>paper</label>
                <select type='text' className='border border-[#555]  ml-10 w-[80%] h-[40px] '
                 {...register('Paper_Code')} >

<option value="">
          --Select--
        </option>
          {/* `` */}
          {filteredExam?.map((exam)=>
          {
            return (<option value={exam.id}>
             {exam.name}
            </option>)
          })}
        
         </select>


                 
        <button className='border font-bold text-xl text-white border-[#2e6da4]  ml-10 w-[80%] h-[40px] mt-8 bg-[#337ab7]'>START MOCK TEST</button> 
                
        <div className='mt-8  flex justify-center text-lg ml-10 w-[80%]'>For NTA Mock Tests of December 2018 onwards, please click here</div>

              
            </form>
        </div>

        <div className='text-center mt-10 text-3xl text-white'>Welcome to <span className="font-bold text-[#f7931e] ">Patanjali Career Academy</span>, Test practice Centre</div>
         <div className=' border-t border-white ml-12 mr-12 mt-12 text-2xl text-white'>
            <div className='ml-10 mt-6'>This Mock Test is to familiarize the students about processes of Computer Based Test (CBT), candidate can understand various processes of Computer Based Test (CBT) with the available mock test.</div>
            </div>
    
    </div> );
}
 
export default Front_Page_Form;