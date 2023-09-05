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
      data: [],
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
        ]
      }

    }
  },
  methods: {
    handleDateClick: function (clickinfo) {
      this.$emit('dateClick', clickinfo);
      console.log(clickinfo);
    },
    test: function (data) {
      console.log(data);
    },
  },
  onMounted()  {
    calendar.getDate();
  },
  async created() {
  try {
    const response = await axios.get('http://localhost:3000/reservations');
    this.calendarOptions.events = response.data.map(eventnew => ({
      title: eventnew.room_id,
      resourceIds: [eventnew.room_id],
      start: eventnew.date + 'T' + eventnew.time_start,
      end: eventnew.date + 'T' + eventnew.time_end,
      time: eventnew.time_start + '-' + eventnew.time_end,
    }));

    // Check if this.npm is defined, and if not, initialize it as an object
    if (!this.npm) {
      this.npm = {};
    }

    // Set the 'events' property on this.npm
    this.npm.events = events;

    console.log(this.npm.events);
  } catch (error) {
    console.error('An error occurred:', error);
  }
},
}
</script>
<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg'>
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