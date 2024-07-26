import Address from "./Address"

export default function CondensedSubmission(props) {
    //TODO pass in props

    let data = props;

    return (
       
        <div className="review-card">
            <h6>{data.props.location_name}</h6>
            <Address props={data.props}/>
        </div>

    
    )
}