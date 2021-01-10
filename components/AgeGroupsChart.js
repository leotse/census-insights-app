import { Bar, BarChart } from "recharts";

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
  const data = generateData();
  return (
    <BarChart width={200} height={50} data={data}>
      <Bar dataKey="uv" fill="#00aedb" />
    </BarChart>
  );
}
