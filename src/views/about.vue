<script>
import { watchEffect, ref, defineComponent } from "vue";
import calendar from "../components/Calendar.vue";
import ModalCalendar from "../components/Modals/Calendarmodal.vue";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';

export default {

  components: {
    calendar,
    ModalCalendar,
  },
  setup() {
    const showModal = ref(false)
    const data = ref([]);
    const decodedToken = ref({});
    onMounted(() => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        decodedToken.value = jwt_decode(token);
      }
    });
    return {
      decodedToken,
      calendar,
      showModal,
      ModalCalendar,
      newEvent: {
        user_refer: null, // int  user_id
        admin_refer: null, // int  admin คนไหนกด
        room_refer: null, // string room_id

        // course
        course_id: null, //null เพราะใช้กับ course
        course_section: null, //null เพราะใช้กับ course
        course_name: null, //null เพราะใช้กับ course
        course_type: null, //null เพราะใช้กับ course
        course_instructor: null, //null เพราะใช้กับ course
        course_instructor_email: null, //null เพราะใช้กับ course
        day_of_week: null, //null เพราะใช้กับ courseฃ
        end_date: null, // ให้มันเป็น null ถ้าจะ add ธรรมดา string
        // end course

        description: '', // string
        start_time: '', //16:30 string
        end_time: '', //16:30 string
        start_date: '', // ต้องใช้ dd-mm-yyyy string
        type: 'request', // string
        status: 'Waiting', // string
      },
      time_A: ref('dasdsad'),
    }
  },
  methods: {
    // switc alert
    res_alert: function (data) {
      Swal.fire(
        'Reservation suscess!',
        'success'
      )
    },
    // calendar @click
    opendateClick: function (arg) {
      this.showModal = true
      this.setModalOpen(arg)
    },

    // closeModal
    closeModal: function () {
      this.showModal = false
    },
    // OpenModal
    setModalOpen: function (obj) {

      let grid_type = obj.view.type
      if (grid_type == "timeGridWeek" || grid_type == "Timeline") {
        // 2023-08-30T12:30:00+07:00
        let date_at = obj.dateStr.substr(0, 10)
        let time = obj.dateStr.substr(11, 8)
        console.log("decodedtoken __about__ : ", this.decodedToken);
        this.newEvent.user_refer = this.decodedToken.id
        this.newEvent.room_refer = obj.resource._resource.id
        this.newEvent.start_date = date_at
        this.newEvent.start_time = time.substr(0, 5)
      }
      else {
        this.newEvent.start_date = obj.dateStr.substr(0, 10)
        this.newEvent.start_time = 'none'
      }
      return
    },

    // POST FORM

    saveAppt: function (param) {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      console.log(param.start_date); // dd/mm/yyyy  yyyy/mm/dd
      let startDate = new Date(param.start_date);
      let day = startDate.getDate().toString().padStart(2, '0');
      let month = (startDate.getMonth() + 1).toString().padStart(2, '0');
      let year = startDate.getFullYear().toString();
      
      let formattedDate = `${day}-${month}-${year}`;
      param.start_date = formattedDate
      console.log("log param  :", param);
      axios
        .post('http://localhost:3000/api/reservations/add', param, headers)
        .then((response) => {
          console.log('POST request successful:', response.data);
          this.closeModal()
          this.res_alert(param)
          this.set_Newevent()
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    },
    // set newevent defauf
    set_Newevent: function () {
      this.newEvent.room_id = 0
      this.newEvent.date = ''
      this.newEvent.instructor = 'Waraporn Insom'
      this.newEvent.time_start = ''
      this.newEvent.time_end = ''
      this.newEvent.status = 'Waiting'
    },
  }
}
</script>

<template>
  <h1> {{ name }}</h1>
  <div class="container rounded-xl mx-auto p-10 bg-white overflow-hidden my-8">
    <calendar @dateClick="opendateClick">
    </calendar>
  </div>
  <modalCalendar v-if="showModal" :form="newEvent" @closeModal="closeModal" @saveAppt="saveAppt" />
</template>

<style>
body {
  color: black;
  background-color: black;
}
</style>