
import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Orders from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { CoreApi } from "@utils/api/core.api";
import { start } from "repl";



  export const useDateRangeQuery = (startDate: Date, endDate: Date) => {
    
    const api = new CoreApi(API_ENDPOINTS.FIND_BY_DATE_RANGE);
    const fetchDateRangeOrders = async (startDate: Date,endDate: Date) => {
    const response = await api.fetchUrl(`${API_ENDPOINTS.FIND_BY_DATE_RANGE}/${startDate}/${endDate}` );
        // // console.log('order response', response.data)
        // return response.data
        const {
          data: { data  },
        } = await Orders.all(`${API_ENDPOINTS.FIND_BY_DATE_RANGE}/${startDate}/${endDate}`);
        return { orders: { data: response.data, paginatorInfo: mapPaginatorData({ ...response.data }) } };
    };

    return useQuery(["dateRangeQuery", startDate,endDate], () => fetchDateRangeOrders(startDate,endDate));
}