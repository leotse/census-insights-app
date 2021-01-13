export async function getAgeGroups(daIds) {
  const q = daIds.map((daId) => `dissemination_area_ids=${daId}`).join("&");
  const res = await fetch(`http://localhost:8000/api/stats?${q}`);
  return await res.json();
}
