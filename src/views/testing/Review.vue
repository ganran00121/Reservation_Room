<template>
  <div>
    <p>{{ responseData }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  setup() {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=18.31879467243984,99.39783862194813&radius=100000&type=tourist_attraction&key=AIzaSyCqkOQW0vrz8Lvc7GRjnJ8o_YIYFMa6gxs");
        console.log(response.data);
        return response.data; // Return the data to use in the template
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const responseData = fetchData(); // Call the function

    return {
      responseData,
    };
  },
};
</script>

<style lang="scss" scoped></style>
