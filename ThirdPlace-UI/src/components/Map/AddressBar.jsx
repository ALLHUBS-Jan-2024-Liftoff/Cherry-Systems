import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import React, {useState, useRef} from 'react';


export default function AddressBar({address, setAddress, placeId, setPlaceId}) {

  let autocomplete;
  
async function initAutoComplete() {

    const {Autocomplete} = await google.maps.importLibrary("places");

    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        fields: ["name", "place_id", "geometry"]
      }
    );
    //trigger place selection handler
    autocomplete.addListener("place_changed", onPlaceChanged);

}
//TODO delete when passed up
// const [address, setAddress] = useState("");
// const [placeId, setPlaceId] = useState("");
// const inputRef = useRef(null);

//TODO write handler for place selection checking if a valid selection is made, and if so, grab placeId
function onPlaceChanged() {
  const place = autocomplete.getPlace();
  console.log(`place name: ${place.name}`)
  console.log(`place geometry: ${place.geometry}`)
  console.log(`place id: ${place.place_id}`)


  if (!place.geometry) {
    document.getElementById("autocomplete").value = "Enter valid address...";
    console.log("NOT valid address");
    console.log(`place name: ${place.name}`)
    // console.log(`inputRef: ${inputRef.current.value}`);
  } else {
    // document.getElementById("details").innerHTML = place.name;
    console.log(`valid address found: ${place.name}`);
    
    setPlaceId(place.place_id);
    setAddress(place.name);

    // state value not initialized
    console.log(`place id and address hook values: ${placeId}, ${address}`);

  }
}
console.log(`place id and address hook values outside functions: ${placeId}, ${address}`);

//TODO: block users from posting form without valid place geometry
//TODO: save PlaceId as a value for back end

  initAutoComplete();


  return (
    <>
            <label>
              Address: <br></br>
              <input name="locationAddress" 
              id="autocomplete"
              placeholder="Enter valid address..."
              // ref={inputRef}
            />
            </label>
    </>
  );
}
