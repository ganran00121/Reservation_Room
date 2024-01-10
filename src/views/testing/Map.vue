<!-- src/components/YourMapComponent.vue -->
<template>
  <div>
    <button @click="check">AAAA!</button>
    <div class="flex w-full gap-2">
      <input v-model="currentPosition.lng"  type="text"
        class="px-2 appearance-none outline-none w-full text-gray-800 py-2 rounded-lg" />
        <input v-model="currentPosition.lat"  type="text"
        class="px-2 appearance-none outline-none w-full text-gray-800 py-2 rounded-lg" />
    </div>
    <div ref="map" style="height: 400px;"></div>

  </div>
</template>

<script>
import { watchEffect, ref, defineComponent } from "vue";
import dotenv from 'dotenv'
export default {
  setup() {
    
    const currentPosition = ref({lat: null, lng: null,}); // before location
    const newPosition = ref({lat: null, lng: null,}) // for new location
    const loadGoogleMapsAPI = () => {
      return new Promise((resolve) => {
        if (typeof google !== "undefined") {
          // Google Maps API ถูกโหลดแล้ว
          resolve();
        } else {
          // ยังไม่โหลด ให้โหลด
          const script = document.createElement("script");
          script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcqf2oTW1ekEhs-0hljFSQ_ENmeQ7-2Qo";
          script.onload = resolve;
          document.head.appendChild(script);
        }
      });
    };

    const getCurrentLocation = async () => {
      // โหลด Google Maps API ก่อน
      await loadGoogleMapsAPI();

      if (navigator.geolocation) {
        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              currentPosition.value.lat = position.coords.latitude
              currentPosition.value.lng =  position.coords.longitude
              test.value = position.coords.latitude
              console.log(position.coords.latitude);
              console.log(position.coords.longitude);
              resolve();
            },
            (error) => {
              console.error(error.message);
              resolve();
            }
          );
        });

      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    const check = () => {
      console.log(currentPosition)
      console.log(currentPosition.lat)
      console.log(currentPosition.lng)
      console.log(test);
    }
    getCurrentLocation();
    console.log(currentPosition);
    watchEffect(() => {
    console.log(currentPosition);
    });
    return {
      currentPosition,
      check
    };
  },
};
</script>

<style lang="scss" scoped></style>
