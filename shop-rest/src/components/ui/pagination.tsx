
import RCPagination, { PaginationProps } from "rc-pagination";
import { ArrowNextIcon } from "@components/icons/arrow-next";
import { ArrowPrevIcon } from "@components/icons/arrow-prev";
import "rc-pagination/assets/index.css";

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      nextIcon={<ArrowNextIcon />}
      prevIcon={<ArrowPrevIcon />}
      {...props}
    />
  );
};

export default Pagination;
