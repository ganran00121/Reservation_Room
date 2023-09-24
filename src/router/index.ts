import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/about.vue";
import test from "../views/test.vue";
import adminchecklist from "../views/Admin_checklist.vue";
import login from "../views/login.vue";
import userchecklist from "../views/user_checklist .vue";
import Course from "../views/Admin_Coures.vue";
import AAAA from "../views/testtype.vue";
import App from "../App.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
  {
    path: "/test",
    name: "test",
    component: test,
  },
  {
    path: "/AAAA",
    name: "AAAA",
    component: AAAA,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/admin",
    name: "adminchecklist",
    component: adminchecklist,
  },
  {
    path: "/course",
    name: "Course",
    component: Course,
  },
  {
    path: "/My_reservations",
    name: "userchecklist",
    component: userchecklist,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
