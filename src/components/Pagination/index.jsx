import { useContext } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({onChangePage, currentPage}) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div> 
  )
}

export default Pagination;
