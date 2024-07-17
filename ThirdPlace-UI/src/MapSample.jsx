import React, {useEffect} from 'react';
import.meta.env.GOOGLE_MAPS_API_KEY;

export default function MapSample() {

    let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();

    return (

        <>
        <div id="map" style={{height: "400px", width: "400px"}}></div>

        <gmp-map
    center="37.4220656,-122.0840897"
    zoom="10"
    map-id="map"
    // style={{height: "400px"}}
    ></gmp-map>

        <p>MapSample test copy</p>
        </>
    );

}