<script >
import { defineComponent, ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Detail from "../components/Modals/showDetail.vue";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

import axios from 'axios';

export default defineComponent({
  components: {
    FullCalendar,
    Detail
  },
  setup(props, context) {
    // show detail
    const newEvent = ref({
        room_id :  '',
        instructor : '',
        date :'',
        user_id: 640510673,
        time_start: '',
        time_end: '',
        status: '',
    })
    const setnewEvent = (info) => {
      const set_datenewEvent = ref(info.event._instance.range.start)
      newEvent.room_id = info.room_id
      newEvent.date = ''
      newEvent.instructor = 'Waraporn Insom'
      newEvent.time_start = ''
      newEvent.time_end = ''
      newEvent.status = 'Waiting'
    } 
    const showDetail = ref(false)
    const openDetail = () => {
      showDetail = true;
    }
    const closeDetail = () => {
      showDetail = false;
    }

    const calendarRef = ref(null)
    const set_date = new Date();
    // click on date
    const handleDateClick = function (clickinfo) {
      if (clickinfo.view.type === "dayGridMonth") {
        clickTimelineButton(clickinfo);
        console.log("dsdasdsad :", clickinfo);
      } else {
        context.emit('dateClick', clickinfo);
      }
    };
    const clickTimelineButton = (clickinfo) => {
      const timelineButton = document.querySelector('.fc-Timeline-button');
      const calendar_date = document.querySelector('.fc-toolbar-title');
      console.log(clickinfo.dateStr, "dasdsadsadsds");
      if (timelineButton) {
        timelineButton.click();
        // calendarOptions.push({initialDate: '2020-09-02'})
      }
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
              eventBackgroundColor: '#FF5733',
              name: "Waraporn Insom",
              title: "CSB100",
              resourceIds: ['CSB100'],
              groupId: 'redEvents',
              start: eventStartDate,
              end: eventEndDate,
              Description: "204365",
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
    // set calendar options
    const calendarOptions = ref({
      headerToolbar: { left: 'dayGridMonth,Timeline', center: 'title' },
      plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin],
      initialView: "Timeline",
      dateClick: handleDateClick,
      weekends: true,
      selectable: true,
      navLinks: true,
      width: 650,
      // สร้างฟังก์ชัน navLinkDayClick ที่จะเรียกเมื่อคลิกที่ nav link ของวันที่
      navLinkDayClick: function (date, jsEvent) {
        console.log("jsecent", jsEvent);
      },
      allDaySlot: false,
      eventTime: false,
      displayEventTime: true,
      slotMinTime: '08:00:00',
      slotMaxTime: '22:00:00',

      color: '#FF5733',
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
    const calendarKey = ref(0);
    const log_options = (obj) => {
      console.log(obj);
    }

    const clicke_events = (clickinfo) => { // click event
      console.log(clickinfo);
      const string_d = ref("")
      const test_date = JSON.stringify(clickinfo.event._instance.range.start);
      console.log(test_date.substr(0, 20));
    }
    // add events on reservations 
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
              Description: reservation.description,
              start: reservation.date + 'T' + reservation.time_start,
              end: reservation.date + 'T' + reservation.time_end,
              time: reservation.time_start + '-' + reservation.time_end,
              classNames: [status],
            };
          }).filter(event => event !== null);;
          generateEvents();
          calendarOptions.value.events = events_data.value;
          console.log("dasdsad:::: :::: :", calendarOptions.value.events);
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
    // watch(events_data, (newVal) => {
    //   // ถ้า events_data.value มีการเปลี่ยนแปลง กำหนดค่าใหม่ให้กับ calendarRef
    //   calendarRef.value = newVal;

    // });

    return {
      log_options,
      clicke_events,
      handleDateClick,
      events_data,
      calendarOptions,
      calendarRef,
      showDetail,
      openDetail,
      closeDetail,

    };
  }
});
</script>

<template>
  <button @click="handleButtonClick">CHECK ME! LOG</button>
  <button @click="handleChangeDate('2023-09-25')">Go to 2023-09-25</button>
  <FullCalendar :options="calendarOptions" :ref="calendarRef" :key="calendarKey">
    <template v-slot:eventContent='arg' class="h-16 overflow-auto">
      <div class="w-full grid group cursor-pointer relative inline-block border-b border-gray-400 text-center">
        <div class=" w-full flex  " @click="clicke_events(arg)">
          <svg class="ml-3 my-auto" v-if="arg.view.type !== 'Timeline'" @click="log_options(arg)"
            xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            style="fill: rgb(0, 0, 0); --darkreader-inline-fill: #e8e6e3;" data-darkreader-inline-fill="">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path>
          </svg>
          <div class="w-100 mx-auto grid">
            <div class="grid">
              <b class="mx-auto">{{ arg.event.extendedProps.Description }}</b>
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
  <Detail v-if="showDetail" />
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
