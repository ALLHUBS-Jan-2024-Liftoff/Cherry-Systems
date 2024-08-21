import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import React, { useState, useEffect, useRef, useCallback } from "react";

async function initAutoComplete(inputRef, onPlaceChanged) {
  const { Autocomplete } = await google.maps.importLibrary("places");

  const autocomplete = new google.maps.places.Autocomplete(
    // document.getElementById("autocomplete"),
    inputRef,
    {
      fields: ["formatted_address", "place_id", "geometry"],
    }
  );

  //trigger place selection handler
  autocomplete.addListener("place_changed", () =>
    onPlaceChanged(autocomplete.getPlace())
  );

  return autocomplete;
}

export default function AddressBar({
  address,
  setAddress,
  placeId,
  setPlaceId,
  defaultAddressValue
}) {
  const [autocomplete, setAutocomplete] = useState(),
  inputRef = useRef(null);

  // useCallback hook prevents unnecessary recreation of function with each re-render
  const onPlaceChanged = useCallback(
    (place) => {
      if (!place) {
        console.log(place);
        return;
      }

      //TODO: block users from posting form without valid place geometry

      // if (!place.geometry) {
      //   console.log("NOT valid address");
      //   console.log(`place name: ${place.name}`)
      // } else {
      //   console.log(`valid address found: ${place.name}`);

      setPlaceId(place.place_id);
      setAddress(place.formatted_address);
    },
    [setPlaceId, setAddress]
  );

  useEffect(() => {
    (async () => {
      if (inputRef.current == null) return;
      else {
        const ac = await initAutoComplete(
          inputRef.current,
          onPlaceChanged
        ).catch((ex) => {
          throw Error(`initAutoComplete: ${ex.toString()}`);
        });
        setAutocomplete(ac);
      }
    })();
  }, [inputRef.current, onPlaceChanged]);

  return (
    <>
      <label>
        {defaultAddressValue ? "Click & Confirm or Edit Address:" : "Address: "}
         <br></br>
        <input
          name="locationAddress"
          id="autocomplete"
          ref={inputRef}
          onChange={onPlaceChanged}
          placeholder="Enter valid address..."
          defaultValue={defaultAddressValue ? defaultAddressValue : ""}
          className='text-input-field'
          required
        />
      </label>
    </>
  );
}
