// Extract and display form data from URL
const resultsElement = document.querySelector('#results');

// Get the full URL and split to find the query string
const currentURL = window.location.href;
const everything = currentURL.split('?');

if (everything.length > 1) {
    const formData = everything[1].split('&');

    // Helper function to find a specific parameter value
    function getParamValue(param) {
        let value = "";
        formData.forEach((element) => {
            if (element.startsWith(param + "=")) {
                // Decode URI to handle email symbols and replace "+" with spaces
                value = decodeURIComponent(element.split('=')[1]).replace(/\+/g, ' ');
            }
        });
        return value;
    }

    // Map the Membership Level value to a readable name
    const rawLevel = getParamValue("level");
    const levels = {
        "np": "Non-Profit Membership",
        "bronze": "Bronze Membership",
        "silver": "Silver Membership",
        "gold": "Gold Membership"
    };
    const membershipLevel = levels[rawLevel] || "Not selected";

    // Inject the formatted results into the page
    resultsElement.innerHTML = `
        <p><strong>First Name:</strong> ${getParamValue("fname")}</p>
        <p><strong>Last Name:</strong> ${getParamValue("lname")}</p>
        <p><strong>Email:</strong> <a href="mailto:${getParamValue("email")}">${getParamValue("email")}</a></p>
        <p><strong>Mobile Phone:</strong> ${getParamValue("phone")}</p>
        <p><strong>Organization:</strong> ${getParamValue("organization")}</p>
        <p><strong>Membership Level:</strong> ${membershipLevel}</p>
        <p><strong>Timestamp:</strong> ${getParamValue("timestamp")}</p>
    `;
} else {
    resultsElement.innerHTML = "<p>No submission data found. Please complete the join form.</p>";
}
