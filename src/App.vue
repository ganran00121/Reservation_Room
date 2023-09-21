<template>
  <div class="flex h-screen">
    <div class="flex bg-gray-900">
      <!-- Backdrop /-->
      <div
        class="fixed inset-0 z-30 transition-opacity bg-black opacity-50 xl:hidden"
        :class="isOpen ? 'block' : 'hidden'"
        @click="isOpen = false"
      ></div>
      <!-- End Backdrop -->
      <div
        :class="
          isOpen
            ? 'translate-x-0 xl:translate-x-0 xl:static xl:inset-0 '
            : '-translate-x-full  lg:left-24 lg:relative lg:w-24'
        "
        class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-400 transform bg-gray-900 overflow-x-hidden"
      >
        <div class="flex items-center justify-center mt-8">
          <div class="flex items-center">
            <img
              src="data:image/png;base64,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"
              class="rounded-full w-14 my-auto py-auto"
              :class="isOpen ? 'w-24 h-24' : ''"
              alt=""
            />

            <!-- <span class="mx-2 text-2xl font-semibold text-white">IOT Dashboard</span> -->
          </div>
        </div>

        <nav class="p-5 mx-auto">
          <router-link
            class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
              :class="isOpen ? '' : 'mx-auto'"
            >
              <path
                d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
              />
              <path
                fill-rule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clip-rule="evenodd"
              />
            </svg>

            <span v-if="isOpen" class="mx-4 tracking-wide font-medium"
              >Dashboard</span
            >
          </router-link>

          <div>
            <router-link
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/test"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
                :class="isOpen ? '' : 'mx-auto'"
              >
                <path
                  d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z"
                />
                <path
                  d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z"
                />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium"
                >Add Course</span
              >
            </router-link>
            <router-link
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/admin"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium"
                >Nofitication A</span
              >
            </router-link>
            <router-link
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/user"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
                :class="isOpen ? '' : 'mx-auto'"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z"
                  clip-rule="evenodd"
                />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium"
                >Nofitication U</span
              >
            </router-link>
            <router-link
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/login"
            >
              <svg
                class="w-5 h-5"
                :class="isOpen ? '' : 'mx-auto'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M0.333618 8.99996C0.333618 9.22097 0.421416 9.43293 0.577696 9.58922C0.733976 9.7455 0.945938 9.83329 1.16695 9.83329H7.49195L5.57528 11.7416C5.49718 11.8191 5.43518 11.9113 5.39287 12.0128C5.35057 12.1144 5.32879 12.2233 5.32879 12.3333C5.32879 12.4433 5.35057 12.5522 5.39287 12.6538C5.43518 12.7553 5.49718 12.8475 5.57528 12.925C5.65275 13.0031 5.74492 13.0651 5.84647 13.1074C5.94802 13.1497 6.05694 13.1715 6.16695 13.1715C6.27696 13.1715 6.38588 13.1497 6.48743 13.1074C6.58898 13.0651 6.68115 13.0031 6.75862 12.925L10.0919 9.59163C10.1678 9.51237 10.2273 9.41892 10.2669 9.31663C10.3503 9.11374 10.3503 8.88618 10.2669 8.68329C10.2273 8.581 10.1678 8.48755 10.0919 8.40829L6.75862 5.07496C6.68092 4.99726 6.58868 4.93563 6.48716 4.89358C6.38564 4.85153 6.27683 4.82988 6.16695 4.82988C6.05707 4.82988 5.94826 4.85153 5.84674 4.89358C5.74522 4.93563 5.65298 4.99726 5.57528 5.07496C5.49759 5.15266 5.43595 5.2449 5.3939 5.34642C5.35185 5.44794 5.33021 5.55674 5.33021 5.66663C5.33021 5.77651 5.35185 5.88532 5.3939 5.98683C5.43595 6.08835 5.49759 6.18059 5.57528 6.25829L7.49195 8.16663H1.16695C0.945938 8.16663 0.733976 8.25442 0.577696 8.4107C0.421416 8.56698 0.333618 8.77895 0.333618 8.99996ZM11.1669 0.666626H2.83362C2.17058 0.666626 1.53469 0.930018 1.06585 1.39886C0.59701 1.8677 0.333618 2.50358 0.333618 3.16663V5.66663C0.333618 5.88764 0.421416 6.0996 0.577696 6.25588C0.733976 6.41216 0.945938 6.49996 1.16695 6.49996C1.38797 6.49996 1.59993 6.41216 1.75621 6.25588C1.91249 6.0996 2.00028 5.88764 2.00028 5.66663V3.16663C2.00028 2.94561 2.08808 2.73365 2.24436 2.57737C2.40064 2.42109 2.6126 2.33329 2.83362 2.33329H11.1669C11.388 2.33329 11.5999 2.42109 11.7562 2.57737C11.9125 2.73365 12.0003 2.94561 12.0003 3.16663V14.8333C12.0003 15.0543 11.9125 15.2663 11.7562 15.4225C11.5999 15.5788 11.388 15.6666 11.1669 15.6666H2.83362C2.6126 15.6666 2.40064 15.5788 2.24436 15.4225C2.08808 15.2663 2.00028 15.0543 2.00028 14.8333V12.3333C2.00028 12.1123 1.91249 11.9003 1.75621 11.744C1.59993 11.5878 1.38797 11.5 1.16695 11.5C0.945938 11.5 0.733976 11.5878 0.577696 11.744C0.421416 11.9003 0.333618 12.1123 0.333618 12.3333V14.8333C0.333618 15.4963 0.59701 16.1322 1.06585 16.6011C1.53469 17.0699 2.17058 17.3333 2.83362 17.3333H11.1669C11.83 17.3333 12.4659 17.0699 12.9347 16.6011C13.4036 16.1322 13.6669 15.4963 13.6669 14.8333V3.16663C13.6669 2.50358 13.4036 1.8677 12.9347 1.39886C12.4659 0.930018 11.83 0.666626 11.1669 0.666626Z"
                  fill="currentColor"
                ></path>
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium"
                >Sign in</span
              >
            </router-link>
            <router-link
              class="px-4 flex items-center cursor-pointer py-3 mt-2 duration-200 rounded text-sm font-medium border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
              to="/login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                :class="isOpen ? '' : 'mx-auto'"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              <span v-if="isOpen" class="mx-4 tracking-wide font-medium"
                >Sign Out</span
              >
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <div
      class="flex-1 flex flex-col overflow-hidden transition duration-300 bg-main"
      :class="
        isOpen ? 'translate-x-0  ease-out  lg:translate-x-0 ' : ''
        // : '' -translate-x-full ease-in
      "
    >
      <main class="overflow-x-hidden overflow-y-auto shadow-t">
        <header
          class="flex items-center justify-between px-6 py-4 shadow-md bg-sec text-gray-500 z-40"
        >
          <div class="flex items-center">
            <button
              class="text-gray-500 focus:outline-none mr-4"
              @click="isOpen = !isOpen"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div class="flex items-center">
            <div class="relative">
              <div
                class="relative z-10 hidden sm:block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none"
              >
                <div class="center con-avatars flex justify-items-center">
                  <vs-avatar class="">
                    <i class="bx bx-user"></i>
                  </vs-avatar>
                </div>
              </div>
              <button
                class="relative z-10 block sm:hidden w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none"
                @click="dropdownOpen = !dropdownOpen"
              >
                <div class="center con-avatars flex justify-items-center">
                  <vs-avatar class="">
                    <i class="bx bx-user"></i>
                  </vs-avatar>
                </div>
              </button>

              <div
                v-show="dropdownOpen"
                class="fixed block sm:hidden inset-0 z-10 w-full h-full"
                @click="dropdownOpen = false"
              ></div>

              <transition
                enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-show="dropdownOpen"
                  class="absolute block sm:hidden right-0 z-20 w-48 py-3 mt-2 bg-white rounded-md shadow-xl"
                >
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >Profile</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >Products</a
                  >
                </div>
              </transition>
            </div>
            <div class="hidden sm:block relative ml-3">
              <p class="flex gap-2">
                Hi, test
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-6 w-4 transform cursor-pointer transition-transform duration-200 ease-in-out"
                  :class="dropdownOpen ? 'rotate-180' : 'rotate-0'"
                  @click="dropdownOpen = !dropdownOpen"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
              <div
                v-show="dropdownOpen"
                class="fixed inset-0 z-10 w-full h-full"
                @click="dropdownOpen = false"
              ></div>

              <transition
                enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-show="dropdownOpen"
                  class="absolute right-0 z-20 w-48 py-3 mt-2 bg-white rounded-md shadow-xl"
                >
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >Profile</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >Products</a
                  >
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
