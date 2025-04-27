import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/UserLoginView.vue";
import UserRegisterView from "@/views/UserRegisterView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

// import AdminView from "@/views/AdminView.vue";
// import NoAuthView from "@/views/NoAuthView.vue";
// import AddQuestionView from "@/views/question/AddQuestionView.vue";
// import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
// import QuestionsView from "@/views/question/QuestionsView.vue";
// import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
// import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/about",
    name: "关于我的",
    component: AboutView,
    // meta: {
    //   access: ACCESS_ENUM.USER,
    // },
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true, // 隐藏菜单
    },
  },
];
