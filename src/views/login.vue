<template>
  <div
    :class="['container', isSignup ? 'right-panel-active' : '']"
    class="mb-80"
  >
    <div class="form-container sign-up-container">
      <form>
        <h1>Create Account</h1>
        <input
          v-if="form_regis.role === 'Student'"
          v-model="form_regis.college_id"
          type="number"
          name="ID"
          placeholder="ID"
        />
        <div class="flex gap-2">
          <input
            v-model="form_regis.first_name"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <input
            v-model="form_regis.last_name"
            type="text"
            name="lastname"
            placeholder="LastName"
            required
          />
        </div>
        <input
          v-model="form_regis.email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          v-model="form_regis.password"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          v-model="form_regis.phone"
          type="tel"
          name="Phone"
          placeholder="Phone"
          required
        />
        <div class="flex items-center space-x-6">
          <div class="flex items-center">
            <input
              value="Student"
              v-model="form_regis.role"
              type="radio"
              name="radio1"
              id="radioButton1"
              class="h-5 w-5"
            />
            <label
              for="radioButton1"
              class="pl-3 text-base font-medium text-[#07074D]"
            >
              Student
            </label>
          </div>
          <div class="flex items-center">
            <input
              value="Staff"
              v-model="form_regis.role"
              type="radio"
              name="radio1"
              id="radioButton2"
              class="h-5 w-5"
            />
            <label
              for="radioButton2"
              class="pl-3 text-base font-medium text-[#07074D]"
            >
              Staff
            </label>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            v-if="isSmallScreen"
            class="ghost-in-sm hover:text-blue-500 w-5/12"
            @click="toggleForm('signin')"
          >
            Sign In
          </button>
          <button
            class="hover:border-blue-500 hover:text-blue-500 hover:bg-transparent 5/12 m-1"
            @click="signup(form_regis)"
            type="button"
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form>
        <h1>Sign In</h1>
        <div class="social-container">
          <!-- <a href="#" class="social"><FaFacebookF /></a>
            <a href="#" class="social"><FaGoogle /></a>
            <a href="#" class="social"><FaTwitter /></a> -->
        </div>
        <!-- <span class="text-xs">or use your account</span> -->
        <input
          type="email"
          name="email"
          v-model="form_in.user"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          v-model="form_in.pass"
          placeholder="Password"
        />
        <a href="#">Forgot Your Password</a>
        <p v-if="login_false" class="text-red-500 py-3 sm:m-0">
          incorrect username or password.<br />
          please try again
        </p>
        <button
          class="hover:border-blue-500 hover:text-blue-500 hover:bg-transparent"
          @click="login_acc(form_in)"
          type="button"
        >
          Sign In
        </button>
        <button
          type="button"
          v-if="isSmallScreen"
          class="ghost-up-sm hover:text-indigo-500"
          @click="toggleForm('signup')"
        >
          Sign Up
        </button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button
            class="ghost hover:text-blue-500"
            @click="toggleForm('signin')"
          >
            Sign In
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your details and start the journey with us</p>
          <button
            class="ghost-up hover:text-indigo-500"
            @click="toggleForm('signup')"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  data() {
    const login_false = ref(false); // show login false
    const form_in = ref({
      user: "",
      pass: "",
    });
    const form_regis = ref({
      college_id: null,
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      phone: "",
      role: "Student",
    });

    return {
      login_false,
      isSignup: false,
      form_in,
      form_regis,
      isSmallScreen: false,
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth <= 768;
    },
    toggleForm(formType) {
      this.isSignup = formType === "signup";
    },
    login_acc(info) {
      axios
        .post("http://localhost:3000/api/login", info, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          localStorage.setItem("jwtToken", response.data.token);
          const token = localStorage.getItem("jwtToken");
          const decodedToken = jwt_decode(token);
          const name = decodedToken.name;
          const admin = decodedToken.admin;
          Swal.fire({
            title: "Sign In",
            text: "Sign In success.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/dashboard";
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Sign in false !",
            text: "incorrect username or password. please try again",
            footer: " ",
          });
          this.login_false = true;
        });
    },

    signup(info) {
      if (info.role === "Staff") {
        info.college_id = null;
      }
      axios
        .post("http://localhost:3000/api/users/add", info)
        .then((response) => {
          (this.form_in.user = response.data.email),
            (this.form_in.pass = response.data.password),
            console.log("AAAAA");
          this.login_acc(this.form_in);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Sign up false !",
            text: '"Student" or "email" is already in use.',
            footer: " ",
          });
        });
    },
  },
};
</script>
<style scoped>
@import "../assets/css/login.css";
</style>
