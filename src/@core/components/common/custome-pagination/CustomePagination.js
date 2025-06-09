import ReactPaginate from "react-paginate";

const CustomPagination = ({ total, current, rowsPerPage, handleClickFunc }) => {
  const count = Number(Math.ceil(total / rowsPerPage));

  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      pageCount={count || 1}
      activeClassName="active"
      forcePage={current !== 0 ? current - 1 : 0}
      onPageChange={(page) => handleClickFunc(page)}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      containerClassName={
        "pagination react-paginate justify-content-end my-2 pe-1 w-50 flex justify-content-center"
      }
      
    />
  );
};

export default CustomPagination;
