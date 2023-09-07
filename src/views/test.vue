<script>
import { watchEffect, ref, defineComponent } from "vue";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import helloworld from "../components/HelloWorld.vue";

export default {

  components: {
    helloworld
  },
  setup() {
    const interval = setInterval(fetchReservations, 60000);

    onBeforeUnmount(() => {
      clearInterval(interval);
    });
    const myMap = new Map([
      ["A", 1],
      ["B", 2]
    ]);

    // what's built into Map for you
    myMap.forEach((val, key) => console.log(key, val)); // "A 1", "B 2"

    // what Array can do for you
    Array.from(myMap).map(([key, value]) => ({ key, value })); // [{key:"A", value: 1}, ... ]

    // less awesome iteration
    let entries = myMap.entries();
    for (let entry of entries) {
      console.log(entry);
    }
    return {
    }
  },
  methods: {
    showAlert: function () {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/users');
      console.log(response);
      this.max_obj = this.data.length;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
}
</script>
<template>
  <button @click="showAlert">Hello world</button>
  <helloworld />
</template>
<style>
body {
  color: black;
  background-color: black;
}
</style>