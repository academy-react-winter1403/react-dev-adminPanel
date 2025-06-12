import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody } from "reactstrap";
import Export from "../../../../@core/components/common/Export/Export";
import ButtonAction from "../../../../@core/components/common/ButtonAction/ButtonAction";
import { Edit, Trash } from "react-feather";
import { useEffect, useState } from "react";
import { paginationCalculator } from "../../../../@core/hooks";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import UserTable from "../../../user/list/UserTable";
import CreateGroupFormModal from "./CreateGroupFormModal";
import {
  createCourseGroupPost,
  deleteCourseGroup,
  getCourseGroupWithId,
  getGroupsData,
  updateCourseGroup,
} from "../../../../@core/services/api";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  addDataToCourseGroupState,
  changeGroupPageNumber,
  changeGroupRowsOfPage,
} from "../../store/actions";
import { http } from "../../../../@core/services/interceptor";

const Groups = () => {
  const dispatch = useDispatch();
  const { CourseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [teacherId, setTeacherId] = useState(null);
  const { courseGroupSlice, allDataCourseSlice } = useSelector(
    (state) => state
  );
  const { courseGroupData, groupQuery } = courseGroupSlice;
  const { PageNumber, RowsOfPage } = groupQuery;
  const [fullData, setFullData] = useState(null);
  const [isCreateGroupFormOpen, setIsCreateGroupFormOpen] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [createAndUpdateAndDeleteFlag, setCreateAndUpdateAndDeleteFlag] =
    useState("create");

  const headers = ["نام گروه", "نام مدرس", "ظرفیت", "اقدامات"];

  useEffect(() => {
    if (!teacherId) {
      setTeacherId(searchParams.get("teacherId"));
    }
  }, [teacherId]);

  // get groups data
  const {
    data: groupsData,
    isLoading: getGroupsDataLoading,
    refetch: refetchGroupsData,
  } = getGroupsData(
    "getGroupsData",
    "/CourseGroup/GetCourseGroup",
    {
      TeacherId: teacherId,
      CourseId: CourseId,
    },
    CourseId && teacherId ? true : false
  );

  useEffect(() => {
    if (CourseId && teacherId) {
      refetchGroupsData();
    }
  }, [CourseId, teacherId]);

  if (!getGroupsDataLoading) {
    console.log("groupsData ==>", groupsData);
    dispatch(addDataToCourseGroupState(groupsData));
  }

  const btnActionData = [
    {
      title: "ویرایش",
      icon: <Edit size={15} />,
      color: "primary",
    },
    {
      title: "حذف",
      icon: <Trash size={15} />,
      color: "danger",
    },
  ];

  useEffect(() => {
    if (courseGroupData) {
      const data = paginationCalculator(
        courseGroupData,
        PageNumber,
        RowsOfPage
      );
      setFullData(data);
    }
  }, [courseGroupData, PageNumber, RowsOfPage]);

  const { mutate: createCourseGroupMutate } = createCourseGroupPost(
    "createCourseGroupPost"
  );
  const { mutate: updateCourseGroupMutate } =
    updateCourseGroup("updateCourseGroup");
  // const { mutate: deleteCourseGroupMutate } = deleteCourseGroup("deleteCourseGroup")

  const createGroupHandler = (values) => {
    const formData = new FormData();
    formData.append("GroupName", values.groupName);
    formData.append("CourseId", CourseId);
    formData.append("GroupCapacity", values.groupCapacity);
    if (createAndUpdateAndDeleteFlag === "create") {
      createCourseGroupMutate(["/CourseGroup", formData], {
        onSuccess: (data) => {
          console.log("full created😍😍😍😍😍 ...", data);
          toast.success(data.message);
          setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
          refetchGroupsData();
        },
      });
    }
    if (createAndUpdateAndDeleteFlag === "update") {
      formData.append("Id", groupId);
      console.log("formData ==>", formData);
      updateCourseGroupMutate(["/CourseGroup", formData], {
        onSuccess: (data) => {
          console.log("full updated😍😍😍😍😍 ...", data);
          toast.success(data.message);
          setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
          refetchGroupsData();
        },
      });
    }
  };

  const btnClickHandler = (item) => {
    console.log("item ==>", item);
    setGroupId(item.groupId);
  };

  const {
    data: courseGroupWithIdData,
    isLoading: getCourseGroupWithIdLoading,
    refetch: refetchCourseGroupWithId,
  } = getCourseGroupWithId(
    "getCourseGroupWithId",
    "/CourseGroup/Details",
    {
      Id: groupId,
    },
    groupId ? true : false
  );

  useEffect(() => {
    if (groupId) {
      refetchCourseGroupWithId();
    }
  }, [groupId]);

  const { mutate: deleteCourseGroupMutate } =
    deleteCourseGroup("deleteCourseGroup");
  const editeOrDeleteBtnClickHandler = (item) => {
    console.log("item ==>", item);
    // setGroupId(item.groupId)
    if (item.title === "ویرایش") {
      setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
      setCreateAndUpdateAndDeleteFlag("update");
    }
    if (item.title === "حذف") {
      setCreateAndUpdateAndDeleteFlag("delete");
      const formData = new FormData();
      formData.append("Id", Number(groupId));
      deleteCourseGroupMutate(["/CourseGroup", formData], {
        onSuccess: (data) => {
          console.log("full deleted😍😍😍😍😍 ...", data);
          toast.success(data.message);
          refetchGroupsData();
        },
        onError: (error) => {
          console.log("error ==>", error);
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <Card>
      <CardBody className="p-0">
        <UserTable
          btnContentText={"افزودن گروه"}
          addBtnClick={() => {
            setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
            setFormData(null);
          }}
          inputOptionClick={(option) =>
            dispatch(changeGroupRowsOfPage(option.label))
          }
        />
        {fullData && (
          <Export
            headers={headers}
            dataMap={fullData}
            titleField="groupName"
            fieldKeys={["teacherName", "groupCapacity"]}
            Btn={
              <ButtonAction
                dataArray={btnActionData}
                itemClickHandle={editeOrDeleteBtnClickHandler}
              />
            }
            btnOnClick={btnClickHandler}
            btnKeys={{ flag: false }}
          />
        )}
        <SeparatedPagination
          RowsOfPage={RowsOfPage}
          PageNumber={PageNumber}
          totalCount={courseGroupData?.length}
          changePageNumber={(pageNum) =>
            dispatch(changeGroupPageNumber(pageNum))
          }
        />
        <CreateGroupFormModal
          title={"ایجاد گروه جدید"}
          inputNamePlaceholder={"نام گروه"}
          inputCapacityPlaceholder={"ظرفیت گروه"}
          isOpen={isCreateGroupFormOpen}
          toggle={() => setIsCreateGroupFormOpen(!isCreateGroupFormOpen)}
          submitHandle={createGroupHandler}
          formData={
            courseGroupWithIdData ? courseGroupWithIdData.courseGroupDto : null
          }
          titleField={"groupName"}
          capacityField={"groupCapacity"}
          inputType={"number"}
        />
      </CardBody>
    </Card>
  );
};

export default Groups;
