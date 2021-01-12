import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, BarChart, YAxis, XAxis } from "recharts";
import { getAgeGroups } from "../services/stats";

const r = () => Math.floor((Math.random() * 10000) / 5 + 2000);
const generateData = () => {
  return [
    {
      name: "Page A",
      uv: r(),
    },
    {
      name: "Page B",
      uv: r(),
    },
    {
      name: "Page C",
      uv: r(),
    },
    {
      name: "Page D",
      uv: r(),
    },
    {
      name: "Page E",
      uv: r(),
    },
    {
      name: "Page F",
      uv: r(),
    },
    {
      name: "Page G",
      uv: r(),
    },
  ];
};

export default function AgeGroupsChart() {
  const [data, setData] = useState(null);
  const disseminationArea = useSelector((state) => state.map.selectedDisseminationArea);
  useEffect(async () => {
    if (!disseminationArea) {
      setData(null);
    } else {
      const daid = disseminationArea.dissemination_area_id;
      const ageGroups = await getAgeGroups(daid);
      const chartData = Object.keys(ageGroups)
        .filter((k) => k.indexOf("age_") === 0)
        .map((k) => ({ name: k.replace("age_", "").replace("_to_", "-"), value: ageGroups[k] }));
      setData(chartData);
    }
  }, [disseminationArea]);
  console.log("render age groups", data);
  return !data ? null : (
    <BarChart width={300} height={150} data={data}>
      <XAxis dataKey="name" />
      <YAxis type="number" />
      <Bar dataKey="value" fill="#00aedb" />
    </BarChart>
  );
}
