<script>
import { watchEffect, ref, defineComponent } from "vue";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import helloworld from "../components/HelloWorld.vue";

export default {

  components: {
    helloworld
  },
  setup() {
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
  }
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