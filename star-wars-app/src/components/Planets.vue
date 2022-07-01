<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="planets"
      :items-per-page="5"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="elevation-1;"
    >
      <template v-slot:item.name="{ item }">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
      </template>
      <template v-slot:item.resident_count="{ item }">
        {{ item.residents.length }}
      </template>
      <template v-slot:item.population="{ item }">
        {{ textFormatter(item.population) }}
      </template>
      <template v-slot:item.water_math="{ item }">
        {{
          textFormatter(surfaceAreaOfWater(item.diameter, item.surface_water))
        }}
      </template>
    </v-data-table>
    <v-dialog v-model="loading">
      <v-card>
        <v-card-title>Loading...</v-card-title>
        <v-card-text><p>Please Wait.</p></v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="error">
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text>
          <h2>{{ errorMessage }}</h2>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="error = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import fetchPlanets from "@/api";

export default {
  name: "Planets",
  components: {},
  data() {
    return {
      planets: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Climate", value: "climate" },
        { text: "Resident Count", value: "resident_count" },
        { text: "Terrains", value: "terrain" },
        { text: "Population", value: "population" },
        { text: "Surface Covered In Water", value: "water_math" },
      ],
      loading: true,
      error: false,
      errorMessage: "Response was not okay, error getting data.",
      sortBy: "name",
      sortDesc: false,
    };
  },
  async created() {
    let response = await fetch("https://swapi.dev/api/planets");
    console.log(response);
    if (!response.ok) {
      this.error = true;
    } else {
      let data = await response.json();
      this.planets = data.results;
    }
    this.loading = false;
  },
  methods: {
    surfaceAreaOfWater(diameter, surface_water) {
      const pi = 3.14159;
      const radius = diameter / 2;
      let surface = 4 * pi * radius * radius;
      let preResult = surface * surface_water;
      let roundedResult = Math.round(preResult);
      return roundedResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    textFormatter(text) {
      if (text === "unknown" || text === "NaN") {
        return "?";
      } else if (text.length > 3) {
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      } else {
        return text;
      }
    },
  },
};
</script>

<style scoped>
.myTable .v-table tbody tr td {
  color: gray;
  padding: 1px;
  background-color: pink;
}
</style>
