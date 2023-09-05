import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/about.vue";
import test from "../views/test.vue";
import adminchecklist from "../views/Admin_checklist.vue";
import login from "../views/login.vue";
import userchecklist from "../views/user_checklist .vue";
import App from "../App.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "test",
    component: test,
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
    path: "/user",
    name: "userchecklist",
    component: userchecklist,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
