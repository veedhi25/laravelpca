import Navbar from '@components/jee_mains/navbar'
import NavbarImg from '@components/jee_mains/NavbarImg';
import CandidateDetails from '@components/jee_mains/candidate_details';
import Middle from '@components/jee_mains/middle';
import Footer from '@components/jee_mains/footer';
import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { useCustomerQuery } from '@data/customer/use-customer.query';
// import { classNames } from 'classnames';
import { GetServerSideProps } from 'next';
import { parseContextCookie } from '@utils/parse-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { useExamQuery } from '@data/exams/use-exam.query';
import { useState } from 'react';
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
  
const Layout = () => {

  const [endExam , setEndExam] = useState(false)
  const [timeAfterRestart , setTimeAfterRestart] = useState(0);
  
    const router = useRouter()
    
     const paperId = router.query.exam_id
     const attemptId = router.query.attemptId
     const paper = parseInt(paperId);
     
     const {data : sauravpaper} = useExamQuery(paper);
     const {data:student} = useCustomerQuery()
     if(!student && !sauravpaper) return 'loading....'

    return ( 

        <div className=''>

            <Navbar/>
            <NavbarImg/>
            <CandidateDetails time={sauravpaper?.time} setEndExam={setEndExam} student={student} examNmae={sauravpaper?.course_name} subjectName={sauravpaper?.name} timeAfterRestart={timeAfterRestart} setTimeAfterRestart={setTimeAfterRestart} />
          
       <Middle endExam={endExam}  paperId={paper} sauravpaper={sauravpaper} setTimeAfterRestart={setTimeAfterRestart} attemptId={attemptId}/>

        <Footer />

        </div>  

    );
}
 
export default Layout; 

 