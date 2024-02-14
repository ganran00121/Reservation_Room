import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ref } from "vue";
import jwt_decode from "jwt-decode";
import dashboard from "../views/Dashboard/Dashboard.vue";
import adminchecklist from "../views/Admin/Grant_Deny.vue";
import login from "../views/OAuth/login.vue";
import ReservationHistory from "../views/User/ReservationHistory.vue";
import Course from "../views/Admin/Course.vue";
import Getstart from "../views/Dashboard/Getstart.vue";
import not_found from "../views/Pages/404.vue";
import App from "../App.vue";


//Navigation Guard
const token_user = ref(false);
const decodedToken = ref(null);
const name = ref('');
const admin = ref(false);

const token = localStorage.getItem("jwtToken");

if (token) {
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
    name: "ReservationHistory",
    component: ReservationHistory,
  },
  {
    path: "/404",
    name: "not_found",
    component: not_found,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !token_user.value) {
    next({ name: 'login' });
  } else if (to.meta.requiresAdmin && !admin.value) {
    next({ name: 'not_found' }); 
  } else {
    next(); 
  }
});

export default router;
