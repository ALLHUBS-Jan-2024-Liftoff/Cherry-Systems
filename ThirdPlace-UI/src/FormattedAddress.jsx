import.meta.env.GOOGLE_MAPS_API_KEY;

export default function FormattedAddress() {
  //collinsville library blum house
  let placeIdString = "ChIJh25wB-7_dYgR_PxH5m5ScMA";

  async function formatAddress() {
    // Pull formatted address from a PlaceId
    const { Place } = await google.maps.importLibrary("places");

    let placeAddress = JSON.stringify(getPlaceDetails(Place));
    console.log("formataddress print:");
    console.log(placeAddress);
    console.log(typeof(placeAddress));
    return placeAddress;
  }

  async function getPlaceDetails(Place) {
    //use place details
    const place = new Place({
      id: placeIdString,
      requestedLanguage: "en", // optional
    });

    // Call fetchFields, passing the desired data fields.
    await place.fetchFields({
      fields: ["displayName", "formattedAddress", "location"],
    });
    // Log the result
    console.log(place.displayName);
    console.log(place.formattedAddress);
    console.log(place.location);

    let addressString = JSON.stringify(place.formattedAddress);
    console.log("getPlaceDetails object print:");
    console.log(addressString);
    console.log(typeof(addressString));
    return addressString;
  }


  //TODO Make sure the React child component is printing the string for the readable address.

  let address = JSON.stringify(formatAddress());
  console.log("child object print:");
  console.log(address)
  console.log(typeof(address));


  return (
    <>
      <div className="gray-text">{address}</div>
    </>
  );
}