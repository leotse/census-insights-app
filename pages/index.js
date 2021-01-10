import Head from "next/head";
import { useState } from "react";

import AgeGroupsChart from "../components/AgeGroupsChart";
import useMap from "../hooks/map";
import { createEmptyGeometry } from "../utils";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [stats, setStats] = useState(null);
  useMap({
    onClick: async (e, map) => {
      const { lng, lat } = e.lngLat;
      const res_da = await fetch(`http://localhost:8000/api/dissemination-area?lng=${lng}&lat=${lat}`);
      const da = await res_da.json();

      // update map overlay
      map.getSource("current_area").setData({
        type: "Feature",
        geometry: da ? da.geometry : createEmptyGeometry(),
      });

      // get dissemination area stats
      if (!da) {
        setStats(null);
      } else {
        const res_stats = await fetch(
          `http://localhost:8000/api/stats?dissemination_area_id=${da.dissemination_area_id}`
        );
        const stats = await res_stats.json();
        setStats(stats);
      }
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Census Insights</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.map} id="map-view"></div>
        {!stats ? null : (
          <div className={styles.dataPanel}>
            <AgeGroupsChart />
          </div>
        )}
      </main>
    </div>
  );
}
