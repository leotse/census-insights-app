import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmptyGeometry } from "../utils";

// inits mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function useMap() {
  const dispatch = useDispatch();
  const startLocation = useSelector((state) => state.startLocation);
  useEffect(() => {
    const map = new mapboxgl.Map({
      center: [startLocation.lng, startLocation.lat],
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

    map.on("click", (e) =>
      dispatch({
        data: {
          location: {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
          },
          map: map,
        },
        type: "MAP_CLICK",
      })
    );
  }, []);
}
