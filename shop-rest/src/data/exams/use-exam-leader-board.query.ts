import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

export const fetchLeaderBoardData = async (User_id : any  , isMock : number , limit : number ) =>
{
   const {data} =  await http.get(`${API_ENDPOINTS.LEADER_BOARD}/${User_id}?limit=${limit}&isMock=${isMock} `)
   return data

}

export const useLeaderBoardQuery = (User_id : any , isMock : number = 0 , limit : number = 5 )=>
{
    return useQuery(['leadboard' , User_id , isMock , limit] , () => fetchLeaderBoardData(User_id , isMock, limit))
}
