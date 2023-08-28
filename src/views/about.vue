<script>
import { watchEffect, ref, defineComponent } from "vue";
import calendar from "../components/Calendar.vue";

export default {
  
  components: {
    calendar
  },
  setup() {
    const data_view = "resourceTimeline"
    return {
      calendar,
      data_view 
    }
  },
  methods: {
    toggleWeekends: function() {
      if (this.data_view!= 'resourceTimeline' ) {
        this.data_view = 'resourceTimeline'
        console.log(this.data_view);
      }
      else{
        this.data_view = 'dayGridMonth'
        console.log(this.data_view);
      }
  }
}
}
</script>
<template>
  <!-- <button @click="toggleWeekends()">CHENG</button> -->
  <calendar v-bind:artists="data_view"  />
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>