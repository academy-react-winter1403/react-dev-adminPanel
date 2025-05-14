import ReactPaginate from "react-paginate";

const CustomPagination = () => {
//   const count = Number(Math.ceil(store.total / rowsPerPage));

  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      pageCount={10 || 1}
      activeClassName="active"
      forcePage={10 !== 0 ? 5 - 1 : 0}
      onPageChange={(page) => handlePagination(page)}
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
