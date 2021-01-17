import { fetchGET } from "../utils";

export function randomLocation() {
  const cities = [
    {
      lat: 51.05011,
      lng: -114.08529,
      name: "Calgary",
    },
    {
      lat: 45.50884,
      lng: -73.58781,
      name: "Montreal",
    },
    {
      lat: 45.41117,
      lng: -75.69812,
      name: "Ottawa",
    },
    {
      lat: 43.6532,
      lng: -79.3832,
      name: "Toronto",
    },
    {
      lat: 49.246292,
      lng: -123.116226,
      name: "Vancouver",
    },
  ];
  const index = Math.floor(Math.random() * cities.length);
  return cities[3];
}

export async function getDisseminationAreasByLngLats(lngLats) {
  const res = await fetchGET("http://localhost:8000/api/dissemination-areas-by-lnglats", {
    body: JSON.stringify(lngLats),
    force: true,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    method: "POST",
  });
  return res.json();
}
