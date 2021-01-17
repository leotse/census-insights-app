export async function getAgeGroups(lngLats) {
  const res = await fetch("http://localhost:8000/api/stats_by_lnglats", {
    body: JSON.stringify(lngLats),
    headers: { "Content-Type": "application/json;charset=utf-8" },
    method: "POST",
  });
  return await res.json();
}
