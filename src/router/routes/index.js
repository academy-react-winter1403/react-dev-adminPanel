// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import CourseDetails from "../../view/courseManagement/view/CourseDetails";
import TableFilter from "../../@core/components/common/Filter/TableFilter";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const UserList = lazy(() => import("../../pages/UserList"));
const UserView = lazy(() => import("../../view/user/view/index"));
const CareerRecords = lazy(() => import("../../view/user/view/CareerRecords"));
const BlogManagement = lazy(() =>
  import("../../view/news/list/BlogManagement")
);
const AddCatgory = lazy(() =>
  import("../../view/news/addCatgory/list/AddCatgory")
);
const NewsDetails = lazy(() =>
  import("./../../view/news/NewsDetails/list/NewsDetails")
);
const AddNews = lazy(() => import("../../view/news/addNews/list/AddNews"));
const Comments = lazy(() => import("../../view/comments/list/Comments"));

const Dashboard = lazy(() => import("../../view/dashboard/index"));

const CourseManagement = lazy(() =>
  import("../../view/courseManagement/view/CourseManagement")
);
const CreateCourse = lazy(() =>
  import("../../view/courseManagement/view/CreateCourse")
);
const ClassesListWrapper = lazy(() =>
  import("../../view/courseManagement/view/ClassesListWrapper")
);
const ListOfSectionsWrapper = lazy(() =>
  import("../../view/courseManagement/view/ListOfSectionsWrapper")
);
const TermListWrapper = lazy(() =>
  import("../../view/courseManagement/view/TermListWrapper")
);
const CourseTehcnologiManagerWrapper = lazy(() =>
  import("../../view/courseManagement/view/CourseTehcnologiManagerWrapper")
);
const CourseStatusManagerWrapper = lazy(() =>
  import("../../view/courseManagement/view/CourseStatusManagerWrapper")
);
const CourseLevelManagerWrapper = lazy(() =>
  import("../../view/courseManagement/view/CourseLevelManagerWrapper")
);
const TasksWrapper = lazy(() => import("../../view/courseManagement/view/TasksWrapper"))
const CreateTasks = lazy(() => import("../../view/courseManagement/list/CreateTasks"))
const UserListWrapper = lazy(() => import("../../view/courseManagement/view/UserListWrapper"))
const TeacherScheduleWrapper = lazy(() => import("../../view/scheduleManagement/view/teacherScheduleWrpper"))
const StudentShceduleWrapper = lazy(() => import("../../view/scheduleManagement/view/studentScheduleWrapper"))
const AdminScheduleWrapper = lazy(() => import("../../view/scheduleManagement/view/AdminScheduleWrapper"))



// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/blogs",
    element: <BlogManagement />,
  },
  {
    path: "/createBlog",
    element: <AddNews />,
  },
  {
    path: "/blogCategories",
    element: <AddCatgory />,
  },
  {
    path: "/blogs/view/:id",
    element: <NewsDetails />,
  },
  {
    path: "/Course",
    element: <CourseManagement />,
  },
  {
    path: "/Course/Details/:CourseId",
    element: <CourseDetails />,
  },
  {
    path: "/createCourse",
    element: <CreateCourse />,
  },

  {
    path: "/courseTechnologiManager",
    element: <CourseTehcnologiManagerWrapper />,
  },
  {
    path: "/courseStatusManager",
    element: <CourseStatusManagerWrapper />,
  },
  {
    path: "/courseLevelManager",
    element: <CourseLevelManagerWrapper />,
  },
  {
    path: "/classesList",
    element: <ClassesListWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/ListOfSections",
    element: <ListOfSectionsWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/termList",
    element: <TermListWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/userList",
    element: <UserListWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/teacherSchedule",
    element: <TeacherScheduleWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/studentSchedule",
    element: <StudentShceduleWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/adminSchedule",
    element: <AdminScheduleWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/tasks",
    element: <TasksWrapper />,
    access: ["Administrator"],
  },
  {
    path: "/createTasks",
    element: <CreateTasks />,
    access: ["Administrator"],
  },
  { path: "/listComments", element: <Comments /> },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/user-list",
    element: <UserList />,
    access: ["Administrator"],
    // meta: {
    //   layout: "blank",
    // },
  },
  {
    path: "/user/view/:id",
    element: <UserView />,
    access: ["Administrator"],
    // meta: {
    //   layout: "blank",
    // },
  },
  {
    path: "/job",
    element: <CareerRecords />,
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
