import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, Label } from "reactstrap";
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
  createCourseSocialGroup,
  deleteCourseGroup,
  getCourseGroupWithId,
  getCourseSocialGroup,
  getGroupsData,
  getSocialGroupWithId,
  updateCourseGroup,
} from "../../../../@core/services/api";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  addDataToCourseGroupState,
  addDataToVirtualGroupsState,
  changeGroupPageNumber,
  changeGroupRowsOfPage,
  changeVirtualGroupsPageNumber,
  changeVirtualGroupsRowsOfPage,
} from "../../store/actions";
import { http } from "../../../../@core/services/interceptor";
import { updateSocialGroup } from "../../../../@core/services/api/put-api/updateSocialGroup";

const VirtualGroups = () => {
  const dispatch = useDispatch();
  const { CourseId } = useParams();
  const { virtualGroupsSlice } = useSelector((state) => state);
  const {
    virtualGroupsData,
    virtualGroupsPageNumber,
    virtualGroupsRowsOfPage,
  } = virtualGroupsSlice;
  const [searchParams, setSearchParams] = useSearchParams();
  const [teacherId, setTeacherId] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [createAndUpdateFlag, setCreateAndUpdateFlag] = useState("create");
  const [isCreateGroupFormOpen, setIsCreateGroupFormOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const headers = ["نام گروه", "لینک گروه", "اقدامات"];

  useEffect(() => {
    if (!teacherId) {
      setTeacherId(searchParams.get("teacherId"));
    }
  }, [teacherId]);

  // get groups data
  const {
    data: courseSocialGroupData,
    isLoading: getCourseSocialGroupLoading,
    refetch: getCourseSocialGroupRefetch,
  } = getCourseSocialGroup(
    "getCourseSocialGroup",
    "/CourseSocialGroup",
    CourseId
  );

  if (!getCourseSocialGroupLoading) {
    console.log("courseSocialGroupData ==>", courseSocialGroupData);
    dispatch(addDataToVirtualGroupsState(courseSocialGroupData));
  }

  const {
    data: socialGroupWithIdData,
    isLoading: getSocialGroupWithIdLoading,
    refetch: getSocialGroupWithIdRefetch,
  } = getSocialGroupWithId(
    "getSocialGroupWithId",
    `/CourseSocialGroup/${groupId}`,
    groupId ? true : false
  );

  if (!getSocialGroupWithIdLoading && socialGroupWithIdData) {
    console.log("socialGroupWithIdData ==>", socialGroupWithIdData);
    if (!formData) {
      setFormData(socialGroupWithIdData);
    }
  }

  useEffect(() => {
    if (groupId) {
      getSocialGroupWithIdRefetch();
      setFormData(null);
    }
  }, [groupId, socialGroupWithIdData]);

  // change pagination
  useEffect(() => {
    if (virtualGroupsData) {
      const data = paginationCalculator(
        virtualGroupsData,
        virtualGroupsPageNumber,
        virtualGroupsRowsOfPage
      );
      setFullData(data);
    }
  }, [virtualGroupsData, virtualGroupsPageNumber, virtualGroupsRowsOfPage]);

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

  const { mutate: createCourseSocialGroupMutate } = createCourseSocialGroup(
    "createCourseSocialGroup"
  );
  const { mutate: updateSocialGroupMutate } =
    updateSocialGroup("updateSocialGroup");
  const createGroupHandler = (values) => {
    let dataObj;
    if (createAndUpdateFlag === "create") {
      dataObj = {
        groupName: values.groupName,
        groupLink: values.groupCapacity,
        courseId: CourseId,
      };
      createCourseSocialGroupMutate(["/CourseSocialGroup", dataObj], {
        onSuccess: (data) => {
          toast.success(data.message);
          getCourseSocialGroupRefetch();
          setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
        },
      });
    }
    if (createAndUpdateFlag === "update") {
      dataObj = {
        groupName: values.groupName,
        groupLink: values.groupCapacity,
        courseId: CourseId,
        id: groupId,
      };
      console.log("dataObj ==>", dataObj);
      updateSocialGroupMutate(["/CourseSocialGroup", dataObj], {
        onSuccess: (data) => {
          toast.success(data.message);
          getCourseSocialGroupRefetch();
          setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
        },
      });
    }
    console.log("values ==>", values);
  };

  useEffect(() => {
    // if (groupId) {
      setFormData(null);
    // }
  }, [groupId])

  const btnClickHandler = (item) => {
    console.log("item ==>", item);
    setGroupId(item.id);
    setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
    setCreateAndUpdateFlag("update");
    // setFormData(null);
  };

  return (
    <Card>
      <CardBody className="p-0">
        <UserTable
          btnContentText={"افزودن گروه"}
          addBtnClick={() => {
            setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
            setFormData(null);
            setCreateAndUpdateFlag("create");
          }}
          inputOptionClick={(option) =>
            dispatch(changeVirtualGroupsRowsOfPage(option.label))
          }
        />
        {fullData && (
          <Export
            headers={headers}
            dataMap={fullData}
            titleField="groupName"
            fieldKeys={["groupLink"]}
            Btn={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <h5>ویرایش</h5>
                <Edit size={15} />
              </div>
            }
            hasImage={true}
            btnOnClick={btnClickHandler}
            btnKeys={{ flag: false }}
          />
        )}
        <SeparatedPagination
          RowsOfPage={virtualGroupsRowsOfPage}
          PageNumber={virtualGroupsPageNumber}
          totalCount={virtualGroupsData?.length}
          changePageNumber={(pageNum) =>
            dispatch(changeVirtualGroupsPageNumber(pageNum))
          }
        />
        <CreateGroupFormModal
          title={"ایجاد گروه جدید"}
          inputNamePlaceholder={"نام گروه"}
          inputCapacityPlaceholder={"ظرفیت گروه"}
          isOpen={isCreateGroupFormOpen}
          toggle={() => {
            setIsCreateGroupFormOpen(!isCreateGroupFormOpen);
            setFormData(null);
          }}
          submitHandle={createGroupHandler}
          formData={formData && formData}
          titleField={"groupName"}
          capacityField={"groupLink"}
          inputType={"text"}
        />
      </CardBody>
    </Card>
  );
};

export default VirtualGroups;
