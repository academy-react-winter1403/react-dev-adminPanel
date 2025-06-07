import {
  Mail,
  Home,
  Airplay,
  Circle,
  Users,
  Book,
  FileText,
  BookOpen,
  Calendar
} from "react-feather";

export default [
  {
    id: "dashboard",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "smaplePage",
    title: "مدیریت کاربران",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "userListPage",
        title: "لیست کاربران",
        icon: <Circle size={20} />,
        navLink: "/user-list",
      },
      {
        id: "jobHistory",
        title: "سوابق شغلی کاربران",
        icon: <Circle size={20} />,
        navLink: "/job",
      },
    ],
  },
  {
    id: "blogManagement",
    title: "مدیریت اخبار و مقالات",
    icon: <Book size={20} />,
    children: [
      {
        id: "blogList",
        title: "لیست اخبار و مقالات",
        icon: <Circle size={20} />,
        navLink: "/blogs",
      },
      {
        id: "createBlog",
        title: "افزودن اخبار و مقالات",
        icon: <Circle size={20} />,
        navLink: "/createBlog",
      },
      {
        id: "blogCategories",
        title: "مدیریت دسته بندی اخبار ",
        icon: <Circle size={20} />,
        navLink: "/blogCategories",
      },
    ],
  },
  {
    id: "CourseManagement",
    title: "مدیریت دوره ها",
    icon: <BookOpen size={20} />,
    navLink: "CourseManagement",
    children: [
      {
        id: "CourseList",
        title: "لیست دوره ها",
        icon: <Circle size={20} />,
        navLink: "/Course",
      },
      {
        id: "createCourse",
        title: "افزودن دوره ها",
        icon: <Circle size={20} />,
        navLink: "/createCourse",
      },
      {
        id: "courseTechnologiManager",
        title: "مدیریت تکنولوژی دوره ها",
        icon: <Circle size={20} />,
        navLink: "/courseTechnologiManager",
      },
      {
        id: "courseStatusManager",
        title: "مدیریت وضعیت دوره ها",
        icon: <Circle size={20} />,
        navLink: "/courseStatusManager",
      },
      {
        id: "courseLevelManager",
        title: "مدیریت سطح دوره ها",
        icon: <Circle size={20} />,
        navLink: "/courseLevelManager",
      },
      {
        id: "classesList",
        title: " لیست کلاس ها ",
        icon: <Circle size={20} />,
        navLink: "/classesList",
      },
      {
        id: "ListOfSections",
        title: " لیست بخش ها  ",
        icon: <Circle size={20} />,
        navLink: "/ListOfSections",
      },
      {
        id: "termList",
        title: " لیست  ترم ها  ",
        icon: <Circle size={20} />,
        navLink: "/termList",
      },
      {
        id: "userList",
        title: "لیست کاربران دوره",
        icon: <Circle size={20} />,
        navLink: "/userList",
      },
    ],
  },
  {
    id: "timeFrameManagement",
    title: "مدیریت زمان بندی",
    icon: <Calendar size={20} />,
    navLink: "/timeFrameManagement",
    children: [
      {
        id: "teacherSchedule",
        title: "زمان بندی شما",
        icon: <Circle size={20} />,
        navLink: "/teacherSchedule",
      },
      {
        id: "adminSchedule",
        title: "زمان بندی شما",
        icon: <Circle size={20} />,
        navLink: "/adminSchedule",
      },
      {
        id: "studentSchedule",
        title: "زمان بندی شما",
        icon: <Circle size={20} />,
        navLink: "/studentSchedule",
      },
    ],
  },
  {
    id: "tasksManagement",
    title: "مدیریت تسک ها",
    icon: <BookOpen size={20} />,
    navLink: "CourseManagement",
    children: [
      {
        id: "tasks",
        title: "تسک ها",
        icon: <Circle size={20} />,
        navLink: "/tasks",
      },
      {
        id: "createTasks",
        title: "افزودن تسک",
        icon: <Circle size={20} />,
        navLink: "/createTasks",
      },
    ],
  },
  {
    id: "Comments",
    title: "مدیریت کامنت ها",
    icon: <FileText size={20} />,
    navLink: "/listComments",
  },
];
