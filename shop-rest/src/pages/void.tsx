import { useQuery } from "react-query";
import axios from "axios";


function DownloadPDF() {

 
  
  // const getCurrentTimeFromAPI = async () => {
  //   try {
  //     const response = await fetch('https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata');
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("saurav time",data); 
  //       return data.datetime;
  //     } else {
  //       throw new Error('Unable to fetch time');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching time:', error);
  //     return null;
  //   }


    
  // };
  

  // getCurrentTimeFromAPI();



  const fetchCurrentTime = async () => {
    const response = await axios.get('http://worldtimeapi.org/api/ip');
    return response.data; // Assuming the API response directly provides the time data
  };

  const { data, error } = useQuery('currentTime', fetchCurrentTime);

  console.log("time" , data)

  return (
    <div>
      <p  >Downloading PDF...</p>
    </div>
  );
}

export default DownloadPDF;
