<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="planets"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.resident_count="{ item }">
        {{ item.residents.length }}
      </template>
      <template v-slot:item.name="{ item }">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
      </template>
      <template v-slot:item.water_math="{ item }">
        {{ surfaceAreaOfWater(item.diameter, item.surface_water) }}
      </template>
    </v-data-table>
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
    };
  },
  async created() {
    let response = await fetch("https://swapi.dev/api/planets/");
    let data = await response.json();
    console.log(data);

    this.planets = data.results;
  },
  methods: {
    surfaceAreaOfWater(diameter, surface_water) {
      const pi = 3.14159;
      const radius = diameter / 2;
      let surface = 4 * pi * radius * radius;
      let result = surface * surface_water;
      return Math.round(result);
    },
  },
};
</script>
