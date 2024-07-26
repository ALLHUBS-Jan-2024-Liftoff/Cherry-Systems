import pin from "../../assets/map-pin.png";

export default function Address(props) {
  //TODO add pin

  let data = props;

  return (
    <>
      <img src={pin}/>
      <span className="gray-text"> {data.props.location_address}</span>
    </>
  );
}
