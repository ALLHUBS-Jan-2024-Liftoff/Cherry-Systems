import CondensedSubmission from '../condensed-submission/CondensedSubmission';

export default function FavoriteList({ favorites }) {
    return (
        <table className="table table-striped border shadow">
            <tbody>
                {favorites.map((submission, index) => (
                    <tr key={index}>
                        <CondensedSubmission props={submission} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}