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
  <table class="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>