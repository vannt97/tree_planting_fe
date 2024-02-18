import { DOTS, usePagination } from 'src/app/hooks/usePagination';
import style from './Pagination.module.css';

export default function Pagination(props) {
  // console.log('page: ', { limit, total, page, onPage });

  const {
    onPage: onPageChange,
    total: totalCount,
    siblingCount = 1,
    page: currentPage,
    limit: pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage !== Math.ceil(totalCount / pageSize)) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <ul className={'pagination-container'}>
      <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={onPrevious}>
        <div className="arrow left">
          <svg
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.950987 10.7751C0.46005 10.375 0.460051 9.62502 0.950987 9.22487L11.1182 0.937746C11.7715 0.405292 12.75 0.87012 12.75 1.71288L12.75 18.2871C12.75 19.1299 11.7715 19.5947 11.1182 19.0623L0.950987 10.7751Z"
              fill="#FDFDFD"
            />
          </svg>
        </div>
      </li>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={index}
            className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item`}
        // className={`pagination-item ${currentPage === lastPage ? 'disabled' : ''}`}
        // className={`pagination-item ${currentPage === lastPage ? 'disabled' : ''}`}
        onClick={onNext}
      >
        <div className="arrow right">
          <svg
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.049 9.22487C12.54 9.62502 12.54 10.375 12.049 10.7751L1.8818 19.0623C1.22855 19.5947 0.250001 19.1299 0.250001 18.2871L0.249999 1.71288C0.249998 0.870121 1.22855 0.405294 1.8818 0.937747L12.049 9.22487Z"
              fill="#FDFDFD"
            />
          </svg>
        </div>
      </li>
    </ul>
  );
}

// <div className={style.wrapper}>
// <div
//   className={style.btnPrev}
//   onClick={() => {
//     if (page !== 1) {
//       onPage(page - 1);
//     }
//   }}
// >
//   <div></div>
// </div>
// <div>{page}</div>
// <div
//   className={style.btnNext}
//   onClick={() => {
//     if (page !== Math.ceil(total / limit)) {
//       onPage(page + 1);
//     }
//   }}
// >
//   <div></div>
// </div>
// </div>
