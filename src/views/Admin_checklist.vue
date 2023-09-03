<script>
import { watchEffect, ref, defineComponent } from "vue";

export default {

  components: {
  },
  setup() {
    return {
    }
  },
  methods: {
  },
}
</script>
<template>
  <div class="container rounded-xl mx-auto p-0 pt-0 bg-white">
    <table class="table-auto w-full rounded-xl">
      <thead class="bg-gray-200 bg-gray-200 text-gray-600 rounded-xl">
        <tr class="p-4">
          <th class="rounded-tl-lg">ID</th>
          <th>ROOM</th>
          <th>NAME</th>
          <th>TIME</th>
          <th class="p-3">STATUS</th>
          <th class="rounded-tr-lg justify-end  ml-13">ACTION</th>
        </tr>
      </thead>
      <tbody class="text-center divide-y">
        <tr class="hover:bg-gray-50 border-b-2 ml-3">
          <td class=" py-6">1</td>
          <td>CSB100</td>
          <td>Aucarapon Maunrach 640510689</td>
          <td>12:00-14:00 <br> 12/08/23</td>
          <td>
            <p class=" rounded-xl bg-amber-400 text-white text-center p-1 w-3/5 mx-auto">Wait</p>
          </td>
          <td class="mr-8 ">
            <div class="flex justify-end  mr-8">
              <div class="flex rounded-xl bg-emerald-400 p-1 px-3 text-white">
                <svg class="my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.92661 9.92661L8.92661 11.9266L12.9266 7.92661M5.76161 2.62361C6.47892 2.56636 7.15989 2.28431 7.70761 1.81761C8.32652 1.28988 9.11325 1 9.92661 1C10.74 1 11.5267 1.28988 12.1456 1.81761C12.6933 2.28431 13.3743 2.56636 14.0916 2.62361C14.9024 2.68811 15.6636 3.03943 16.2387 3.61453C16.8138 4.18963 17.1651 4.95086 17.2296 5.76161C17.2869 6.47892 17.5689 7.15989 18.0356 7.70761C18.5633 8.32652 18.8532 9.11325 18.8532 9.92661C18.8532 10.74 18.5633 11.5267 18.0356 12.1456C17.5689 12.6933 17.2869 13.3743 17.2296 14.0916C17.1651 14.9024 16.8138 15.6636 16.2387 16.2387C15.6636 16.8138 14.9024 17.1651 14.0916 17.2296C13.3743 17.2869 12.6933 17.5689 12.1456 18.0356C11.5267 18.5633 10.74 18.8532 9.92661 18.8532C9.11325 18.8532 8.32652 18.5633 7.70761 18.0356C7.15989 17.5689 6.47892 17.2869 5.76161 17.2296C4.95086 17.1651 4.18963 16.8138 3.61453 16.2387C3.03943 15.6636 2.68811 14.9024 2.62361 14.0916C2.56636 13.3743 2.28431 12.6933 1.81761 12.1456C1.28988 11.5267 1 10.74 1 9.92661C1 9.11325 1.28988 8.32652 1.81761 7.70761C2.28431 7.15989 2.56636 6.47892 2.62361 5.76161C2.68811 4.95086 3.03943 4.18963 3.61453 3.61453C4.18963 3.03943 4.95086 2.68811 5.76161 2.62361Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="ml-2">Approve</p>
              </div>
              <div class="flex rounded-xl bg-red-400 p-1 text-white ml-3">
                <svg class="my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 12L10 10M10 10L12 8M10 10L8 8M10 10L12 12M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="ml-2">Refuse</p>

              </div>
            </div>
          </td>
        </tr>
        <tr class="">
          <td class="">2</td>
          <td>CSB100</td>
          <td>Aucarapon Maunrach 640510689</td>
          <td>12:00-14:00 <br> 12/08/23</td>
          <td>
            <div class="rounded-xl bg-emerald-400 text-white text-center p-1  w-3/5 mx-auto">Confirmed</div>
          </td>
          <td class="justify-end">
          </td>
        </tr>
        <tr>
          <td class="">3</td>
          <td>CSB100</td>
          <td>Aucarapon Maunrach 640510689</td>
          <td>12:00-14:00 <br> 12/08/23</td>
          <td>
            <div class="rounded-xl bg-red-400 text-white text-center p-1 w-3/5 mx-auto">Rejeceted</div>
          </td>
          <td class="flex justify-center">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
body {
  color: black;
  background-color: black;
}</style>