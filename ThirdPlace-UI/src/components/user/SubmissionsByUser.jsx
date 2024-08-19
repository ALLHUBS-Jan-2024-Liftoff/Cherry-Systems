import CondensedSubmission from '../condensed-submission/CondensedSubmission';

export default function SubmissionsByUser({ submissionArr }) {

    return (
        <table className="table table-striped border shadow">
            <tbody>
                {submissionArr.map((submission) => (
                    <tr key={submission.id}>
                        <CondensedSubmission props={submission} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}