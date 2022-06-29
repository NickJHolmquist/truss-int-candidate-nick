<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Planets />
  </div>
</template>

<script>
// @ is an alias to /src
import Planets from "@/components/Planets.vue";

export default {
  name: "HomeView",
  components: {
    Planets,
  },
};
</script>
