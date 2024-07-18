import Card from "@components/common/card";
import { DownloadIcon } from "@components/icons/download-icon";
import { DatePicker } from "@components/ui/date-picker";
import { useModalState } from "@components/ui/modal/modal.context";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ImportShops from "./import-master-shops";
// import ImportShops from "./import-master-shops";


const ExportImportView = () => {

  const [startDate, setStartDate] = useState(null);

  const convertCurrentDate = () => {
    const d =  Date.now();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const [endDate, setEndDate] = useState(Date.now());

  const convertStartDate = () => {
    const d = new Date(startDate);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // alert(convertCurrentDate());

  

  const convertEndDate = () =>{
    const d = new Date(endDate);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const shopid = 4324;
  

  const { t } = useTranslation();

  return (
    <Card className="flex flex-col h-96  ">
      <div className="w-full mb-5">
        <h1 className="text-lg text-center font-semibold text-heading">
          {t("common:Export ")}
        </h1>
      </div>

      <div className="flex items-center my-4 "> 
      <span className="text-gray-700 font-light mx-4">From</span> 
            <div className=""> <DatePicker clearButtonTitle="clear"
             selected={startDate} onChange={(date:Date ) => setStartDate(date)} 
             dateFormat= "dd/MM/yyyy"
            //  clearIcon={null}
              />

            </div>
            <span className="text-gray-700 font-light mx-4">to</span> 
            <div className="w-60"><DatePicker
            // clearIcon={null}
             selected={endDate} onChange={(date:Date) => setEndDate(date)} 
             dateFormat= "dd/MM/yyyy"
            />
            </div>
           </div>

      <div className="grid grid-cols-1 md:grid-cols-s gap-5">
        {/* <ImportShops /> */}

        <a
          href={`${process?.env?.NEXT_PUBLIC_REST_API_ENDPOINT}/export-shop-orders/${convertStartDate()}/${convertEndDate()}`}
          target="_blank"
          className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none p-5"
        >
          <DownloadIcon className="text-muted-light w-10" />

          <span className="text-sm mt-4 text-center text-accent font-semibold">
            {t("Export Orders")}
          </span>
        </a>

      </div>
    </Card>
  );
};
export default ExportImportView;
