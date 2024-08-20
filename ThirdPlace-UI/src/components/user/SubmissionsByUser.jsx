import CondensedSubmission from '../condensed-submission/CondensedSubmission';

export default function SubmissionsByUser({ submissionArrByUser }) {

    return (
        <table className="table table-striped border shadow">
            <tbody>
                {submissionArrByUser.map((submission) => (
                    <tr key={submission.id}>
                        <CondensedSubmission props={submission} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}