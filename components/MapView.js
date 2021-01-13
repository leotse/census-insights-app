import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisseminationAreaByLngLat } from "../services/location";
import styles from "../styles/Map.module.css";
import { createEmptyGeometry } from "../utils";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView() {
  const mapViewId = "map-view";
  const selectedAreas = new Map();
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
        data: {
          type: "FeatureCollection",
          features: [createEmptyGeometry()],
        },
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
      if (area && selectedAreas.has(area.id)) {
        selectedAreas.delete(area.id);
      } else if (area) {
        selectedAreas.set(area.id, area);
      }

      const areas = [...selectedAreas.values()];
      map.getSource("current_area").setData({
        type: "FeatureCollection",
        features: areas,
      });
      dispatch({
        data: { areas },
        type: "DISSEMINATION_AREAS_CHANGED",
      });
    });
  }, []);

  return <div className={styles.map} id={mapViewId}></div>;
}
