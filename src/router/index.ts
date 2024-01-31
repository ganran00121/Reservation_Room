import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ref } from "vue";
import jwt_decode from "jwt-decode";
import dashboard from "../views/Dashboard.vue";
import adminchecklist from "../views/Admin_checklist.vue";
import login from "../views/login.vue";
import userchecklist from "../views/Myreq.vue";
import Course from "../views/Coures.vue";
import AAAA from "../views/testtype.vue";
import Getstart from "../views/Getstart.vue";
import index_test from "../views/testing/index.vue";
import review from "../views/testing/Review.vue";
import map from "../views/testing/Map.vue";
import home from "../views/testing/home.vue";
import App from "../App.vue";

const token_user = ref(false);
const decodedToken = ref(null);
const name = ref('');
const admin = ref(false);

// ดึง Token จาก localStorage
const token = localStorage.getItem("jwtToken");

if (token) {
  // ถ้ามี Token
  token_user.value = true;
  decodedToken.value = jwt_decode(token);
  name.value = decodedToken.value.first_name;

  if (decodedToken.value.role === 'admin') {
    admin.value = true;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Getstart",
    component: Getstart,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
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
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/course",
    name: "Course",
    component: Course,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/My_reservations",
    name: "userchecklist",
    component: userchecklist,
  },
  {
    path: "/index",
    name: "index_test",
    component: index_test,
  },
  {
    path: "/map",
    name: "map",
    component: map,
  },
  {
    path: "/review",
    name: "review",
    component: review,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !token_user.value) {
    next({ name: 'login' });
  } else if (to.meta.requiresAdmin && !admin.value) {
    next({ name: 'dashboard' }); 
  } else {
    next(); 
  }
});

export default router;
