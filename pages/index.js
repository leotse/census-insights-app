import Head from "next/head";
import DataPanel from "../components/DataPanel";
import MapView from "../components/MapView";
import { randomLocation } from "../services/location";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Census Insights</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MapView />
        <DataPanel />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const startLocation = randomLocation();
  return {
    props: { startLocation },
  };
}
