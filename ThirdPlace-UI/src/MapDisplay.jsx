import React, { useEffect } from "react";
import.meta.env.GOOGLE_MAPS_API_KEY;

export default function MapSample() {

  let map;

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
      center: { lat: 38.60, lng: -90.24 },
      zoom: 16,
      mapId: 'DEMO_MAP_ID',
      disableDefaultUI: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
    });

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: 38.60, lng: -90.24 },
    });


  }

  initMap();

  return (
    <>
      <div id="map" style={{ height: "260px", width: "260px" }}></div>

      {/* Web Component code, not currently functional */}
      {/* <gmp-map
    center="37.4220656,-122.0840897"
    zoom="10"
    map-id="map"
    // style={{height: "400px"}}
    ></gmp-map> */}
    </>
  );
}
