import AgeGroupsChart from "./AgeGroupsChart";
import styles from "../styles/DataPanel.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function DataPanel() {
  const disseminationArea = useSelector((state) => state.map.selectedDisseminationArea);
  useEffect(async () => {
    // get dissemination area stats
    if (disseminationArea) {
      const daid = disseminationArea.dissemination_area_id;
      const res_stats = await fetch(`http://localhost:8000/api/stats?dissemination_area_id=${daid}`);
      const stats = await res_stats.json();
      console.log(stats);
    }
  });
  return (
    <div className={styles.dataPanel}>
      <AgeGroupsChart />
    </div>
  );
}
