// ** Third Party Components
import ReactPaginate from "react-paginate";

const SeparatedPagination = ({changePageNumber,totalCount,RowsOfPage}) => {
  const totalPages = Math.ceil(totalCount / RowsOfPage)
  console.log(totalPages)
  const handlePagination = (pageNumber) => {
    changePageNumber(pageNumber)
  }
  return (
    <ReactPaginate
      nextLabel=""
      pageCount={totalPages}
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
      onPageChange={({ selected }) => handlePagination(selected)}
      // initialPage={0}
    />
  );
};
export default SeparatedPagination;
