<script>
import { watchEffect, ref, defineComponent } from "vue";
import calendar from "../components/Calendar.vue";
import ModalCalendar from "../components/Modals/Calendarmodal.vue";
export default {

  components: {
    calendar,
    ModalCalendar
  },
  setup() {
    return {
      calendar,
      ModalCalendar,
      showModal: ref(false),
      newEvent:{
        title: '',
        date_at: '',
        hour: '',
        user_id: '',
      },
      time_A: ref('dasdsad'),
    }
  },
  methods: {
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
      console.log('Grid : ' , obj.view.type);
      let grid_type = obj.view.type
      if( grid_type == "timeGridWeek"){
        // 2023-08-30T12:30:00+07:00
        let date = obj.dateStr.substr(0,10)
        let time = obj.dateStr.substr(11,8)
        console.log('date: ', date)
        console.log('time: ', time)
        this.newEvent.date_at = date
        this.newEvent.hour = time.substr(0,8)
      }
      else {
        this.newEvent.date_at = obj.dateStr.substr(0,10)
        this.newEvent.hour = 'none'
      }
      return
    }
  }
}
</script>
<template>
  <!-- <button @click="toggleWeekends()">CHENG</button> -->
  <div class="overflow-hidden">
    <calendar  @dateClick="opendateClick" />
  </div>
  <modalCalendar v-if="showModal" :form="newEvent" @closeModal="closeModal" />
  
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>