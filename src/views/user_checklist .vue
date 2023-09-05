<script>
import { watchEffect, ref, defineComponent } from "vue";
import editmodal from "../components/Modals/editmodal.vue";
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {

  components: {
    editmodal
  },
  
  setup() {
    return {
      showEditModal: ref(false),
      max_obj: 0,
      count: ref(10),
      number: ref(1),
      data: [],
      room: "",
      edit_new:{
        room_id: '',
        instructor: '',
        phone: '',
        description: '',
        date: '',
        time_start:'',
        time_end:'',
        status: 'wait',
      },
    }
  },

  methods: {
    edit: function (data_edit) {
      this.showEditModal = true

      this.setModalOpen(data_edit)
    },
    closeModal: function () {
      this.showEditModal = false
    },
    next_count: function () {
      this.count += 10;
      this.number += 10;
    },
    prevent_count: function () {
      this.count -= 10;
      this.number -= 10;
    }, 
    set_maxobj: function () {
      this.max_obj = this.data.length
      console.log(this.max_obj);
    },
    setModalOpen: function (obj) {
      console.log(obj);  
      this.edit_new.room_id = obj.room;
      this.edit_new.instructor = obj.instructor;
      this.edit_new.phone = obj.phone;
      this.edit_new.description = obj.description;
      this.edit_new.date = obj.date;
      this.edit_new.time_start = obj.time_start;
      this.edit_new.time_end = obj.time_end;
      console.log("edit new",this.edit_new);
    },
    saveEdit: function (param) {
      axios
        .post('http://localhost:3000/reservations', param)
        .then((response) => { console.log('POST request successful:', response.data); 
        this.closeModal() 
        this.showAlert()
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    },
    showAlert: function () {
      Swal.fire(
        'Good job!',
        'Edit!',
        'success'
      )
    },

  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/reservations');
      this.data = response.data.map(eventnew => ({
        room: eventnew.room_id,
        name: 'Aucarapon Maunrach  640510689',
        time: eventnew.time_start + '-' + eventnew.time_end,
        phone : eventnew.phone,
        description : eventnew.description,
        instructor : eventnew.instructor,
        time_start : eventnew.time_start,
        time_end : eventnew.time_end,
        date: eventnew.date,
        status: eventnew.status
      }));
      console.log(this.data);
      this.max_obj = this.data.length
      console.log(this.max_obj);
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
  mounted() {
    this.room = "ROOM"
  },
}
</script>
<template>
  <div class="container rounded-xl mx-auto p-0 pt-0 bg-white">
    <table class="table-auto w-full rounded-xl">
      <thead class="bg-gray-200 bg-gray-200 text-gray-600 rounded-xl">
        <tr>
          <th class="rounded-tl-lg pl-5">ID</th>
          <th>ROOMm</th>
          <th>NAME</th>
          <th>TIME</th>
          <th class="p-3">STATUS</th>
          <th class="rounded-tr-lg justify-end " style="padding-left: 4%;">ACTION</th>
        </tr>
      </thead>
      <tbody class="text-center " v-if="true">
        <tr v-for="(items, index) in data" :key="index" class="hover:bg-gray-50 ml-3">
          <td class=" py-6 pl-5">{{ index + 1 }}</td>
          <td>{{ items.room }}</td>
          <td>{{ items.name }}</td>
          <td>{{ items.time }}<br> {{ items.date }} </td>
          <td>
            <p class=" rounded-xl bg-amber-400 text-white text-center p-1 w-3/5 mx-auto">{{ items.status }}</p>
          </td>
          <td class="mr-8 ">
            <div class="flex justify-end  mr-8">
              <button class="flex rounded-xl bg-indigo-400 p-1 px-3 text-white" @click="edit(items)">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.33939 4.09832H3.09697C2.54082 4.09832 2.00745 4.31925 1.61419 4.71251C1.22093 5.10577 1 5.63914 1 6.19529V17.7286C1 18.2848 1.22093 18.8181 1.61419 19.2114C2.00745 19.6047 2.54082 19.8256 3.09697 19.8256H14.6303C15.1864 19.8256 15.7198 19.6047 16.1131 19.2114C16.5063 18.8181 16.7273 18.2848 16.7273 17.7286V12.4862M15.2447 2.61577C15.4381 2.41548 15.6695 2.25573 15.9254 2.14583C16.1812 2.03593 16.4564 1.97808 16.7348 1.97567C17.0132 1.97325 17.2894 2.0263 17.5471 2.13174C17.8048 2.23718 18.0389 2.39288 18.2358 2.58977C18.4327 2.78666 18.5884 3.02079 18.6938 3.2785C18.7993 3.53621 18.8523 3.81234 18.8499 4.09078C18.8475 4.36921 18.7897 4.64437 18.6798 4.90021C18.5699 5.15605 18.4101 5.38744 18.2098 5.58088L9.20753 14.5832H6.24242V11.6181L15.2447 2.61577Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <p class="ml-2">Edits</p>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex w-full p-4 pl-8">
      <p class="flex-none text-center"> Showing 1 to 1 of 10 results </p>
      <div class="flex-1 text-end ml-12">

        <div class=" p-3">
          <button @click="prevent_count()" :class="this.count <= 10 ? 'opacity-25' : ''" :disabled="this.count <= 10"
            class=" rounded-xl  p-3 text-red-700">
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.79294 0.792969L0.0859375 6.49997L5.79294 12.207L7.20694 10.793L2.91394 6.49997L7.20694 2.20697L5.79294 0.792969Z"
                fill="#828282" />
            </svg>

          </button>
          {{ this.count / 10 }}
          <button @click="next_count()" :class="this.count + 1 >= this.max_obj ? 'opacity-25' : ''"
            :disabled="this.count + 1 >= this.max_obj" class=" rounded-xl p-3"><svg width="8" height="12" viewBox="0 0 8 12"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.414 11.414L7.121 5.707L1.414 0L0 1.414L4.293 5.707L0 10L1.414 11.414Z" fill="#828282" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
  <editmodal v-if="showEditModal" :form="edit_new" @closeModal="closeModal" @saveEdit="saveEdit" />
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>