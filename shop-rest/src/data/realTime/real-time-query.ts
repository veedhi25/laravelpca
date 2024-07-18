import { API_ENDPOINTS } from "@utils/api/endpoints";
import axios from "axios";
import http from "@utils/api/http";
import { useQuery } from "react-query";


export const useRealTime =  () =>
{
  return useQuery("eraltime" ,  () => http.get(API_ENDPOINTS.REAL_TIME))
}

