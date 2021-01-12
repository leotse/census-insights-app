export async function getAgeGroups(disseminationAreaId) {
  const res = await fetch(`http://localhost:8000/api/stats?dissemination_area_id=${disseminationAreaId}`);
  return await res.json();
}
