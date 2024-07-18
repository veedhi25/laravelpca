import { useQuery } from 'react-query';
import http from '@utils/api/http';
import { API_ENDPOINTS } from '@utils/api/endpoints';

const fetchExamQuestions = async (sectionId?: string, tagId?: string, questionTypeId?: string) => {
    let endpoint = `${API_ENDPOINTS.EXAM_QUESTIONS_SEARCH}`;
    const params = new URLSearchParams();

    if (sectionId) {
        params.append('section_id', sectionId);
    }
    if (tagId) {
        params.append('tag_id', tagId);
    }
    if (questionTypeId) {
        params.append('question_type_id', questionTypeId);
    }

    if (params.toString()) {
        endpoint += `?${params.toString()}`;
    }

    const { data } = await http.post(endpoint);
    return data;
};



export const useExamQuestionSearchQuery = (searchParams: { sectionId?: string, tagId?: string, questionTypeId?: string }) => {
    return useQuery(
        ['exam_questions_search', searchParams],
        () => fetchExamQuestions(searchParams.sectionId, searchParams.tagId, searchParams.questionTypeId),
        {
            enabled: !!searchParams.sectionId || !!searchParams.tagId || !!searchParams.questionTypeId,
        }
    );
};

