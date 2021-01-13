import { useSelector } from "react-redux";
import styles from "../styles/DataPanel.module.css";
import AgeGroupsChart from "./AgeGroupsChart";

export default function DataPanel() {
  const areas = useSelector((state) => state.map.selectedDisseminationAreas);
  return areas.length === 0 ? null : (
    <div className={styles.dataPanel}>
      <AgeGroupsChart />
    </div>
  );
}
