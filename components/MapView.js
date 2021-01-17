import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisseminationAreasByLngLats } from "../services/location";
import styles from "../styles/Map.module.css";
import { createEmptyGeometry } from "../utils";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView() {
  const mapViewId = "map-view";
  const dispatch = useDispatch();
  const startLocation = useSelector((state) => state.startLocation);
  const lngLats = useSelector((state) => state.map.selectedLngLats);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
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
      setMapInstance(map);
    });

    map.on("click", (e) => {
      const { lat, lng } = e.lngLat;
      dispatch({
        data: { lngLat: { lng, lat } },
        type: "LNGLATS_ADD",
      });
    });
  }, []);

  useEffect(async () => {
    if (!mapInstance) {
      return;
    }
    const selectedAreas = await getDisseminationAreasByLngLats(lngLats);
    const areas = [...selectedAreas.values()];
    mapInstance.getSource("current_area").setData({
      type: "FeatureCollection",
      features: areas,
    });
  }, [mapInstance, lngLats]);

  return <div className={styles.map} id={mapViewId}></div>;
}
