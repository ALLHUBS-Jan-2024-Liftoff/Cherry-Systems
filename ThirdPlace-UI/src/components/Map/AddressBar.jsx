import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import React, {useState, useEffect} from 'react';


async function initAutoComplete() {

  const {Autocomplete} = await google.maps.importLibrary("places");

  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      fields: ["formatted_address", "place_id", "geometry"]
    }
  );

  //trigger place selection handler
  // autocomplete.addListener("place_changed", onPlaceChanged);

  return autocomplete.getPlace();
//if you need to call getplace again, call in onplacechanged handler
}

export default function AddressBar({address, setAddress, placeId, setPlaceId}) {

  const [place, setPlace] = useState();

  useEffect(() => {
    (async () => setPlace(await initAutoComplete()))();
  }, []);

//TODO write handler for place selection checking if a valid selection is made, and if so, grab placeId
function onPlaceChanged() {

  if (!place) {
    return;
  }

  // const place = autocomplete.getPlace();
  console.log(`place name: ${place.formatted_address}`)
  console.log(`place geometry: ${place.geometry}`)
  console.log(`place id: ${place.place_id}`)

  if (!place.geometry) {
    // document.getElementById("autocomplete").value = "Enter valid address...";
    console.log("NOT valid address");
    console.log(`place name: ${place.name}`)
  } else {
    console.log(`valid address found: ${place.name}`);
    
    setPlaceId(place.place_id);
    setAddress(place.formatted_address);
  }
}
console.log(`place id and address hook values outside functions: ${placeId}, ${address}`);

//TODO: block users from posting form without valid place geometry: validate with a boolean useState hook passed up to parent?
//TODO: save PlaceId as a value for back end

  return (
    <>
            <label>
              Address: <br></br>
              <input name="locationAddress" 
              id="autocomplete"
              onChange={onPlaceChanged}
              placeholder="Enter valid address..."
            />
            </label>
    </>
  );
}
