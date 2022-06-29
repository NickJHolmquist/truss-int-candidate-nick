const getPlanets = async () => {
  const response = await fetch("https://swapi.dev/api/planets/");
  const planets = await response.json();
  return planets;
};

async function fetchPlanets() {
  let response = await fetch("https://swapi.dev/api/planets/");
  const planets = await response.json();
  return planets;
}

export { fetchPlanets };
