import camelcaseKeys from "camelcase-keys";
import pickBy from "lodash/pickBy";

interface PaginatorInfo {
  [key: string]: unknown;

  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  data?: any[];
}

// type PaginatorOutputType = {
//   hasMorePages: boolean;
//   nextPageUrl: string;
//   [key: string]: unknown;
// };

export const mapPaginatorData = (obj: PaginatorInfo | undefined) => {
  if (!obj) return null;
  const { data, ...formattedValues } = camelcaseKeys(obj);
  return {
    ...formattedValues,
    hasMorePages: formattedValues.lastPage !== formattedValues.currentPage,
    firstItem: formattedValues.from,
    lastItem: formattedValues.to,
  };
};

export const parseSearchString = (values: any) => {
  const parsedValues = pickBy(values);
  return Object.keys(parsedValues)
    .map((k) => {
      if (k === "type") {
        return `${k}.slug:${parsedValues[k]};`;
      }
      if (k === "category") {
        return `categories.slug:${parsedValues[k]};`;
      }
      return `${k}:${parsedValues[k]};`;
    })
    .join("")
    .slice(0, -1);
};
