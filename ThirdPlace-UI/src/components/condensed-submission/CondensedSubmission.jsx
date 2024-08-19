import CategoryBadges from "../submission/CategoryBadges";
import Address from "./Address"
import { Link } from "react-router-dom";


export default function CondensedSubmission(props) {

    //TODO clicking submission routes to its submission listing page
    

    let data = props;

    let singleSubmission = data.props;
    

    const renderStars = (rating) => {
        if (rating === 0) {
            return "No reviews yet!";
        }
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push("⭐");
        }
        if (halfStar) {
            stars.push("⭐");
        }

        return stars.join("") + (" " + rating);
    };

    return (
        <>
            <td>
                <h6> <Link to={`../${data.props.locationName}`}> {data.props.locationName} </Link> </h6>
                <Address props={data.props}/>
                <br/>
                <CategoryBadges props={singleSubmission}/>
            </td>
            <td>{renderStars(data.props.averageRating)}</td>
        </>
    
    )
}