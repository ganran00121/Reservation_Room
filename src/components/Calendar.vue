<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { watchEffect, ref, defineComponent } from "vue";

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props:['artists']
  ,
  data() {
    
    return {
      calendarOptions: {
        headerToolbar: { left: 'dayGridMonth,resourceTimeline',center :'title' },
        plugins: [resourceTimelinePlugin ,dayGridPlugin, interactionPlugin],
        initialView: ref('dayGridMonth'), // dayGridMonth , resourceTimeline
        dateClick: this.handleDateClick,
        weekends: true, // initial value
        selectable: true,
        events: [
          { title: '204315', date: '2023-08-01' },
          { title: '205132', date: '2023-08-02' }
        ],
        
      }
      
    }
  },
  methods: {
    toggleWeekends: function() {
      console.log(this.calendarOptions.initialView);
      this.calendarOptions.initialView = 'resourceTimeline'
      watchEffect(() => console.log(this.calendarOptions.initialView)); 
      console.log("AAAAAAAAAAAAAAA :::: ====  "+this.artists);
    }
  }
}
</script>
<template>
  <!-- <p>SSSSSSSS :====== {{  artists  }}</p>
  <button @click="toggleWeekends" class="bg-gray-500">toggle weekends</button>
  <p>{{ this.calendarOptions.initialView.value }}</p> -->
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg'>
      <b>{{ arg.event.title }}</b>
    </template>
  </FullCalendar>
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>