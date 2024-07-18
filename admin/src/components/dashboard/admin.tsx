import { CartIconBig } from "@components/icons/cart-icon-bag";
import { CoinIcon } from "@components/icons/coin-icon";
import ColumnChart from "@components/widgets/column-chart";
import StickerCard from "@components/widgets/sticker-card";
import ErrorMessage from "@components/ui/error-message";
import usePrice from "@utils/use-price";
import Loader from "@components/ui/loader/loader";
import RecentOrders from "@components/order/recent-orders";
import PopularProductList from "@components/product/popular-product-list";
import { useOrdersQuery } from "@data/order/use-orders.query";
import { usePopularProductsQuery } from "@data/analytics/use-popular-products.query";
import { useAnalyticsQuery } from "@data/analytics/use-analytics.query";
import { useTranslation } from "next-i18next";
import { useWithdrawsQuery } from "@data/withdraw/use-withdraws.query";
import WithdrawTable from "@components/withdraw/withdraw-table";
import { ShopIcon , TypesIcon , QuestionIcon} from "@components/icons/sidebar";
import { DollarIcon } from "@components/icons/shops/dollar";
import { RupeeIcon } from "@components/icons/shops/rupee-icon";
import WithdrawsPage from "src/pages/invoices-reward-data";
import { useUsersQuery } from "@data/user/use-users.query";
import { useCoursesQuery } from "@data/courses/use-courses.query";
import { useExamSectionsQuery } from "@data/exam-sections/use-exam-section.query";
import { useMarkingSchemesQuery } from "@data/marking-scheme/use-marking-scheme.query";
import { useExamsQuestionsQuery } from "@data/exam-questions/use-exam-questions.query";
import { useStudentsQuery } from "@data/user/use-students.query";
import { useEffect, useState } from 'react';
import Spinner from "@components/ui/loaders/spinner/spinner";


export default function Dashboard() {

  const { t } = useTranslation();

  const { data, isLoading: loading } = useAnalyticsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage , setCurrentPage] = useState(1)
  const [totalQuestionCount , setTotalQuestionCount] = useState(0)
  


   
   const {data : courses} = useCoursesQuery()
   const {data : sections} = useExamSectionsQuery() 
   const {data: marking} = useMarkingSchemesQuery()
   const {data : question} = useExamsQuestionsQuery({currentPage})
   const {data:users} = useStudentsQuery({limit: 200 , text : searchTerm})
   console.log('dashboard',question)

   useEffect(()=>
   {  
    setCurrentPage(question?.last_page)
    const totalQuestionNumber = (question?.last_page - 1)*question?.per_page
    setTotalQuestionCount(totalQuestionNumber)

   },[question])



  //  if(!question) return <Spinner />

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
        <div className="w-full ">
          <StickerCard
            titleTransKey="Total Students"
            // sticker-card-subtitle-rev
            subtitleTransKey=""
            icon={<img src='/team.png' className='h-10 w-10'/>}
            iconBgStyle={{ backgroundColor: "#A7F3D0" }}
            
            price={(users?.users?.data?.length)}
          />
        </div> 
        {/* <div className="w-full ">
          <StickerCard
            titleTransKey="Total Teachers"
            icon={<img src='/staff.png' className='h-10 w-10'/>}
            // price={new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" }).format(data?.todaysRevenue / 2)}
          />
        </div> */}
        <div className="w-full ">
          <StickerCard
            titleTransKey="Total Courses"
            icon={<TypesIcon className="w-6" color="#1D4ED8" />}
            iconBgStyle={{ backgroundColor: "#93C5FD" }}
            price={(courses?.data?.courses.length)}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="Total Exam Sections"
            // sticker-card-subtitle-order
            subtitleTransKey=""
            icon={<TypesIcon className="w-6" color="#1D4ED8" />}    
            iconBgStyle={{backgroundColor:"rgb(147 243 253)"}}    
            price = {sections?.data?.length}  
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="Total Questions"
            subtitleTransKey=""
            icon={<TypesIcon className="w-6" color="#1D4ED8" />}   
            iconBgStyle={{ backgroundColor: "rgb(241 166 166)" }}         
            price={question &&  totalQuestionCount ?   (totalQuestionCount + question?.data?.length ) : <div className="text-green-300">Calculating... </div>   }  
            // price={question &&  totalQuestionCount ?   (totalQuestionCount + question?.data?.length ) : <div className="w-4 h-4"><Spinner showText={false}  /></div>  }  

          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="Total Marking Schemes"
            // sticker-card-subtitle-order
            subtitleTransKey=""
            icon={<TypesIcon className="w-6" color="#1D4ED8" />}   
            iconBgStyle={{ backgroundColor: "rgb(188 241 166)" }}         
            price={marking?.data?.length  }
          />
        </div> 
        <div className="w-full">
          <StickerCard
            titleTransKey="Total Question Types"
            // sticker-card-subtitle-order
            subtitleTransKey=""
            icon={<TypesIcon className="w-6" color="#1D4ED8" />}   
            iconBgStyle={{ backgroundColor: "rgb(188 241 166)" }}         
            price={marking?.data?.length  }
          />
        </div> 
        {/* <div className="w-full">
          <StickerCard
            titleTransKey="New Students (in last 30 days)"
            // sticker-card-subtitle-order
            subtitleTransKey=""
            icon={<TypesIcon className="w-6" color="#1D4ED8" />}   
            iconBgStyle={{ backgroundColor: "rgb(188 241 166)" }}         
            // price={data?.totalOrdersInLast30Days  }
          />
        </div>  */}
       
       
        
      </div>

      {/* <div className="w-full flex flex-wrap mb-6">
        <ColumnChart
          widgetTitle="Sale History"
          colors={["#03D3B5"]}
          series={salesByYear}
          categories={[
            t("common:january"),
            t("common:february"),
            t("common:march"),
            t("common:april"),
            t("common:may"),
            t("common:june"),
            t("common:july"),
            t("common:august"),
            t("common:september"),
            t("common:october"),
            t("common:november"),
            t("common:december"),
          ]}
        />
      </div> */}

      
       

     

      
     
    </>
  );
}
