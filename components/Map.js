import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMap from "../hooks/map";
import styles from "../styles/Map.module.css";
import { createEmptyGeometry } from "../utils";

export default function Map() {
  const dispatch = useDispatch();
  const { mapInstance, selectedLocation } = useSelector((state) => state.map);
  useEffect(async () => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      const res = await fetch(`http://localhost:8000/api/dissemination-area?lng=${lng}&lat=${lat}`);
      const area = await res.json();

      // update map overlay
      // ideally this should be updated using disseminationArea redux state
      // but can't figure out how to return map instance from map hooks yet
      mapInstance.getSource("current_area").setData({
        type: "Feature",
        geometry: area ? area.geometry : createEmptyGeometry(),
      });

      dispatch({
        data: { disseminationArea: area },
        type: "DISSEMINATION_AREA_SELECTED",
      });
    }
  }, [dispatch, selectedLocation]);
  useMap();
  return <div className={styles.map} id="map-view"></div>;
}
