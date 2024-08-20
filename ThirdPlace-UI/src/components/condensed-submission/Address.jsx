import pin from "../../assets/map-pin.png";

export default function Address(props) {

  let data = props;

  return (
    <>
      <img src={pin}/>
      <span className="gray-text"> {data.props}</span>
    </>
  );
}
