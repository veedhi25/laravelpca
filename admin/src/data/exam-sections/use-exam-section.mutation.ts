import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import { useMutation } from 'react-query';
 
export const useCreateExamSectionMutation = () => {
    return useMutation((examSection) => {
      console.log('Creating exam section with data:', examSection);
      return http.post(API_ENDPOINTS.EXAM_SECTION, examSection);
    });
  };
  

export const useUpdateExamSectionMutation = () => {
    return useMutation(({sectionId, updatedSection}) => 
    {
      return http.put(`${API_ENDPOINTS.EXAM_SECTION}/${sectionId}`, updatedSection) }
      );
  };

// export const useUpdateExamSectionMutation = () => {
//     return useMutation(({ sectionId, updatedSection})
//      => { 
//       return http.put(`${API_ENDPOINTS.EXAM_SECTION}/${sectionId}`, updatedSection) });
//   };

  // export const useUpdateExamSectionMutation = () => {
  //   return useMutation(({ sectionId, updatedSection}) => {
      
  //     return http.put(`${API_ENDPOINTS.EXAM_SECTION}/${sectionId}`, updatedSection)
  //   });
  // };
  
