import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap";
import Export from "../../../@core/components/common/Export/Export";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import { Button } from "bootstrap";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../@core/constants/filters/Filters";

const Comments = () => {
  const headers = ["عنوان کامنت", "امتیاز", "تاریخ", "وضعیت"];
  // RowsOfPage

  const changeSelectRowsOfPage = (SelectNumber) => {
    console.log(SelectNumber.label);
    //   dispatch(handleRowsOfPage(SelectNumber.label));
  };

  // searchQuery

  const changeSearchQuery = (searchQuery) => {
    console.log(searchQuery.target.value)
    // dispatch(handleQuery(searchQuery.target.value));
  };

  // PageNumber

  const changePageNumberPage = (pageNumber) => {
    console.log(pageNumber)
    // dispatch(handlePageNumber(pageNumber));
  };
  return (
    <Container>
      <Row>
        <Card>
          <CardHeader>
            <div className="d-flex align-items-center gap-1 mt-1">
              <div>
                <CardText>نمایش:</CardText>
              </div>
              <div>
                <SelectReact
                  SelectFilter={NumberCards}
                  changeSelect={changeSelectRowsOfPage}
                />
              </div>
            </div>
            <div className="d-flex gap-1">
              <div className="mt-2">
                <InputGroupButtons SearchQuery={changeSearchQuery} />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Export
              headers={headers}
              hasImage={false}
              //   dataMap={dataWithRatio}
              //   titleField="title"
              //   fieldKeys={["likeRatio", "insertDate"]}
              enableNavigate={false}
            />
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              <SeparatedPagination
                changePageNumber={changePageNumberPage}
                // totalCount={totalCount}
                // RowsOfPage={RowsOfPage}
              />
            </div>
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};
export default Comments;
