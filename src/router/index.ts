import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/about.vue";
import App from "../App.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
