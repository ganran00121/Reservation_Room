<template>
  <div class="flex h-screen">
    <div class="flex bg-gray-900">
      <!-- Backdrop /-->
      <div class="fixed inset-0 z-30 transition-opacity bg-black opacity-50 xl:hidden"
        :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"></div>
      <!-- End Backdrop -->
      <div :class="isOpen
          ? 'translate-x-0 xl:translate-x-0 xl:static xl:inset-0 '
          : '-translate-x-full  lg:left-24 lg:relative lg:w-24'
        "
        class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-400 transform bg-gray-900 overflow-x-hidden">
        <div class="flex items-center justify-center mt-8">
          <div class="flex items-center">
            <img
              src="data:image/png;base64,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"
              class="rounded-full w-14 my-auto py-auto" :class="isOpen ? 'w-24 h-24' : ''" alt="" />

            <!-- <span class="mx-2 text-2xl font-semibold text-white">IOT Dashboard</span> -->
          </div>
        </div>

        <nav class="p-5 mx-auto">
          <a class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            to="/">
            <svg width="21" height="20" :class="isOpen ? '' : 'mx-auto'" viewBox="0 0 21 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.9432 10.331L10.9432 0.331026C10.5642 -0.0909736 9.83618 -0.0909736 9.45718 0.331026L0.457179 10.331C0.327635 10.4746 0.242604 10.6528 0.212423 10.8438C0.182243 11.0348 0.208214 11.2305 0.287179 11.407C0.447179 11.768 0.805179 12 1.20018 12H3.20018V19C3.20018 19.2652 3.30554 19.5196 3.49307 19.7071C3.68061 19.8947 3.93496 20 4.20018 20H7.20018C7.4654 20 7.71975 19.8947 7.90729 19.7071C8.09482 19.5196 8.20018 19.2652 8.20018 19V15H12.2002V19C12.2002 19.2652 12.3055 19.5196 12.4931 19.7071C12.6806 19.8947 12.935 20 13.2002 20H16.2002C16.4654 20 16.7198 19.8947 16.9073 19.7071C17.0948 19.5196 17.2002 19.2652 17.2002 19V12H19.2002C19.3938 12.0009 19.5836 11.9453 19.7462 11.8402C19.9089 11.735 20.0374 11.5848 20.1162 11.4079C20.1949 11.231 20.2205 11.035 20.1898 10.8438C20.1591 10.6525 20.0734 10.4744 19.9432 10.331Z"
                fill="currentColor" />
            </svg>

            <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Dashboard</span>
          </a>

          <div>
            <a class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/">
              <svg width="19" height="18" viewBox="0 0 19 18" :class="isOpen ? '' : 'mx-auto'" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.2002 0H1.2002C0.934979 0 0.680625 0.105357 0.493088 0.292893C0.305552 0.48043 0.200195 0.734784 0.200195 1V7C0.200195 7.26522 0.305552 7.51957 0.493088 7.70711C0.680625 7.89464 0.934979 8 1.2002 8H7.2002C7.46541 8 7.71977 7.89464 7.9073 7.70711C8.09484 7.51957 8.2002 7.26522 8.2002 7V1C8.2002 0.734784 8.09484 0.48043 7.9073 0.292893C7.71977 0.105357 7.46541 0 7.2002 0ZM17.2002 0H11.2002C10.935 0 10.6806 0.105357 10.4931 0.292893C10.3056 0.48043 10.2002 0.734784 10.2002 1V7C10.2002 7.26522 10.3056 7.51957 10.4931 7.70711C10.6806 7.89464 10.935 8 11.2002 8H17.2002C17.4654 8 17.7198 7.89464 17.9073 7.70711C18.0948 7.51957 18.2002 7.26522 18.2002 7V1C18.2002 0.734784 18.0948 0.48043 17.9073 0.292893C17.7198 0.105357 17.4654 0 17.2002 0ZM7.2002 10H1.2002C0.934979 10 0.680625 10.1054 0.493088 10.2929C0.305552 10.4804 0.200195 10.7348 0.200195 11V17C0.200195 17.2652 0.305552 17.5196 0.493088 17.7071C0.680625 17.8946 0.934979 18 1.2002 18H7.2002C7.46541 18 7.71977 17.8946 7.9073 17.7071C8.09484 17.5196 8.2002 17.2652 8.2002 17V11C8.2002 10.7348 8.09484 10.4804 7.9073 10.2929C7.71977 10.1054 7.46541 10 7.2002 10ZM15.2002 11H13.2002V13H11.2002V15H13.2002V17H15.2002V15H17.2002V13H15.2002V11Z"
                  fill="currentColor" />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Station Group</span>
            </a>
            <a class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/">
              <svg class="w-5 h-5" :class="isOpen ? '' : 'mx-auto'" fill="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Nofitication</span>
            </a>
            <a class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/">
              <svg class="w-5 h-5" :class="isOpen ? '' : 'mx-auto'" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M0.333618 8.99996C0.333618 9.22097 0.421416 9.43293 0.577696 9.58922C0.733976 9.7455 0.945938 9.83329 1.16695 9.83329H7.49195L5.57528 11.7416C5.49718 11.8191 5.43518 11.9113 5.39287 12.0128C5.35057 12.1144 5.32879 12.2233 5.32879 12.3333C5.32879 12.4433 5.35057 12.5522 5.39287 12.6538C5.43518 12.7553 5.49718 12.8475 5.57528 12.925C5.65275 13.0031 5.74492 13.0651 5.84647 13.1074C5.94802 13.1497 6.05694 13.1715 6.16695 13.1715C6.27696 13.1715 6.38588 13.1497 6.48743 13.1074C6.58898 13.0651 6.68115 13.0031 6.75862 12.925L10.0919 9.59163C10.1678 9.51237 10.2273 9.41892 10.2669 9.31663C10.3503 9.11374 10.3503 8.88618 10.2669 8.68329C10.2273 8.581 10.1678 8.48755 10.0919 8.40829L6.75862 5.07496C6.68092 4.99726 6.58868 4.93563 6.48716 4.89358C6.38564 4.85153 6.27683 4.82988 6.16695 4.82988C6.05707 4.82988 5.94826 4.85153 5.84674 4.89358C5.74522 4.93563 5.65298 4.99726 5.57528 5.07496C5.49759 5.15266 5.43595 5.2449 5.3939 5.34642C5.35185 5.44794 5.33021 5.55674 5.33021 5.66663C5.33021 5.77651 5.35185 5.88532 5.3939 5.98683C5.43595 6.08835 5.49759 6.18059 5.57528 6.25829L7.49195 8.16663H1.16695C0.945938 8.16663 0.733976 8.25442 0.577696 8.4107C0.421416 8.56698 0.333618 8.77895 0.333618 8.99996ZM11.1669 0.666626H2.83362C2.17058 0.666626 1.53469 0.930018 1.06585 1.39886C0.59701 1.8677 0.333618 2.50358 0.333618 3.16663V5.66663C0.333618 5.88764 0.421416 6.0996 0.577696 6.25588C0.733976 6.41216 0.945938 6.49996 1.16695 6.49996C1.38797 6.49996 1.59993 6.41216 1.75621 6.25588C1.91249 6.0996 2.00028 5.88764 2.00028 5.66663V3.16663C2.00028 2.94561 2.08808 2.73365 2.24436 2.57737C2.40064 2.42109 2.6126 2.33329 2.83362 2.33329H11.1669C11.388 2.33329 11.5999 2.42109 11.7562 2.57737C11.9125 2.73365 12.0003 2.94561 12.0003 3.16663V14.8333C12.0003 15.0543 11.9125 15.2663 11.7562 15.4225C11.5999 15.5788 11.388 15.6666 11.1669 15.6666H2.83362C2.6126 15.6666 2.40064 15.5788 2.24436 15.4225C2.08808 15.2663 2.00028 15.0543 2.00028 14.8333V12.3333C2.00028 12.1123 1.91249 11.9003 1.75621 11.744C1.59993 11.5878 1.38797 11.5 1.16695 11.5C0.945938 11.5 0.733976 11.5878 0.577696 11.744C0.421416 11.9003 0.333618 12.1123 0.333618 12.3333V14.8333C0.333618 15.4963 0.59701 16.1322 1.06585 16.6011C1.53469 17.0699 2.17058 17.3333 2.83362 17.3333H11.1669C11.83 17.3333 12.4659 17.0699 12.9347 16.6011C13.4036 16.1322 13.6669 15.4963 13.6669 14.8333V3.16663C13.6669 2.50358 13.4036 1.8677 12.9347 1.39886C12.4659 0.930018 11.83 0.666626 11.1669 0.666626Z"
                  fill="currentColor"></path>
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium">Sign Out</span>
            </a>
          </div>
        </nav>
      </div>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden transition duration-300 bg-main" :class="isOpen
        ? 'translate-x-0  ease-out  lg:translate-x-0 ' : ''
        // : '' -translate-x-full ease-in 
        ">
      <main class="overflow-x-hidden overflow-y-auto shadow-t">
        <header class="flex items-center justify-between px-6 py-4 shadow-md bg-sec text-gray-500 z-40">
          <div class="flex items-center">
            <button class="text-gray-500 focus:outline-none mr-4" @click="isOpen = !isOpen">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="flex items-center">
            <div class="relative">
              <div class="relative z-10 hidden sm:block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none">
                <div class="center con-avatars flex justify-items-center">
                  <vs-avatar class="">
                    <i class="bx bx-user"></i>
                  </vs-avatar>
                </div>
              </div>
              <button
                class="relative z-10 block sm:hidden w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none"
                @click="dropdownOpen = !dropdownOpen">
                <div class="center con-avatars flex justify-items-center">
                  <vs-avatar class="">
                    <i class="bx bx-user"></i>
                  </vs-avatar>
                </div>
              </button>

              <div v-show="dropdownOpen" class="fixed block sm:hidden inset-0 z-10 w-full h-full"
                @click="dropdownOpen = false"></div>

              <transition enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0">
                <div v-show="dropdownOpen"
                  class="absolute block sm:hidden right-0 z-20 w-48 py-3 mt-2 bg-white rounded-md shadow-xl">
                  <a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                  <a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                </div>
              </transition>
            </div>
            <div class="hidden sm:block relative ml-3">
              <p class="flex gap-2">
                Hi, test
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  class="h-6 w-4 transform cursor-pointer transition-transform duration-200 ease-in-out"
                  :class="dropdownOpen ? 'rotate-180' : 'rotate-0'" @click="dropdownOpen = !dropdownOpen">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </p>
              <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false"></div>

              <transition enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0">
                
                <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-3 mt-2 bg-white rounded-md shadow-xl">
                  <a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                  <a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                </div>

              </transition>
            </div>
          </div>
        </header>
        <div class="flex-1 z-10 pt-8">
          
            <router-view />
        </div>
      </main>
      
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import { provide } from "vue";
// import store from "@/store";

export default {
  setup() {
    // provide("store", store);
    const dropdownOpen = ref(false);
    const isOpen = ref(false);
    const show = ref(false);
    return {
      dropdownOpen,
      isOpen,
      show,
    };
  },
};
</script>
<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap");

* {
  font-family: "Inter", sans-serif !important;
  @apply font-medium;
}

.bg-main {
  /* background-color: #f9fcurrentColor/
  /* background: linear-gradient(rgb(47, 150, 163), rgb(48,62,143)); */

  /* background-color: rgb(241, 245, 251);  */
  background-color: #f1f5f9 !important;
  /* e7e9f0 */
}

.bg-sec {
  background-color: #fff !important;
  @apply border-solid;
}

body {
  background-color: #fff !important;

  font-family: inherit !important;
  line-height: inherit !important;
  @apply tracking-wide;
}

@media (max-width: 325px) {
  .inputz:focus {
    @apply absolute left-16 transform z-50 duration-300 w-60;
  }
}

@media (min-width: 326px) and (max-width: 450px) {
  .inputz:focus {
    @apply absolute left-16 transform z-50 duration-300 w-64;
  }
}

@media (min-width: 520px) {
  .inputz {
    @apply w-52;
  }
}
</style>