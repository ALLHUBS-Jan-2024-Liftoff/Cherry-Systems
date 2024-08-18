import CondensedSubmission from '../condensed-submission/CondensedSubmission';

export default function SubmissionsByUser({ currentUserSubmissions }) {

    return (
        <table className="table table-striped border shadow">
            <tbody>
                {currentUserSubmissions.map((submission, index) => (
                    <tr key={index}>
                        <CondensedSubmission props={submission} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}