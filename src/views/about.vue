<script>
import { watchEffect, ref, defineComponent } from "vue";
import calendar from "../components/Calendar.vue";
import ModalCalendar from "../components/Modals/Calendarmodal.vue";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';

export default {

  components: {
    calendar,
    ModalCalendar
  },
  setup() {
    const showModal= ref(false)
    return {
      data: [],
      calendar,
      showModal,
      ModalCalendar,
      newEvent: {
        room_id: '',
        instructor:'Waraporn Insom',
        date: '',
        user_id: 640510689,
        time_start: '',
        time_end: '',
        status: 'Waiting',
      },
      time_A: ref('dasdsad'),
    }
  },

  methods: {
    res_alert: function (data) {
      Swal.fire(
        'Reservation suscess!',
        'success'
      )
    },
    opendateClick: function (arg) {
      this.showModal = true
      console.log('log_data: ', arg)
      this.setModalOpen(arg)
    },
    closeModal: function () {
      this.showModal = false
    },
    setModalOpen: function (obj) {
      console.log('date: ', obj.date)
      console.log('datestr: ', obj.dateStr)
      console.log('Grid : ', obj.view.type);
      let grid_type = obj.view.type
      if (grid_type == "timeGridWeek" || grid_type == "Timeline") {
        // 2023-08-30T12:30:00+07:00
        let date_at = obj.dateStr.substr(0, 10)
        let time = obj.dateStr.substr(11, 8)
        console.log("resource :" , obj.resource._resource.title);
        console.log('date: ', date_at)
        console.log('time: ', time)
        this.newEvent.room_id = obj.resource._resource.title
        this.newEvent.date = date_at
        this.newEvent.time_start = time.substr(0, 8)
      }
      else {
        this.newEvent.date = obj.dateStr.substr(0, 10)
        this.newEvent.time_start = 'none'
      }
      return
    },
    set_Newevent: function () {
      this.newEvent.room_id= ''
      this.newEvent.date= ''
      this.newEvent.instructor='Waraporn Insom'
      this.newEvent.time_start= ''
      this.newEvent.time_end= ''
      this.newEvent.status= 'Waiting'
    },
    saveAppt: function (param) {
      console.log(param);
      axios
        .post('http://localhost:3000/reservations', param)
        .then((response) => {
          console.log('POST request successful:', response.data);
          this.closeModal()
          this.res_alert(param)
          this.set_Newevent()
          setTimeout(() => {
          window.location.reload(); // รีเฟรชหน้าทันทีหลังจาก 1000 มิลลิวินาที (1 วินาที)
          }, 1000); 
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    },
  }
}
</script>
<template>
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