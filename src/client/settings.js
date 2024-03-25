// Retrieve the voiceover toggle checkbox element
var voiceoverToggle = document.getElementById('voiceover-toggle');

// Add change event listener to the checkbox
voiceoverToggle.addEventListener('change', function() {
    // Check if the checkbox is checked
    if (this.checked) {
        // If checked, set 'voiceover' item in localStorage to 'activated'
        localStorage.setItem('voiceover', 'activated');
        // Call the activateVoiceover function
        activateVoiceover();
    } else {
        // If not checked, set 'voiceover' item in localStorage to 'deactivated'
        localStorage.setItem('voiceover', 'deactivated');
        // Call the deactivateVoiceover function
        deactivateVoiceover();
    }
});



// Function to activate voiceover
function activateVoiceover() {
    console.log("Voiceover activated"); // Log message to console
}

// Function to deactivate voiceover
function deactivateVoiceover() {
    console.log("Voiceover deactivated"); // Log message to console
}

function goToMap(){
    window.location.href = "map_page.html";
}
// const textElements = document.querySelectorAll("body, h1, p, settings-item, nav-sidebar-title, nav-sidebar-body, label");

// Execute the following code when the window is fully loaded
// window.onload = function() {
//     // Retrieve the user's preference for voiceover from localStorage
//     var voiceoverPreference = localStorage.getItem('voiceover');
//     if (voiceoverPreference === 'activated') {
//         // If 'activated', check the voiceover toggle checkbox
//         voiceoverToggle.checked = true;
//         // Call the activateVoiceover function
//         activateVoiceover();
//     } else {
//         // If 'deactivated', uncheck the voiceover toggle checkbox
//         voiceoverToggle.checked = false;
//         // Call the deactivateVoiceover function
//         deactivateVoiceover();
//     }
// };