import UserDashboardSideBar from "src/pages/user-dashboard-sidebar";
import NavBar from "@components/navbar/NavBar";
import Card from "@components/ui/card";
import { useCoursesQuery } from "@data/courses/use-courses.query";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Table from "rc-table";



import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUserExamAttemptsQuery } from "@data/exams/use-user-exam-attempts.query";
import { useUserAllAttemptedExamsQuery } from "@data/exams/use-user-all-exams-attempts.query";
import { useExamsQuery } from "@data/exams/use-exams.query";
import { useExamQuery } from "@data/exams/use-exam.query";
// import { classNames } from 'classnames';
import { useLeaderBoardQuery } from "@data/exams/use-exam-leader-board.query";

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  exams: Exam[];
}

interface Exam {
  id: number;
  name: string;
  score: number;
}

const notification = [
  { data: "Upcoming Sunday there is jee Advanced test is goning to held" },
  { data: "Our New Batch is comming soon for jee Advanced" },
  { data: "Next Sunday coaching is off" },
];

const Dashboard = () => {
  const RADIAN = Math.PI / 180;
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];
  

  const {data : exams} = useExamsQuery();

  console.log("saurav exam" , exams)

  const lastFiveAppearedExams = exams?.slice(-5)?.reverse()


  console.log("saurav exam  11" , lastFiveAppearedExams)
 

  const [typeOfExam, setTypeOfExam] = useState({});

  // console.log("typeOfExam", typeOfExam);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  const { data: student } = useCustomerQuery();
  
  const { data: allAttempts } = useUserAllAttemptedExamsQuery(student?.me?.id);
  console.log("allAttempts" , allAttempts)
  const attemptsLimit = 5;
  const is_mock = 0;
  const {data:lastFive} = useLeaderBoardQuery(student?.me?.id,  is_mock, attemptsLimit);

  console.log('lastFive', lastFive)
 
  const TableData  = lastFive?.map((item) =>
  {
    return ({exam_name : item?.user_result?.exam_name , first: item?.top_scores[0]?.user_name , second: item?.top_scores[1]?.user_name , 
      third : item?.top_scores[2]?.user_name , user_rank : item?.user_rank})
  })

  console.log('TableData', TableData)

  let allexams = [];

  allAttempts?.map((attempts) => {
    const data = attempts?.attempted_exams[0];
    data.exam_name = attempts?.exam_name
    allexams = [...allexams, data];
  });

  // console.log("allexams", allexams);

  const last5exam = allexams?.slice(-5);

  // console.log("allAttempts", allAttempts);

  const graphdata = last5exam?.map((marks) => {
    const obj = {
      name: marks?.exam_name,
      Physics: marks?.section_scores?.Physics ? marks?.section_scores?.Physics : 0,
      Maths: marks?.section_scores?.Maths ? marks?.section_scores?.Maths : 0,
      Chemistry: marks?.section_scores?.Chemistry ? marks?.section_scores?.Chemistry : 0,
    };

    obj.['Your Total'] = obj.Physics + obj.Maths + obj.Chemistry

    return obj;
  });

  const data = [
    {
      name: "Maths",
      value: allexams?.reduce((ans, item) => {
        return (
          ans + (item?.section_scores?.Maths ? item?.section_scores?.Maths : 0)
        );
      }, 0),
    },
    {
      name: "Physics",
      value: allexams?.reduce((ans, item) => {
        return (
          ans +
          (item?.section_scores?.Physics ? item?.section_scores?.Physics : 0)
        );
      }, 0),
    },
    {
      name: "Chemistry",
      value: allexams?.reduce((ans, item) => {
        return (
          ans +
          (item?.section_scores?.Chemistry
            ? item?.section_scores?.Chemistry
            : 0)
        );
      }, 0),
    },
  ];

  let totalScore = 0;


  const columns = [
   
    {
      title: 'Exam',
      dataIndex: 'exam_name',
      key: 'exam_name',
      align: "left",
      width: 140,
      style: { color: 'red' },
      // render : ()=> <div>hi</div>
      
      
     },

    {
      title: "1'st",
      dataIndex: "first",
      key: "first",
      align: "left",
      width: 140,
    },
    {
      title: "2nd",
      dataIndex: "second",
      key: "second",
      align: "left",
      width : 140,
    },
    {
      title: "3rd",
      dataIndex: "third",
      key: "third",
      align: "left",
      width : 140,
    },
    {
      title: "your Rank",
      dataIndex: "user_rank",
      key: "user_rank",
      align: "left",
      width : 140,
    },

  ];

  useEffect(() => {
    let Obj = {};

    allAttempts?.map((item: any) => {
      Obj[item?.exam_name] = !Obj[item?.exam_name]
        ? 1
        : Obj[item?.exam_name] + 1;
    });

    setTypeOfExam(Obj);
  }, [allAttempts]);
 
  var higestScore = 0
  var higestScoreExamName = "";
  var higestScorePercentage;
  var higestScoreExamTotal;

  allexams?.map((item: any) => {
    
    const scorePerExam = (item?.total_score / 180) * 100;
    console.log("saurav item" , scorePerExam)

    if (scorePerExam > higestScore) {
      higestScoreExamName = item?.exam_name;
      higestScorePercentage = scorePerExam
      higestScore = item?.score
      higestScoreExamTotal = item?.total_marks
    }
    totalScore = totalScore + scorePerExam;
  });

  const averageScore = allAttempts ? totalScore / allAttempts.length : 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="">
          <UserDashboardSideBar className="p-2" />
        </div>
        <div className="col-span-5 lg:mr-2">
          <div>
            <div className="bg-gray-200 p-2">
              <div className="bg-white rounded p-4 shadow-md flex">
                <div className="flex items-center">
                  <div className="">
                    <img
                      src="/student-logo.png"
                      className="h-12 w-12 rounded-full bg-gray-200"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold ml-2 text-gray-600">
                      Hi' {student?.me?.name}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="  flex mt-2 gap-2 flex-wrap sm:flex-nowrap">
                <div className="xs+:min-w-[300px] h-[22rem] bg-white p-4 rounded shadow-md border border-gray-200 flex flex-col flex-1">
                  <strong className="text-gray-700 font-medium text-gray-600">
                    Last 5 Exams
                  </strong>
                  <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={396}
                        height={300}
                        data={graphdata}
                        margin={{
                          top: 20,
                          right: 10,
                          left: -10,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3 0 0"
                          vertical={false}
                        />
                        <XAxis dataKey="name" reversed={true} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Your Total" fill="#FF8042" />
                        <Bar dataKey="Maths" fill="#0ea5e9" />
                        <Bar dataKey="Physics" fill="#ea580c" />
                        <Bar dataKey="Chemistry" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="  xs+:min-w-[300px] w-[20rem] h-[22rem] bg-white p-4 rounded shadow-md border border-gray-200 flex flex-col xs+:flex-1 lg:flex-none">
                  <strong className="text-gray-700 font-medium ">
                    LeaderBoard
                  </strong>
                  {/* <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={300}>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="45%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={105}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div> */}
                  <div className="bg-white mt-2">  
        <Table
          columns={columns}
          emptyText={"N/A"}
          data={TableData}
          rowKey="id"
          scroll={{ y: 200 }}
        />
      </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <div className=" xs:min-w-[230px] w-[15rem] h-[12rem] bg-white p-4 rounded shadow-md border border-gray-200 flex flex-col mt-2 flex-1">
                  <div className="text-center ">
                    <h2 className="text-lg font-semibold mb-2 text-gray-600">
                      Average Score
                    </h2>
                    <div style={{ width: "100px", margin: "0 auto" }}>
                      <CircularProgressbar
                        value={averageScore}
                        text={`${averageScore.toFixed(2)}%`}
                        styles={buildStyles({
                          rotation: 0.25,
                          textSize: "16px",
                          pathTransitionDuration: 1,
                          pathColor: `rgba(62, 152, 199, ${
                            averageScore / 100
                          })`,
                          textColor: "#333",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#3e98c7",
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="min-w-[100px] text-gray-700  xs:min-w-[230px] w-[20rem] h-[12rem] bg-white p-4 rounded shadow-md border border-gray-200 flex flex-col mt-2 flex-1">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700 ">
                      Higest Marks
                    </h2>
                    <div className="text-gray-700" >Exam Name : {higestScoreExamName}</div>
                    <div>
                      {" "}
                      Score :{" "}
                      {higestScorePercentage
                        ? higestScorePercentage.toFixed(2)
                        : ""}
                      %{" "}
                    </div>
                    <div>
                      {" "}
                      {/* {higestScore}/{parseInt(higestScoreExamTotal)}{" "} */}
                    </div>
                  </div>
                </div>

                <div className="min-w-[100px] text-gray-700 xs:min-w-[230px] w-[20rem] h-[12rem] bg-white p-4 rounded shadow-md border border-gray-200 flex flex-col mt-2 flex-1">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2 text-[#2dd4bf]">
                      Total Exams{" "}
                      <span className="ml-2 text-[#0ea5e9] ">
                        ({allAttempts?.length})
                      </span>
                    </h2>

                    {Object.keys(typeOfExam)?.map((keys, value) => {
                      return (
                        <div className="text-gray-700">
                          {keys}
                          {/* : <span className=''>{typeOfExam[keys]}</span> */}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* <div className="min-w-[100px] xs:min-w-[230px] xs++:min-w-[400px] w-[23rem] h-[12rem] bg-white p-4 rounded shadow-md border          border-gray-200 flex flex-col mt-2 overflow-auto flex-1">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-magenta ">Notifications</h2>
            <ul className='list-disc ml-2'>
            {notification?.map((item)=>
            {
              return (<li><marquee>{item?.data}</marquee></li>)
            })}
            </ul>
          
        </div>
        </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
