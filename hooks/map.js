import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import mapboxStyles from "mapbox-gl/dist/mapbox-gl.css";

import { createEmptyGeometry } from "../utils";

// inits mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function useMap({ onClick }) {
  useEffect(() => {
    const map = new mapboxgl.Map({
      center: [-79.3832, 43.6532],
      container: "map-view",
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
    map.on("click", (e) => onClick(e, map));
  }, []);
}
