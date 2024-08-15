import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import React, {useState} from 'react';


export default function AddressBar() {

  let autocomplete;

  //TODO investigate number of API calls 
  
async function initAutoComplete() {

    const {Autocomplete} = await google.maps.importLibrary("places");

    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        fields: ["name", "place_id"]
      }
    );
    //trigger place selection handler
    // autocomplete.addListener("place_changed", onPlaceChanged);
}


const [address, setAddress] = useState("");
const [placeId, setPlaceId] = useState("");

//TODO write handler for place selection checking if a valid selection is made, and if not, grab placeId
// function onPlaceChanged() {
//   const place = autocomplete.getPlace();

//   if (!place.geometry) {
//     document.getElementById("autocomplete").placeholder = "Enter valid address...";
//   } else {
//     document.getElementById("details")
//   }
// }



  // const handleSubmit = (event) => {
    // event.preventDefault();
  // }

  initAutoComplete();


  return (
    <>
      <div className="review-card">
        <form>
          <div className="form-group">
            <label>
              Address <br></br>
              <input name="locationAddress" 
              id="autocomplete"
              placeholder="Enter valid address..."
              value={address}
              onChange= {(e) => setAddress(e.target.value)}/>
            </label>
          </div>
          <input
            type="submit"
            className="submit-button"
            value="Submit Location"
          />
        </form>
      </div>
    </>
  );
}
