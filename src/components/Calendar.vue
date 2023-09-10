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

    ///วิชาฟิก
    const events_test = ref();
    const today = new Date();
    const year = today.getFullYear();
    const startMonth = 6;
    const endMonth = 9;
    const day_cours = 20;
    const events = [];



    ///ที่ขอแอด
    const events_data = ref([]);
    /// ฟิก
    const generateEvents = () => {
      for (let month = startMonth; month <= endMonth; month++) {
        for (let dayOfWeek of [1, 4]) {
          const firstDay = new Date(year, month - 1, 1);
          let day = (dayOfWeek - firstDay.getDay() + 7) % 7 + 1;

          while (day <= 31) {
            const eventStartDate = new Date(year, month - 1, day, 12, 30);
            const eventEndDate = new Date(year, month - 1, day, 14, 30);

            events_data.value.push({
              title: "CSB100",
              resourceIds: ['CSB100'],
              groupId: 'redEvents',
              start: eventStartDate,
              end: eventEndDate,
              repeat: {
                frequency: 'weekly',
                daysOfWeek: ['1', '4'],
                startTime: '12:30',
                endTime: '14:30',
              },
              eventcolor:'#f97316',
            });
            day += 7;
          }

        }
      }
    }

    const calendarOptions = ref({
      headerToolbar: { left: 'dayGridMonth,Timeline', center: 'title' },
      plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin],
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
        Timeline: {
          type: 'resourceTimeline',
          duration: { days: 1 },
          slotDuration: '00:30:00',
          slotLabelInterval: { hours: 1 }
        }
      },
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false
      },
      resources: [
        { id: 'CSB100', title: 'CSB100' },
        { id: 'CSB201', title: 'CSB201' },
        { id: 'CSB202', title: 'CSB202' },
        { id: 'CSB203', title: 'CSB203' },
        { id: 'CSB207', title: 'CSB207' },
        { id: 'CSB209', title: 'CSB209' },
        { id: 'CSB210', title: 'CSB210' },
        { id: 'CSB301', title: 'CSB301' },
        { id: 'CSB303', title: 'CSB303' },
        { id: 'CSB307', title: 'CSB307' },
        { id: 'CSB308', title: 'CSB308' },
        { id: 'CSB309', title: 'CSB309' },
        { id: 'CSB310', title: 'CSB310' },
      ],
      events: [],
    });
    const fetchReservations = async () => {
      try {

        const response = await axios.get('http://localhost:3000/reservations');
        if (Array.isArray(response.data)) {
          events_data.value = response.data.map(reservation => ({
            title: reservation.room_id,
            resourceIds: [reservation.room_id],
            Description: reservation.description,
            start: reservation.date + 'T' + reservation.time_start,
            end: reservation.date + 'T' + reservation.time_end,
            time: reservation.time_start + '-' + reservation.time_end,
            eventcolor:'#924ACE',
          }));
          generateEvents();
          calendarOptions.value.events = events_data.value;
          console.log(events_data);
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    const log_options = (obj) => {
      console.log(obj);
    }
    onMounted(fetchReservations);
    const clicke_events = (clickinfo) => {
      console.log(clickinfo);
      console.log(clickinfo.event.extendedProps.time); // เพิ่มบรรทัดนี้
    }
    return {
      log_options,
      clicke_events,
      handleDateClick,
      events_data,
      calendarOptions,
    };
  }
});
</script>

<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg' @click="clicke_events(arg)" >
      <div class=" w-full flex">
      <svg class="my-auto" v-if="arg.view.type !== 'Timeline'" @click="log_options(arg)" xmlns="http://www.w3.org/2000/svg" width="12"
        height="12" viewBox="0 0 24 24" style="fill: rgb(0, 0, 0); --darkreader-inline-fill: #e8e6e3;"
        data-darkreader-inline-fill="">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path>
      </svg>
      <div class="w-100 mx-auto grid">
        <div class="grid">
          <b class="mx-auto">{{ arg.event.extendedProps.Description }}</b>
        </div>
        <div class="flex">
          <b class="">{{ arg.event.extendedProps.time }}</b>
          <b class="ml-3">{{ arg.event.title }}</b>
        </div>
      </div>
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
