import { QueryParamsType, TagsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { TagPaginator } from "@ts-types/generated";

const fetchTags = async (): Promise<{ tags: TagPaginator }> => {
  const page = 1; // Default or constant value
  const text = ''; // Default or constant value
  const type = ''; // Default or constant value
  const limit = 15; // Default or constant value
  const orderBy = "updated_at"; // Default or constant value
  const sortedBy = "DESC"; // Default or constant value

  const searchString = stringifySearchQuery({
    name: text,
    type,
  });
  const url = `${API_ENDPOINTS.TAGS}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Tag.all(url);
  return {
    tags: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useTagsQuery = () => {
  return useQuery<{ tags: TagPaginator }, Error>(
    [API_ENDPOINTS.TAGS],
    fetchTags,
    {
      keepPreviousData: true,
    }
  );
};

export { useTagsQuery, fetchTags };

 
