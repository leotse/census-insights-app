import { useSelector } from "react-redux";
import styles from "../styles/DataPanel.module.css";
import AgeGroupsChart from "./AgeGroupsChart";

export default function DataPanel() {
  const disseminationArea = useSelector((state) => state.map.selectedDisseminationArea);
  return !disseminationArea ? null : (
    <div className={styles.dataPanel}>
      <AgeGroupsChart />
    </div>
  );
}
