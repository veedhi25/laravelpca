import { useExamsQuery } from '@data/exams/use-exams.query';
import { adminOnly } from '@utils/auth-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from "@components/layouts/admin";
import Table from 'rc-table';
import React from 'react';
import { motion, useSpring } from 'framer-motion'; 
import ResultsTable from '@components/result-table';
import { useUsersQuery } from '@data/user/use-users.query';
import ActionButtons from '@components/common/action-buttons';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useCourseExamQuery } from '@data/exams/use-exam-course.query';
import { useCoursesQuery } from '@data/courses/use-courses.query';
import useExamStudentsQuery from '@data/exams/use-exam-students.query';

const result = {
    "exam": "IIT",
    "papers": [
      {
          "name": "Advance Paper 1",
          "totalQuestions": 54,
          "totalMarks": 180,
          "results": [
            {
              "studentName": "Satwik",
              'email' : 'ssm4047@gmail.com',
              "totalAttempted": 39,
              "correctAnswers": 21,
              "incorrectAnswers": 18,
              "score": 41,
              "questions": []
            },
            {
              "studentName": "Avnish",
              'email': 'avnisht1326@gmail.com',
              "totalAttempted": 34,
              "correctAnswers": 15,
              "incorrectAnswers": 19,
              "score": 29
            },
            {
              "studentName": "Puneet",
              'email': 'puneetkataria177@gmail.com',
              "totalAttempted": 29,
              "correctAnswers": 11,
              "incorrectAnswers": 18,
              "score": 33
            },
            {
              "studentName": "Atharv",
              'email': 'bhatiatharv12@gmail.com',
              "totalAttempted": 30,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 39
            },
            {
              "studentName": "Mudit Bhatt",
              'email': 'bhattmudit2521@gmail.com',
              "totalAttempted": 28,
              "correctAnswers": 10,
              "incorrectAnswers": 18,
              "score": 30
            },
            {
              "studentName": "Chaitanya",
              'email': 'chaitanya2052@gmail.com',
              "totalAttempted": 32,
              "correctAnswers": 18,
              "incorrectAnswers": 14,
              "score": 54
            },
            {
              "studentName": "Subham",
              'email': 'shubhamrajsisai@gmail.com',
              "totalAttempted": 33,
              "correctAnswers": 14,
              "incorrectAnswers": 19,
              "score": 42
            },
            {
              "studentName": "Rishabh",
              'email': 'yadavrishab002@gmail.com',
              "totalAttempted": 26,
              "correctAnswers": 12,
              "incorrectAnswers": 14,
              "score": 36
            },
            {
              "studentName": "Raj",
              'email': 'rajlitoriya154@gmail.com',
              "totalAttempted": 31,
              "correctAnswers": 15,
              "incorrectAnswers": 16,
              "score": 45
            },
            {
              "studentName": "Manas",
              'email': 'chaudharymanas3@gmail.com',
              "totalAttempted": 30,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 39
            },
            {
              "studentName": "Abhinav",
              'email': 'abhinavmishraack@gmail.com',
              "totalAttempted": 35,
              "correctAnswers": 19,
              "incorrectAnswers": 16,
              "score": 57
            },
            {
                "studentName": "Subham Raj",
                'email': 'shubhamraj0329@gmail.com',
                "totalAttempted": 34,
                "correctAnswers": 15,
                "incorrectAnswers": 19,
                "score": 22
              },
            {
              "studentName": "Akshi",
              'email': 'akshisaini2402@gmail.com',
              "totalAttempted": 27,
              "correctAnswers": 10,
              "incorrectAnswers": 17,
              "score": 30
            },
            {
              "studentName": "Kanishka",
              'email': 'ky295621raj@gmail.com',
              "totalAttempted": 33,
              "correctAnswers": 15,
              "incorrectAnswers": 18,
              "score": 45
            },
            {
              "studentName": "Innayat",
              'email': 'innayat2005@gmail.com',
              "totalAttempted": 32,
              "correctAnswers": 16,
              "incorrectAnswers": 16,
              "score": 48
            },
            {
              "studentName": "Shubhangi",
              'email': 'mshubhangi2006@gmail.com',
              "totalAttempted": 29,
              "correctAnswers": 12,
              "incorrectAnswers": 17,
              "score": 36
            },
            {
              "studentName": "Ananya",
              'email': 'ananyashree75@gmail.com',
              "totalAttempted": 34,
              "correctAnswers": 17,
              "incorrectAnswers": 17,
              "score": 51
            },
            {
              "studentName": "Astha",
              'email': 'asthatripathi0272@gmail.com',
              "totalAttempted": 31,
              "correctAnswers": 15,
              "incorrectAnswers": 16,
              "score": 45
            },
            {
              "studentName": "Anupam",
              'email': 'anupamdixit0578@gmail.com',
              "totalAttempted": 28,
              "correctAnswers": 13,
              "incorrectAnswers": 15,
              "score": 39
            }
          ]
        },
        
        
        {
          "name": "Advance Paper 2",
          "totalQuestions": 54,
          "totalMarks": 180,
          "results": [
            {
              "studentName": "Satwik",
              'email': '',
              "totalAttempted": 30,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 46,
              "questions": []
            },
            {
              "studentName": "Avnish",
              'email': '',
              "totalAttempted": 30,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 35
            },
            {
              "studentName": "Puneet",
              'email': '',
              "totalAttempted": 30,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 25
            },
            {
              "studentName": "Atharv",
              'email': '',
              "totalAttempted": 28,
              "correctAnswers": 18,
              "incorrectAnswers": 10,
              "score": 54
            },
            {
              "studentName": "Mudit Bhatt",
              'email': '',
              "totalAttempted": 27,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 42
            },
            {
              "studentName": "Chaitanya",
              'email': '',
              "totalAttempted": 32,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 43
            },
            {
              "studentName": "Subham",
              'email': '',
              "totalAttempted": 39,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 39
            },
            {
              "studentName": "Rishabh",
              'email': '',
              "totalAttempted": 29,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 29
            },
            {
              "studentName": "Raj",
              'email': '',
              "totalAttempted": 29,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 19
            },
            {
              "studentName": "Manas",
              'email': '',
              "totalAttempted": 20,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 40
            },
            {
              "studentName": "Abhinav",
              'email': '',
              "totalAttempted": 25,
              "correctAnswers": 13,
              "incorrectAnswers": 17,
              "score": 23
            },
            {
                "studentName": "Subham Raj",
                'email': 'shubhamraj0329@gmail.com',
                "totalAttempted": 30,
                "correctAnswers": 11,
                "incorrectAnswers": 19,
                "score": 32
              },
            {
              "studentName": "Akshi",
              'email': '',
              "totalAttempted": 39,
              "correctAnswers": 13,
              "incorrectAnswers": 26,
              "score": 28
            },
            {
              "studentName": "Kanishka",
              'email': '',
              "totalAttempted": 44,
              "correctAnswers": 21,
              "incorrectAnswers": 22,
              "score": 40
            },
            {
              "studentName": "Innayat",
              'email': '',
              "totalAttempted": 40,
              "correctAnswers": 23,
              "incorrectAnswers": 17,
              "score": 31
            },
            {
              "studentName": "Shubhangi",
              'email': '',
              "totalAttempted": 30,
              "correctAnswers": 23,
              "incorrectAnswers": 17,
              "score": 28
            },
            {
              "studentName": "Ananya",
              'email': '',
              "totalAttempted": 30,
              "correctAnswers": 28,
              "incorrectAnswers": 17,
              "score": 44
            },
            {
              "studentName": "Astha",
              'email': '',
              "totalAttempted": 39,
              "correctAnswers": 34,
              "incorrectAnswers": 17,
              "score": 56
            },
            {
              "studentName": "Anupam",
              'email': '',
              "totalAttempted": 35,
              "correctAnswers": 18,
              "incorrectAnswers": 17,
              "score": 48
            }
          ]
        }
        
    ]
  }

  function Results() {

    const { data } = useUsersQuery({
      page: 1,
      text: ''
    })

    const {data:examsCourses} = useCourseExamQuery('course_id');

  const {data:exams} = useExamsQuery();

  const {data:courses} = useCoursesQuery();

  const {data:students} = useExamStudentsQuery(29);

  console.log('users exams', exams);
  console.log('users courses', courses?.data?.courses);
  console.log('students',students);
  console.log('user', '');

    const {data:user} = useUsersQuery({
      text: '',
    })

    console.log('user', user?.users?.data);

    const { openModal } = useModalAction();
  
    function handleClick(user: any) {
      openModal('RESULT_TABLE', {
        data: user
      })
    }

    let allResults = [];
    result.papers.forEach(paper => {
      paper.results.forEach(res => {
        allResults.push({
          paperName: paper.name,
          ...res
        });
      });
    });
    
    const groupedResults = allResults.reduce((acc, res) => {
        (acc[res.studentName] = acc[res.studentName] || {results: [], email: res.email}).results.push(res);
        return acc;
      }, {});
  
      return (
        <div className="my-4 mx-2">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-700 bg-gray-100">
              <th className="py-4 px-6 border-b">S.No</th>
                <th className="py-4 px-6 border-b">Student Name</th>
                <th className="py-4 px-6 border-b">Email</th>
                <th className="py-4 px-6 border-b">Paper Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedResults).map((studentName, index) => (
                <tr key={index} className="text-gray-700 text-sm">
                  <td className="py-4 px-6 border-b">{index +1}</td>
                  <td className="py-4 px-6 border-b">{studentName}</td>
                  <td className="py-4 px-6 border-b">{groupedResults[studentName].email}</td>
                  <td className="py-4 px-6 border-b">
                    {groupedResults[studentName]?.results?.map((res, resIndex) => (
                      <div key={resIndex} className="my-2">
                        <span className="font-semibold">{res.paperName}: </span>
                        <span>{res.score} </span>
                        <button onClick={() => handleClick(res)} className="text-blue-500 underline">
                          Details
                        </button>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  };
  
  

export default Results;


Results.authenticate = {
    permissions: adminOnly,
  };
  Results.Layout = Layout;
  
  export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["form", "common", "table"])),
    },
  });
