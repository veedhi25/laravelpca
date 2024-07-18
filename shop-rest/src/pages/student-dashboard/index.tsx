import { parseContextCookie } from '@utils/parse-cookie';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'
import Exams from './exams';
import useExamAttemptsAnswersQuery from '@data/exams/use-exam-attempt-answers.query';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { useUserAllAttemptedExamsQuery } from '@data/exams/use-user-all-exams-attempts.query';


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

  
export default function StudentDashboard() {

  const {data:user} = useCustomerQuery();

  // const {data:examAttempt} = useExamAttemptsAnswersQuery(user?.me?.id)
  const {data:examAttempt} = useUserAllAttemptedExamsQuery(user?.me?.id)
  console.log('examAttempt', examAttempt);
  return (
    <div>
      
       <Exams />
    </div>
  )
}
