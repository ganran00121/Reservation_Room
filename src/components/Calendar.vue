<script >
import { defineComponent, ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import compoDetail from "../components/Modals/showDetail.vue";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

import axios from 'axios';

export default defineComponent({
  components: {
    FullCalendar,
    compoDetail
  },
  setup(props, context) {

    // GET API
    onMounted(async () => {
      try {
        const test = await axios.get('http://localhost:3000/users');
        let user
        let users = {}
        for (var i = 0; i < test.data.length; i++) {
          user = test.data[i];
          users[user.user_id] = user;
        }
        const response = await axios.get('http://localhost:3000/reservations');
        if (Array.isArray(response.data)) {
          events_data.value = response.data.map(reservation => {
            let status = reservation.status;
            if (status == "Approved") {
              status = 'custom-event-color-status-approve'
            } else if (status == "Waiting") {
              status = 'custom-event-color-status-wait'
            } else if (status == "Rejected") {
              status = 'test'
              // return null;
            }
            return {
              title: reservation.room_id,
              name: users[reservation.user_id].firstname + '  ' + users[reservation.user_id].lastname,
              resourceIds: [reservation.room_id],
              description: reservation.description,
              show_date: reservation.date,
              show_instructor: reservation.instructor,
              status: reservation.status,
              start: reservation.date + 'T' + reservation.time_start,
              end: reservation.date + 'T' + reservation.time_end,
              time: reservation.time_start + '-' + reservation.time_end,
              classNames: [status],
            };
          }).filter(event => event !== null);;
          generateEvents();
          calendarOptions.value.events = events_data.value;
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
    // END GET API


    // SET DETAIL
    const newEvent = ref({
      room_id: '',
      instructor: '',
      date: '',
      user_id: 640510673,
      time_start: '',
      description: '',
      time_end: '',
      status: '',
    })
    const setnewEvent = (info) => {
      const setinfo = info.event._def;
      newEvent.value.room_id = setinfo.title
      newEvent.value.date = setinfo.extendedProps.show_date
      newEvent.value.instructor = setinfo.extendedProps.show_instructor
      newEvent.value.description = setinfo.extendedProps.description
      newEvent.value.time_start = setinfo.extendedProps.time
      newEvent.value.time_end = setinfo.extendedProps.time
      newEvent.value.status = setinfo.extendedProps.status
    }
    const showDetail = ref(false)
    const openDetail = (info) => {
      setnewEvent(info)
      showDetail.value = true;
    }
    const closeDetail = () => {
      showDetail.value = false;
    }
    // END SET DETAIL


    // SET COURSE
    const events_test = ref();
    const today = new Date();
    const year = today.getFullYear();
    const startMonth = 6;
    const endMonth = 9;
    const start_day_cours = 20;
    const end_day_cours = 18;
    const events_data = ref([]); // keep event course
    // Funtions set course
    const generateEvents = () => {
      for (let month = startMonth; month <= endMonth; month++) {
        for (let dayOfWeek of [1, 4]) {
          const firstDay = new Date(year, month - 1, 1);
          let day = (dayOfWeek - firstDay.getDay() + 7) % 7 + 1;

          while (day <= 31) {
            const eventStartDate = new Date(year, month - 1, day, 12, 30);
            const eventEndDate = new Date(year, month - 1, day, 14, 30);
            if ((month == startMonth && day < start_day_cours) || (month == endMonth && day > end_day_cours)) {
              day += 7;
            } else {
              events_data.value.push({
                eventBackgroundColor: '#FF5733',
                name: "Waraporn Insom",
                title: "CSB100",
                resourceIds: ['CSB100'],
                groupId: 'redEvents',
                show_date: eventStartDate,
                start: eventStartDate,
                end: eventEndDate,
                show_instructor: "Waraporn Insom",
                status: "Approved",
                description: "description...",
                time: '12:30 - 14:30',
                repeat: {
                  frequency: 'weekly',
                  daysOfWeek: ['1', '4'],
                  startTime: '12:30',
                  endTime: '14:30',
                },
                classNames: ['custom-event-color'],
              });
              day += 7;
            }
          }

        }
      }
    }
    // END SET COURSE

    // const clicke_events = (clickinfo) => {
    //   const string_d = ref("")
    //   const test_date = JSON.stringify(clickinfo.event._instance.range.start);
    //   console.log(test_date.substr(0, 20));
    // }
    // set calendar options and funtions for optinscalendar



    // Funtion for calendarOptions
    //SELECT
    const handleDateSelect = (selectInfo) => {
      let calendarApi = selectInfo.view.calendar
      calendarApi.changeView('Timeline', selectInfo.startStr)
    }
    //DATE CLICK
    const handleDateClick = function (clickinfo) {
      if (clickinfo.view.type === "Timeline") {
        context.emit('dateClick', clickinfo);
      }
    }
    //SET CalendarOptions
    const calendarOptions = ref({
      headerToolbar: { left: 'dayGridMonth,Timeline', center: 'title' },
      plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      weekends: true,
      select: handleDateSelect,
      // selectable: true, // 
      navLinks: true,
      width: 650,
      allDaySlot: false,
      eventTime: false,
      displayEventTime: true,
      slotMinTime: '08:00:00',
      slotMaxTime: '22:00:00',

      color: '#FF5733',
      views: {
        Timeline: {
          dateClick: handleDateClick,
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

    return {
      handleDateClick,
      events_data,
      calendarOptions,
      showDetail,
      openDetail,
      handleDateSelect,
      closeDetail,
      newEvent,
    };
  }
});
</script>

<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg' class="h-16 overflow-auto">
      <div class="w-full grid group cursor-pointer relative inline-block text-center">
        <div class=" w-full flex  " @click="openDetail(arg)">
          <div class="w-100 mx-auto grid">
            <div class="grid">
              <b class="mx-auto">{{ arg.event.extendedProps.description }}</b>
            </div>
            <div class="flex">
              <b class="">{{ arg.event.extendedProps.time }}</b>
              <b class="ml-3" v-if="arg.view.type !== 'Timeline'">{{ arg.event.title }}</b>
            </div>
          </div>
          <div class="opacity-0 w-full hidden  bg-gray-400 text-white text-center text-xs rounded-lg py-3 absolute z-10
                        group-hover:block opacity-100 bottom-full 
                        left-auto  px-3 ">
            {{ arg.event.extendedProps.name }}
            <svg class="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"
              xml:space="preserve">
              <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
          </div>
        </div>
      </div>
    </template>
  </FullCalendar>
  <compoDetail v-if="showDetail" :setdetail="newEvent" @closeDetail="closeDetail" />
</template>

<style>
body {
  color: black;
  background-color: black;
}

.custom-event-color {
  color: black;
  background-color: rgb(45, 115, 245);
  border: none;
  border-radius: 7px;
}

.custom-event-color-status-wait {
  color: black;
  background-color: rgb(255, 196, 0);
  border: none;
  border-radius: 7px;
}

.custom-event-color-status-approve {
  color: black;
  background-color: rgb(20, 211, 45);
  border: none;
  border-radius: 7px;
}

.test {
  background-color: aqua;
  border: none;
  border-radius: 7px;
}

.custom-event-color:hover {
  background-color: rgba(2, 115, 22);
}
</style>
