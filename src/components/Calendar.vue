<script>
import { defineComponent, ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

import axios from 'axios';

export default defineComponent({
  components: {
    FullCalendar
  },
  setup(props, context) {
    const handleDateClick = function (clickinfo) {
      context.emit('dateClick', clickinfo);
      console.log(clickinfo);
    };

    const events_data = ref([]);
    const calendarOptions = ref({
      headerToolbar: { left: 'dayGridMonth,timeGridWeek,Day,Timeline', center: 'title' },
      plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      dateClick: handleDateClick,
      weekends: true,
      selectable: true,
      allDaySlot: false,
      eventTime: false,
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
        { id: 'CSB100', title: 'CSB100' },
        { id: 'CSB207', title: 'CSB207' },
        { id: 'CSB209', title: 'CSB209' },
        { id: 'CSB210', title: 'CSB210' },
        { id: 'CSB301', title: 'CSB301' }
      ],
      events: []
    });
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reservations');

        if (Array.isArray(response.data)) {
          events_data.value = response.data.map(reservation => ({
            title: reservation.room_id,
            resourceIds: [reservation.room_id],
            start: reservation.date + 'T' + reservation.time_start,
            end: reservation.date + 'T' + reservation.time_end,
            time: reservation.time_start + '-' + reservation.time_end,
          }));
          calendarOptions.value.events = events_data.value;
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    onMounted(fetchReservations);

    return {
      handleDateClick,
      events_data,
      calendarOptions,
    };
  }
});
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
