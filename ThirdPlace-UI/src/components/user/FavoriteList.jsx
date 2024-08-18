import CondensedSubmission from '../condensed-submission/CondensedSubmission';

export default function FavoriteList({ favorites }) {
    return (
        <table>
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