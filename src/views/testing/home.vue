<template>
    <div class=" container mx-auto p-8 rounded-xl min-h-screen pt-12 ">
        <p class="text-center uppercase text-white text-4xl font-bold mx-auto">
            something 
        </p>
        <Map></Map>
    </div>
</template>

<script>
import dotenv from 'dotenv';
import Map from './Map.vue';
import Review from './Review.vue';
export default {
    components: {
        Map,
        Review,
    },
    setup() {
            
        return {}
    },
}
</script>

<style lang="scss" scoped></style>