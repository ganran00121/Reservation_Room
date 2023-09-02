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
        headerToolbar: { left: 'dayGridMonth,resourceTimeline,timeGridWeek,timeGridoneDay', center: 'title' },
        plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: ref('dayGridMonth'), // dayGridMonth , resourceTimeline
        dateClick: this.handleDateClick,
        weekends: true, // initial value
        selectable: true,
        allDaySlot: false,
        EventTime: false,
        slotMinTime: '06:00:00',
        slotMaxTime: '24:00:00',
        dateClick: this.handleDateClick,
        views: {
          timeGridoneDay: {
            type: 'timeGrid',
            duration: { days: 1 }
          }
        },

        resources: [
          {
            id: '100',
            title: 'CSB100'
          },
          {
            id: '207',
            title: 'CSB207'
          },
          {
            id: '209',
            title: 'CSB209'
          },
          {
            id: '210',
            title: 'CSB210'
          },
          {
            id: '301',
            title: 'CSB301'
          }
        ],
        events: [
          {
      resourceIds: ['100', '207'],
            title: 'My Event',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            className: 'bg-primary'
          },
          {
      resourceIds: ['a', 'b'],
            title: 'My Event',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            className: 'bg-primary'
          },
          {
      resourceIds: ['a', 'b'],
            title: 'My Event',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            className: 'bg-primary'
          },
          {
      resourceIds: ['a', 'b'],
            title: 'My Event',
            start: '2023-09-05T14:14:00',
            end: '2023-09-05T16:30:00',
            className: 'bg-primary'
          },
          {
            resourceIds: ['a', 'b'],
            title: 'CSB210',
            start: '2023-09-02T13:14:00',
            end: '2023-09-02T16:30:00',
            className: 'bg-primary'
          },
          {
            title: 'CSB209',
            start: '2023-09-02T1:14:00',
            end: '2023-09-02T16:30:00',
            className: 'bg-primary'
          },
          {
            title: 'CSB310',
            start: '2023-09-02T1:14:00',
            end: '2023-09-02T16:30:00',
            className: 'bg-primary'
          },

        ],
        eventColor: '#378006'
      }

    }
  },
  methods: {
    handleDateClick: function (clickinfo) {
      this.$emit('dateClick', clickinfo);
    }
  }
}
</script>
<template>
  <!-- <p>SSSSSSSS :====== {{  artists  }}</p>
  <button @click="toggleWeekends" class="bg-gray-500">toggle weekends</button>
  <p>{{ this.calendarOptions.initialView.value }}</p> -->
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg' class="ml-3">
      <b>{{ arg.event.title }} '(<b>{{ arg.timeText }}</b>)'</b>

    </template>
  </FullCalendar>
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>