<template>
    <div :class="['container', isSignup ? 'right-panel-active' : '']">
      <div class="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <input type="text" name="ID" placeholder="ID" />
          <div class="flex gap-2">
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="lastname" placeholder="LastName" required />
          </div>
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="tel" name="Phone" placeholder="Phone" required />
          <div class="flex items-center space-x-6">
            <div class="flex items-center">
              <input
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
  
          <button @click="signup">SignUp</button>
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
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <a href="#">Forgot Your Password</a>
          <button @click="signin">Sign In</button>
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
  export default {
    data() {
      return {
        isSignup: false,
      };
    },
    methods: {
      toggleForm(formType) {
        this.isSignup = formType === "signup";
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
  