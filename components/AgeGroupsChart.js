import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { getAgeGroups } from "../services/stats";

export default function AgeGroupsChart() {
  const [data, setData] = useState(null);
  const lngLats = useSelector((state) => state.map.selectedLngLats);

  useEffect(async () => {
    if (lngLats.length === 0) {
      setData(null);
    } else {
      const ageGroups = await getAgeGroups(lngLats);
      const chartData = Object.keys(ageGroups)
        .filter((k) => k.indexOf("age_") === 0)
        .map((k) => ({ name: k.replace("age_", "").replace("_to_", "-"), value: ageGroups[k] }));
      setData(chartData);
    }
  }, [lngLats]);

  return !data ? null : (
    <BarChart width={350} height={150} data={data}>
      <XAxis dataKey="name" stroke="#dedede" />
      <YAxis type="number" stroke="#dedede" />
      <Bar dataKey="value" fill="#00aedb" />
    </BarChart>
  );
}
