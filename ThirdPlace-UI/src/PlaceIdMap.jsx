import.meta.env.GOOGLE_MAPS_API_KEY;

export default function MapSample() {

  let map;
  //collinsville library blum house
  let placeIdString = "ChIJh25wB-7_dYgR_PxH5m5ScMA";
  //park in collinsville
  let testCoords = "38.90595959069724, -90.1118910957208"

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { PlacesService } = await google.maps.importLibrary("places");
    const {LatLng} = await google.maps.importLibrary("core");
    const { Place } = await google.maps.importLibrary("places");

    // const coords = new google.maps.places.PlaceDetailsRequest
    // const place = PlacesService.getDetails();


//     service.getDetails(request, function(placeIdString, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         console.log(place);
//       } else {
//         console.error('Place details request failed due to ' + status);
//       }
// })



//geocode placeid 

const geocoder = new google.maps.Geocoder(); 

// function codeAddress() {
//   const placeId = "ChIJh25wB-7_dYgR_PxH5m5ScMA";
//   geocoder.geocode( { 'placeId': placeId}, function(results, status) {
//     if (status == 'OK') {
//       console.log((results[0].geometry.location));

//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }

// const placeId = "ChIJh25wB-7_dYgR_PxH5m5ScMA";

// function codeAddress({ 'placeId': placeId} ) {
//     geocoder
//     .geocode({ placeId: placeId })
//     .then(({ results }) => {
//       if (results[0]) {
//         console.log(results[0].geometry.location.lat());

//       } else {
//         window.alert("No results found");
//       }
//     })
//     .catch((e) => window.alert("Geocoder failed due to: " + e));
// }


// use Geocoding API  https://developers.google.com/maps/documentation/geocoding/requests-places-geocoding
// https://developers.google.com/maps/documentation/javascript/geocoding

// this works, but not when restricted to a domain
// fetch("https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJh25wB-7_dYgR_PxH5m5ScMA&key=AIzaSyDmLPjjsY0hUpSpZl9u7OV8vq1lwLYrL8A").then(function(response) {
//   response.json().then( function(json) {
//     console.log(json);} );
//   });





    map = new Map(document.getElementById("map"), {
      center:  new google.maps.LatLng(38.90595959069724, -90.1118910957208),
    //   center:  new google.maps.LatLng({testCoords}),
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


    //TODO grab place details, pick video back up at 3:11
    // https://www.youtube.com/watch?v=vAK5o8h8C28
    const request = {
      placeId: 'ChIJh25wB-7_dYgR_PxH5m5ScMA',
      fields: ['name', 'opening_hours']
    };
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);

  }

  // Pull formatted address from a PlaceId

  // async function getPlaceDetails(Place) {

  //   //use place details
  //   const place = new Place({
  //     id: placeIdString,
  //     requestedLanguage: "en", // optional
  //   });
    
  //   // Call fetchFields, passing the desired data fields.
  //   await place.fetchFields({
  //     fields: ["displayName", "formattedAddress", "location"],
  //   });
  //   // Log the result
  //   console.log(place.displayName);
  //   console.log(place.formattedAddress);
  //   console.log(place.location);

  //   };


  initMap();

  return (
    <>
      <div id="map" style={{ height: "260px", width: "260px" }}></div>
      <div></div>
    </>
  );
}
