import {useRouter} from "next/router"
import Navbar from "@components/jee_mains/navbar";
import NavbarImg from "@components/jee_mains/NavbarImg";
import Instruction_Heading from "@components/instruction_page/instruction_heading";
import Footer from "@components/jee_mains/footer";
import { useForm } from "react-hook-form";
import Reading_English from '@components/instruction_page/reading_english';
import Reading_Hindi from "@components/instruction_page/reading_hindi";
import Reading_Gujrati from "@components/instruction_page/reading_gujrati";
import { useCustomerQuery } from "@data/customer/use-customer.query";

import { useState } from "react";
import { useStartExamMutation } from "@data/exam-submit/use-exam-submit.mutation";
import { GetServerSideProps } from 'next';
import { parseContextCookie } from '@utils/parse-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useExamsQuery } from "@data/exams/use-exams.query";
import { useExamQuery } from "@data/exams/use-exam.query";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cookies = parseContextCookie(context?.req?.headers?.cookie);
    if (!cookies?.auth_token) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ["common", "forms"])),
      },
    };
  };

const Instruction_page = () => {
  const router = useRouter();

  const paperId = router.query.id
  
 const [pageLanguage , setPageLanguage] = useState('1')
 const [check , setCheck] = useState(false)

 const {data : user} = useCustomerQuery() 

 const {data: examData} = useExamsQuery();

 console.log('exam data', examData);

 const handleSuccess = (data) => {
     if( JSON.parse(localStorage.getItem(`${paperId}attemptId`)) == null || JSON.parse(localStorage.getItem(`${paperId}attemptId` )) == undefined )
     {
      const attemptId = data.attempt_id; // Adjust the property name based on the actual response structure
      router.push(`/jee_mains_paper?exam_id=${router.query.id}&attemptId=${attemptId}`);
     }
     else
     {
      const attemptId =JSON.parse(localStorage.getItem(`${paperId}attemptId`)) 
      router.push(`/jee_mains_paper?exam_id=${router.query.id}&attemptId=${attemptId}`);
     }
    
  };
  
  const startExamMutation = useStartExamMutation(handleSuccess);
 

    const onSubmit = ({data}) => {
        setPageLanguage(data)
          };
    
    const { handleSubmit , register} = useForm();

    // let check = false
   

    const handleClick = () => {
        if(check) {
          const examData = {
            user_id: user?.me?.id,
            exam_id: parseInt(router.query.id),
            is_mock: parseInt(router.query.is_mock)
          };
          startExamMutation.mutate({ examData }); // Keep this as is
        } else {
          alert("Please accept terms and conditions before proceeding.");
        }
      };
      
    // if(!user)
    // {
    //     return (<div>Loading...</div>)
    // }


    console.log("user" , user);

    
    return ( <div>
        <Navbar />
        <NavbarImg />
        <Instruction_Heading handleSubmit={handleSubmit} register={register} onSubmit={onSubmit}/>
        <div>
           {pageLanguage === '1' && <Reading_English handleClick={handleClick} check={check} setCheck={setCheck} />}
           {pageLanguage === '2' && <Reading_Hindi handleClick={handleClick} check={check} setCheck={setCheck} />}
           {pageLanguage === '3' && <Reading_Gujrati handleClick={handleClick} check={check} setCheck={setCheck} />}
        </div>
         
        
        <Footer />


        
    </div> );
}
 
export default Instruction_page;