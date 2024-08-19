import.meta.env.GOOGLE_MAPS_API_KEY;

export default function Minimap(props) {
  
  let map;
  let placeId = props.placeId;

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { PlacesService } = await google.maps.importLibrary("places");

    // Render Map div

    map = new Map(document.getElementById("map"), {
      zoom: 16,
      mapId: "DEMO_MAP_ID",
      disableDefaultUI: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
    });

    // Calls PlacesService via the PlaceDetailsRequest interface, and returns a PlaceResult object containing the field options
    
    const request = {
      placeId: placeId,
      fields: ["name", "geometry"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);

    function callback(place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {

        const marker = new AdvancedMarkerElement({
          map,
          position: place.geometry.location,
        });

        map.setCenter(marker.position);

      } else console.error("Callback function error");
    }
  }

  initMap();

  return (
    <>
      <div id="map" style={{ height: "260px", width: "260px" }}></div>
      <div></div>
    </>
  );
}
