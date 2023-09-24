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
        room_id: 11,
        user_refer: null, //id user 
        instructor: 'Waraporn Insom',
        admin_refer: null,
        date: '',
        user_id: 640510612, // token user_id
        request_description: '',
        start_time: '',
        end_time: '',
        status: 'Waiting',
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
        console.log("decodedtoken __about__ : ",this.decodedToken);
        this.newEvent.user_refer = this.decodedToken.id
        this.newEvent.user_id = this.decodedToken.college_id
        this.newEvent.room_id = obj.resource._resource.id
        this.newEvent.date = date_at
        this.newEvent.start_time = time.substr(0, 8)
      }
      else {
        this.newEvent.date = obj.dateStr.substr(0, 10)
        this.newEvent.start_time = 'none'
      }
      return
    },

    // POST FORM

    saveAppt: function (param) {
      console.log("log param :",param);
      const token = localStorage.getItem("jwtToken");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      axios
        .post('http://localhost:3000/requests', param, headers)
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
  <!-- <button @click="toggleWeekends()">CHENG</button> -->
  <div class="container rounded-xl mx-auto px-3 py-8 bg-white overflow-hidden">
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