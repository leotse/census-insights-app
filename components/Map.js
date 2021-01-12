import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisseminationAreaByLngLat } from "../services/location";
import styles from "../styles/Map.module.css";
import { createEmptyGeometry } from "../utils";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map() {
  console.log("render map");
  const mapViewId = "map-view";
  const dispatch = useDispatch();
  const startLocation = useSelector((state) => state.startLocation);
  useEffect(async () => {
    const map = new mapboxgl.Map({
      center: [startLocation.lng, startLocation.lat],
      container: mapViewId,
      style: "mapbox://styles/mapbox/dark-v10",
      zoom: 12,
    });

    map.on("load", () => {
      map.addSource("current_area", {
        type: "geojson",
        data: { type: "Feature", geometry: createEmptyGeometry() },
      });
      map.addLayer({
        id: "current_area",
        source: "current_area",
        type: "fill",
        paint: {
          "fill-color": "#00aedb",
          "fill-opacity": 0.5,
        },
      });
    });

    map.on("click", async (e) => {
      const { lat, lng } = e.lngLat;
      const area = await getDisseminationAreaByLngLat(lng, lat);
      map.getSource("current_area").setData({
        type: "Feature",
        geometry: area ? area.geometry : createEmptyGeometry(),
      });
      dispatch({
        data: { disseminationArea: area },
        type: "DISSEMINATION_AREA_SELECTED",
      });
    });
  }, []);
  return <div className={styles.map} id={mapViewId}></div>;
}
