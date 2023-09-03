<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { watchEffect, ref, defineComponent } from "vue";
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: ['artists']
  ,
  data() {
    return {
      calendarOptions: {
        headerToolbar: { left: 'dayGridMonth,timeGridWeek,Day,Timeline', center: 'title' },
        plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: ref('dayGridMonth'), 
        dateClick: this.handleDateClick,
        weekends: true,
        selectable: true,
        allDaySlot: false,
        EventTime: false,
        displayEventTime: true,
        slotMinTime: '08:00:00',
        slotMaxTime: '22:00:00',
        dateClick: this.handleDateClick,
        views: {
          Day: {
            type: 'timeGrid',
            duration: { days: 2 }
          },
          Timeline: {
            type: 'resourceTimeline',
            duration: { days: 1 }
          }
        },
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false

        },
        resources: [
          {
            id: 'CSB100',
            title: 'CSB100'
          },
          {
            id: 'CSB207',
            title: 'CSB207'
          },
          {
            id: 'CSB209',
            title: 'CSB209'
          },
          {
            id: 'CSB210',
            title: 'CSB210'
          },
          {
            id: 'CSB301',
            title: 'CSB301'
          }
        ],
        events: [
          {
            resourceIds: ['CSB301'],
            title: 'CSB301',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            time: '14:14-16:30',
            className: 'bg-teal-500 border-transparent rounded-md'
          },
          {
            resourceIds: ['CSB301'],
            title: 'CSB301',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            time: '14:14-16:30',
            className: 'bg-teal-500 border-transparent rounded-md'
          },
          {
            resourceIds: ['CSB210'],
            title: 'CSB210',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            time: '14:14-16:30',
            className: 'bg-teal-500 border-transparent rounded-md'
          },
          {
            resourceIds: ['CSB209'],
            title: 'CSB209',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            time: '14:14-16:30',
            className: 'bg-teal-500 border-transparent rounded-md'
          },
          {
            resourceIds: ['CSB207'],
            title: 'CSB207',
            start: '2023-09-02T13:14:00',
            end: '2023-09-02T16:30:00',
            time: '14:14-16:30',
            className: 'bg-teal-500 border-transparent rounded-md'
          },
          {
            resourceIds: ['CSB209'],
            title: 'CSB209',
            start: '2023-09-02T1:14:00',
            end: '2023-09-02T16:30:00',
            time: '14:14-16:30',
            className: 'bg-teal-500 border-transparent rounded-md'
          },
          {
            resourceIds: ['CSB310'],
            title: 'CSB310',
            start: '2023-09-02T14:14:00',
            end: '2023-09-02T16:30:00',
            time: '14:14-16:30',
            className: 'bg-teal-500 border-transparent rounded-md'
            
          },

        ],
      }

    }
  },
  methods: {
    handleDateClick: function (clickinfo) {
      this.$emit('dateClick', clickinfo);
    },
    test: function (data) {
      console.log(data);
    },
  },
  mounted() {
    console.log()
  },
}
</script>
<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg' >
      <div class="w-100 mx-auto">
        <b class="">{{ arg.event.extendedProps.time }}</b>

        <b class="ml-3">{{ arg.event.title }}</b>
      </div>
    </template>
  </FullCalendar>
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>