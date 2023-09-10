<script>
import { watchEffect, ref, defineComponent } from "vue";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import admin_reser from '../components/Modals/admin_reservation.vue';

export default {

  components: {
    admin_reser,
  },

  setup() {
    const newEvent = ref({
      room_id: 'CSB100',
      instructor:'Waraporn Insom',
      date: '1',
      phone: '',
      description: '',
      user_id: 640510689,
      time_start: '12:30',
      time_end: '14:30',
      status: 'Waiting',

    })
    const showModal= ref(false) ;
    const data = ref([]);
    const max_obj = ref(0);
    const user_name = ref([]);
    const Open_detail = ref(false);
    const opendateClick = (arg) => {
      showModal.value = true
    } ;
    const closeModal =  () => {
      showModal.value = false
    };
    const saveAppt = (param) => {
      console.log(param);
    };
    return {
      showModal,
      closeModal,
      opendateClick,
      saveAppt,
      Open_detail,
      newEvent,
      count: ref(10),
      number: ref(1),
      data,
      set_detil: {},
    }
  },
  
  methods: {
    Approve: function (data) {
      console.log(data);
      Swal.fire({

        title: 'Are you sure?',
        // text: "Do you want approval?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // edit
          axios
            .put(`http://localhost:3000/reservations/${data.id}`,
              {
                room_id: data.room,
                user_id: data.user_id,
                instructor: data.instructor,
                phone: data.phone,
                description: data.description,
                date: data.date,
                time_start: data.time_start,
                time_end: data.time_end,
                status: "Approved"
              }
            )
            .then((response) => {
              Swal.fire(
                'Approved!',
                'Approved success.',
                'success'
              )
              setTimeout(() => {
                window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              }, 1000);
            })
            .catch((error) => {
              console.error('Error:', error);
            })

        }
      })
    },
    Refuse: function (data) {
      Swal.fire({
        title: 'Are you sure?',
        // text: "Do you want to reject this?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Refuse it!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("test", data);
          const dddd = axios.get('http://localhost:3000/reservations/' + data.id);
          console.log("getdddddddddddddd : ", dddd.Result);
          axios
           // Delete
            .put('http://localhost:3000/reservations/' + data.id,
              {
                room_id: data.room,
                user_id: data.user_id,
                instructor: data.instructor,
                phone: data.phone,
                description: data.description,
                date: data.date,
                time_start: data.time_start,
                time_end: data.time_end,
                status: "Rejected"
              }
            )
            .then((response) => {
              Swal.fire(
                'Refuse!',
                'req Refuse.',
                'success'
              )
              setTimeout(() => {
                window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
              }, 1000);
            })
            .catch((error) => {
              console.error('Error:', error);
            })

        }
      })
    },
    next_count: function () {
      this.count += 10;
      this.number += 10;
    },
    prevent_count: function () {
      this.count -= 10;
      this.number -= 10;
    },
  },
  async created() {
    try {
      const test = await axios.get('http://localhost:3000/users');
      let user
      let users = {}
      for (var i = 0; i < test.data.length; i++) {
        user = test.data[i];
        users[user.user_id] = user;
      }
      const response = await axios.get('http://localhost:3000/reservations');
      console.log("get:resvervations : ", response);
      this.data = response.data.map(eventnew => ({
        id: eventnew.id,
        room: eventnew.room_id,
        user_id: eventnew.user_id,
        instructor: eventnew.instructor,
        phone: eventnew.phone,
        time_start: eventnew.time_start,
        time_end: eventnew.time_end,
        description: eventnew.description,
        name: users[eventnew.user_id].firstname + '  ' + users[eventnew.user_id].lastname,
        time: eventnew.time_start + '-' + eventnew.time_end,
        date: eventnew.date,
        status: eventnew.status
      }));
      this.data.sort((a, b) => a.id - b.id);
      console.log(this.data);
      this.max_obj = this.data.length;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
}
</script>
<template>
  <admin_reser v-if="showModal" :form="newEvent" @closeModal="closeModal" @saveAppt="saveAppt" />
  <div class="container rounded-xl mx-auto p-0 pt-0 bg-white">
    <div class="m-5">
      <div class="p-5 border-b-2">
        <button @click="opendateClick" class="text-center w-full  bg-blue-500 rounded-lg p-5 text-white"> ADD COURSE</button>
      </div>
    </div>
    <div class=" p-4">
      <table class="table-auto w-full rounded-xl ">
        <thead class="bg-gray-200 bg-gray-200 text-gray-600 rounded-xl">
          <tr>
            <th class="rounded-tl-lg pl-5">ID</th>
            <th>ROOM</th>
            <th>DETAILS</th>
            <th>TIME</th>
            <th class="p-3">INSTRUCTOR</th>
            <th class="rounded-tr-lg justify-end " style="padding-left: 4%;">ACTION</th>
          </tr>
        </thead>
        <tbody v-for="(items, index) in data" :key="index" class="text-center divide-y ">
          <tr v-if="index + 1 <= this.count && index + 1 >= this.number" class="hover:bg-gray-50 border-b-2 ml-3"
            @click="setModalOpen">
            <td class=" py-6 pl-5">{{ index + 1 }}</td>
            <td>{{ items.room }}</td>
            <td>{{ items.name }}</td>
            <td>{{ items.time }}<br>{{ items.date }}</td>
            <td>
              <p v-if="items.status === 'Approved'"
                class=" rounded-xl bg-emerald-400 text-white text-center p-1 w-3/5 mx-auto"> {{ items.status }}</p>
              <p v-else-if="items.status === 'Waiting'"
                class=" rounded-xl bg-amber-400 text-white text-center p-1 w-3/5 mx-auto"> {{ items.status }}</p>
              <p v-else="items.status === 'Rejected'"
                class=" rounded-xl bg-red-400 text-white text-center p-1 w-3/5 mx-auto">
                {{ items.status }}</p>
            </td>
            <td class="mr-8 ">
              <div class="flex justify-end  mr-8">
                <button class="flex rounded-xl bg-emerald-400 p-1 px-3 text-white" @click="Approve(items)">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.33939 4.09832H3.09697C2.54082 4.09832 2.00745 4.31925 1.61419 4.71251C1.22093 5.10577 1 5.63914 1 6.19529V17.7286C1 18.2848 1.22093 18.8181 1.61419 19.2114C2.00745 19.6047 2.54082 19.8256 3.09697 19.8256H14.6303C15.1864 19.8256 15.7198 19.6047 16.1131 19.2114C16.5063 18.8181 16.7273 18.2848 16.7273 17.7286V12.4862M15.2447 2.61577C15.4381 2.41548 15.6695 2.25573 15.9254 2.14583C16.1812 2.03593 16.4564 1.97808 16.7348 1.97567C17.0132 1.97325 17.2894 2.0263 17.5471 2.13174C17.8048 2.23718 18.0389 2.39288 18.2358 2.58977C18.4327 2.78666 18.5884 3.02079 18.6938 3.2785C18.7993 3.53621 18.8523 3.81234 18.8499 4.09078C18.8475 4.36921 18.7897 4.64437 18.6798 4.90021C18.5699 5.15605 18.4101 5.38744 18.2098 5.58088L9.20753 14.5832H6.24242V11.6181L15.2447 2.61577Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p class="ml-2">Edit</p>
                </button>
                <button class="flex rounded-xl bg-red-400 p-1 px-2 text-white ml-3" @click="Refuse(items)">
                  <svg class="my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 12L10 10M10 10L12 8M10 10L8 8M10 10L12 12M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p class="ml-2 ">Delete</p>
                </button>
              </div>
            </td>
            <div class="relative">
              <div class="absolute">

              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex w-full p-4 pl-8">
      <p class="flex-none "> Showing 1 to 1 of 10 results </p>
      <div class="flex-1 text-end ml-12">
        <div class=" p-3">
          <button @click="prevent_count()" :class="this.count <= 10 ? 'opacity-25' : ''" :disabled="this.count <= 10"
            class=" rounded-xl  p-3 text-red-700">
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.79294 0.792969L0.0859375 6.49997L5.79294 12.207L7.20694 10.793L2.91394 6.49997L7.20694 2.20697L5.79294 0.792969Z"
                fill="#828282" />
            </svg>

          </button>
          {{ this.count / 10 }}
          <button @click="next_count()" :class="this.count >= this.max_obj ? 'opacity-25' : ''"
            :disabled="this.count >= this.max_obj" class=" rounded-xl p-3"><svg width="8" height="12" viewBox="0 0 8 12"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.414 11.414L7.121 5.707L1.414 0L0 1.414L4.293 5.707L0 10L1.414 11.414Z" fill="#828282" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>