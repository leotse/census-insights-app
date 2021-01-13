import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { getAgeGroups } from "../services/stats";

export default function AgeGroupsChart() {
  const [data, setData] = useState(null);
  const areas = useSelector((state) => state.map.selectedDisseminationAreas);
  useEffect(async () => {
    if (areas.length === 0) {
      setData(null);
    } else {
      const daIds = areas.map((a) => a.dissemination_area_id);
      const ageGroups = await getAgeGroups(daIds);
      const chartData = Object.keys(ageGroups)
        .filter((k) => k.indexOf("age_") === 0)
        .map((k) => ({ name: k.replace("age_", "").replace("_to_", "-"), value: ageGroups[k] }));
      setData(chartData);
    }
  }, [areas]);
  return !data ? null : (
    <BarChart width={300} height={150} data={data}>
      <XAxis dataKey="name" />
      <YAxis type="number" />
      <Bar dataKey="value" fill="#00aedb" />
    </BarChart>
  );
}
