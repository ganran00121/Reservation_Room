<template>
  <!-- <div class="relative ">
    <img src="../assets/bg-2.png" alt=""
      class="absolute -translate-y-[5rem] translate-x -z-10  object-cover w-full">
  </div> -->
  <div class=" container mx-auto p-8 rounded-xl h-screen pt-24 ">
    <p class="text-center uppercase text-white text-4xl font-bold "> Computer Science CMU<br>
      Classroom booking system
    </p>
    <p class="text-white text-center text-gray-500 pt-4">Using the department calendar, you can view reserved rooms,
      including classrooms. Additionally,
      <br> you can schedule various activities within the calendar for the upcoming semester.
    </p>

    <div class="flex  text-white">
      <div class="flex-1 text-center my-auto">
        <div class="grid">
          <div class="animate-bounce  w-6 h-6 mx-auto pb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
          <div>
            <button ><p class="bg-sky-400 p-3 rounded-xl my-3 text-lg">Get started</p></button>
          </div>
        </div>
      </div>
      <div class="flex-1 p-20">
        <img src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1" class="mx-auto" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  },

}
</script>

<style>
img {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>