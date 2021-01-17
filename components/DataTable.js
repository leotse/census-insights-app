import { useEffect, useState } from "react";
import "react-data-grid/dist/react-data-grid.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/DataTable.module.css";

const r = () => {
  return Math.floor(Math.random() * 495 + 5);
};

const columns = [
  { key: "lng", name: "Lng" },
  { key: "lat", name: "Lat" },
  { key: "weight", name: "Weight" },
];

const randomInRange = (x, y) => {
  const left = Math.min(x, y);
  const right = Math.max(x, y);
  const range = right - left;
  return left + range * Math.random();
};

const randomLngLat = (lng1, lat1, lng2, lat2) => {
  return {
    lng: randomInRange(lng1, lng2),
    lat: randomInRange(lat1, lat2),
  };
};

const randomLngLatToronto = () => {
  return randomLngLat(-79.43539886505013, 43.65012678601712, -79.35696503848673, 43.65984823530311);
};

export default function DataTable() {
  const dispatch = useDispatch();
  const lngLats = useSelector((state) => state.map.selectedLngLats);
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    setCanRender(true);
  }, []);

  const reset = () => {
    dispatch({
      data: { lngLats: [] },
      type: "LNGLATS_SET",
    });
  };

  const addRow = () => {
    const lngLat = randomLngLatToronto();
    dispatch({
      data: { lngLat },
      type: "LNGLATS_ADD",
    });
  };

  return !canRender ? null : (
    <>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((c) => (
              <td key={c.key}>{c.name}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {lngLats.map((r, i) => (
            <tr key={i}>
              <td>
                <input value={r.lng} readonly={true}></input>
              </td>
              <td>
                <input value={r.lat} readonly={true}></input>
              </td>
              <td>
                <input value={1} readOnly={true}></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className={styles.buttons}>
        <button className={styles.add} onClick={addRow}>
          +
        </button>
        <button className={styles.reset} onClick={reset}>
          reset
        </button>
      </section>
    </>
  );
}
