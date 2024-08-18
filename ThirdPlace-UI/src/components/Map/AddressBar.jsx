import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import React, {useState, useEffect, useRef, useCallback} from 'react';


async function initAutoComplete(inputRef, onPlaceChanged) {

  const {Autocomplete} = await google.maps.importLibrary("places");

  const autocomplete = new google.maps.places.Autocomplete(
    // document.getElementById("autocomplete"),
    inputRef, 
    {
      fields: ["formatted_address", "place_id", "geometry"]
    }
  );

  //trigger place selection handler
  autocomplete.addListener("place_changed", () => onPlaceChanged(autocomplete.getPlace()));

  return autocomplete;
//if you need to call getplace again, call in onplacechanged handler
}

export default function AddressBar({address, setAddress, placeId, setPlaceId}) {

  const [autocomplete, setAutocomplete] = useState(),
  inputRef = useRef(null);

//TODO write handler for place selection checking if a valid selection is made, and if so, grab placeId
const onPlaceChanged = useCallback((place) => {

  if (!place) {
    console.log(place);
    return;
  }
  
  console.log(`autocomplete: ${place}`);
  // console.log(`autocomplete.getplace(): ${autocomplete.getPlace()}`);
  console.log(`autocomplete.getplace().place_id: ${place.place_id}`)
  console.log(`autocomplete.getplace().address: ${place.formatted_address}`)

  // const place = autocomplete.getPlace();
  // console.log(`autocomplete.getplace().place_id: ${place.place_id}`)


  // // const place = autocomplete.getPlace();
  // console.log(`place name: ${place.formatted_address}`)
  // console.log(`place geometry: ${place.geometry}`)
  // console.log(`place id: ${place.place_id}`)

  // if (!place.geometry) {
  //   // document.getElementById("autocomplete").value = "Enter valid address...";
  //   console.log("NOT valid address");
  //   console.log(`place name: ${place.name}`)
  // } else {
  //   console.log(`valid address found: ${place.name}`);
    
    setPlaceId(place.place_id);
    setAddress(place.formatted_address);
  // }
}, [setPlaceId, setAddress]);

useEffect(() => {
(async () => {
if (inputRef.current == null) 
  return;
else {
  const ac = await initAutoComplete(inputRef.current, onPlaceChanged).catch(ex => {
    throw Error(`initAutoComplete: ${ex.toString()}`);
  });
  setAutocomplete(ac);
}
})();
}, [inputRef.current, onPlaceChanged]);


console.log(`place id and address hook values outside functions: ${placeId}, ${address}`);




//TODO: block users from posting form without valid place geometry: validate with a boolean useState hook passed up to parent?
//TODO: save PlaceId as a value for back end

  return (
    <>
            <label>
              Address: <br></br>
              <input name="locationAddress" 
              id="autocomplete"
              ref={inputRef}
              onChange={onPlaceChanged}
              placeholder="Enter valid address..."
            />
            </label>
    </>
  );
}
