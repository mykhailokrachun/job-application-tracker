import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    if (page !== numOfPages) {
      dispatch(changePage(page + 1));
    } else {
      dispatch(changePage(1));
    }
  };
  const prevPage = () => {
    if (page === 1) {
      dispatch(changePage(numOfPages));
    } else {
      dispatch(changePage(page - 1));
    }
  };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type='button' className='next-btn' onClick={nextPage}>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
