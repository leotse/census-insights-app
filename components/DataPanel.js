import styles from "../styles/DataPanel.module.css";
import AgeGroupsChart from "./AgeGroupsChart";
import DataTable from "./DataTable";

export default function DataPanel() {
  return (
    <div className={styles.dataPanel}>
      <DataTable />
      <AgeGroupsChart />
    </div>
  );
}
