import React from 'react'
import { Link } from 'react-router-dom'
import RateAndReview from './RateAndReview'

export default function SubmissionForm() {
    return (
        <>
            <form method="post">
                <div className="form-group">
                    <label>Location Name <br></br>
                        <input name="locationName" />
                    </label>
                </div>
                <div className="form-group">
                    <label>Address <br></br>
                        <input name="locationAddress" />
                    </label>
                </div>
                <div className="form-group">
                    <label>Description <br></br>
                        <textarea name="description" rows="4"/>
                    </label>
                </div>
                <div>
                    <RateAndReview rating={4} />
                </div>
                <div className="form-group">
                    <label>Review <br></br>
                        <textarea name="submissionReview" rows="4" />
                    </label>
                </div>

                <input type="submit" className="submit-button" value="Submit Location" />
            </form>
        </>
    )
}
