
export default function RenderDateAndTime(submission) {

    
    const dateTimeString = submission.submissionDate; // Example string from Java
    const date = new Date(dateTimeString);
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    
    // Format the time
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit'
    });

    return ("Submitted on: " + formattedDate + " at " + formattedTime);
}
