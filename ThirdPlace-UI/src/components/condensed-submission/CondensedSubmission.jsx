import Address from "./Address"

export default function CondensedSubmission(props) {

    //TODO clicking submission routes to its submission listing page

    let data = props;

    return (
       <>
        <td>
            <h6>{data.props.locationName}</h6>
            <Address props={data.props}/>
        </td>
    {/* //TODO display average star rating */}
        <td>⭐⭐⭐⭐⭐</td>
        </>
    
    )
}