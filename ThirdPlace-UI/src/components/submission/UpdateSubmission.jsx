import { useAuth } from "../../context/AuthContext";
import SubmissionForm from "../submission/SubmissionForm";
import Navbar from "../navigation/Navbar";
import { Link } from "react-router-dom";

export default function UpdateSubmissionForm() {

    const {user, isAuthenticated } = useAuth();

    return ( 
        <>
            <Navbar />
            {user === null ? (
            <section className='review-card'>
                <h1>Log in to edit your submissions!</h1>
                <br />
                <p>
                    <Link to={{ pathname: '/login', state: { user, isAuthenticated }}}>Go to Login</Link>
                </p>
            </section>
            ) : (
            <section>
                <h1>Edit your submission</h1>

                <div className="container review-card">
                    <SubmissionForm />
                </div>
            </section>
            )}
           <p className="gray-text">
                <center>🍒 Powered by Cherry Systems</center>
            </p>
        </>
    )


}