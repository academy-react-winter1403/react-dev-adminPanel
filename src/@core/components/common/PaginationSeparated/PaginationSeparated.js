// ** Third Party Components
import ReactPaginate from "react-paginate";

const SeparatedPagination = ({changePageNumber}) => {
  const handlePagination = (pageNumber) => {
    changePageNumber(pageNumber)
  }
  return (
    <ReactPaginate
      nextLabel=""
      pageCount={10}
      breakLabel="..."
      previousLabel=""
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      pageLinkClassName="page-link"
      nextLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate"
      // onPageChange={handlePagination}
      onPageChange={({ selected }) => handlePagination(selected)}
    />
  );
};
export default SeparatedPagination;
