import CategoryBadges from "../submission/CategoryBadges";
import Address from "./Address"
import { Link } from "react-router-dom";
import StarRating from "../submission/StarRating";

export default function CondensedSubmission(props) {

    //TODO clicking submission routes to its submission listing page
    
    
    let data = props;

    let singleSubmission = data.props;
    

    return (
        <>
            <td>
                <h6> <Link className="link-css" to={`../${data.props.locationName}`}> {data.props.locationName} </Link> </h6>
                <Address props={data.props.locationAddress}/>

                <br/>
                <CategoryBadges props={singleSubmission}/>
            </td>
            <td><StarRating rating={data.props.averageRating} /></td>
        </>
    
    )
}