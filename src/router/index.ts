import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/about.vue";
import test from "../views/test.vue";
import checklist from "../views/Admin_checklist.vue";
import login from "../views/login.vue";
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
    path: "/checklist",
    name: "checklist",
    component: checklist,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
