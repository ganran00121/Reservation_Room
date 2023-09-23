<template>
  <div
    :class="['container', isSignup ? 'right-panel-active' : '']"
    class="mb-40"
  >
    <div class="form-container sign-up-container">
      <form>
        <h1>Create Account</h1>
        <input
          v-if="form_regis.role === 'Student'"
          v-model="form_regis.user_id"
          type="number"
          name="ID"
          placeholder="ID"
        />
        <div class="flex gap-2">
          <input
            v-model="form_regis.firstname"
            type="text"
            name="name"
            placeholder="Name"
            required
          />

          <input
            v-model="form_regis.lastname"
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
          v-model="form_regis.firstname"
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

        <button @click="signup(form_regis)" type="button">SignUp</button>
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
        <button @click="login_acc(form_in)" type="button">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" @click="toggleForm('signin')">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your details and start the journey with us</p>
          <button class="ghost" @click="toggleForm('signup')">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  data() {
    const form_in = ref({
      user: "",
      pass: "",
    });
    const form_regis = ref({
      user_id: null,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      role: "Student",
    });

    return {
      isSignup: false,
      form_in,
      form_regis,
    };
  },
  methods: {
    toggleForm(formType) {
      this.isSignup = formType === "signup";
    },
    login_acc(info) {
      axios
        .post("http://localhost:3000/login", info, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          localStorage.setItem("jwtToken", response.data.token);
          console.log("POST Login request successful:", response.data);
          const token = localStorage.getItem("jwtToken");
          const decodedToken = jwt_decode(token);
          const name = decodedToken.name;
          const admin = decodedToken.admin;
          console.log("login suscess");
          console.log("Name:", name);
          console.log("Admin:", admin);
          window.location.href = "/dashbord";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    signup(info) {
      console.log("signUp");
      if (info.role === "Staff") {
        info.user_id = null;
      }
      axios
        .post("http://localhost:3000/users", info)
        .then((response) => {
          console.log("POST User request successful:", response.data);
          let login_info = {
            user: response.email,
            pass: response.firstname,
          };
          this.login_acc(login_info);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // signup() {
    // },
    // signin() {
    // },
  },
};
</script>
<style scoped>
@import "../assets/css/login.css";
</style>
