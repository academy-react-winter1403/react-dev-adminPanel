import { Mail, Home, Airplay, Circle, Users, Book } from "react-feather";

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
];
