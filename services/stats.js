import { fetchGET } from "../utils";

export async function getAgeGroups(lngLats) {
  const res = await fetchGET("http://localhost:8000/api/stats-by-lnglats", {
    body: JSON.stringify(lngLats),
    force: true,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    method: "POST",
  });
  return res.json();
}
