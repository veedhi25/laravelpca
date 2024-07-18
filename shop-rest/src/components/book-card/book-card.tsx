import { DownloadIcon } from "@components/icons/download-icon";

const BookCard = ({ data, coverPhoto }) => {

  // const handleDownload = (pdfUrl) => {

  // fetch(pdfUrl)
  //     .then((response) => response.blob())
  //      .then((blob)=>{
  //       const blobURL = window.URL.createObjectURL(new Blob([blob]))
  //       const fileName = pdfUrl.split("/").pop();
  //       const aTag = document.createElement("a");
  //       aTag.href = blobURL;
  //       aTag.setAttribute("download" , fileName);
  //       document.body.appendChild(aTag);
  //       aTag.click();
  //       aTag.remove();

  //      }) 
  // }  

  const pdfUrl = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${data?.pdf_url}`;
  // const pdfUrl = `https://www.tipsforsuccess.org/wp-content/uploads/2022/03/Name-Your-Product-Workbook.pdf`;
  return (
    <div className="flex flex-col h-[280px] w-[230px] hover:shadow-2xl hover:-translate-y-0.5 duration-150 rounded-xl pb-2 items-center bg-[#e5e5e5]">
      <div>
        <img src={coverPhoto} className="h-40 w-[232px] rounded-t-xl" />
      </div>
      <div className="font-semibold text-lg mt-2">{data?.name}</div>
      <div>Author: {data?.author_name}</div>
      <div className="mt-auto self-end cursor-pointer mr-2">
        <a href={pdfUrl} download="book" target="_blank" >
          {/* <DownloadIcon onClick={() => handleDownload(pdfUrl)} style={{ height: '40px', width: '40px', color: 'green' }} /> */}
          <DownloadIcon  style={{ height: '40px', width: '40px', color: 'green' }} />
        </a>
      </div>
    </div>
  );
}

export default BookCard;
