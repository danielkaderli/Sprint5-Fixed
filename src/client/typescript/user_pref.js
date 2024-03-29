var voiceoverToggle = document.getElementById('voiceover-toggle');

// Execute the following code when the window is fully loaded
window.onload = function() {
    // Retrieve the user's preference for voiceover from localStorage
    var voiceoverPreference = localStorage.getItem('voiceover');
    if (voiceoverPreference === 'activated') {
        // If 'activated', check the voiceover toggle checkbox
        voiceoverToggle.checked = true;
        // Call the activateVoiceover function
        activateVoiceover();
    } else {
        // If 'deactivated', uncheck the voiceover toggle checkbox
        voiceoverToggle.checked = false;
        // Call the deactivateVoiceover function
        deactivateVoiceover();
    }

    const savedTextSize = localStorage.getItem("textSizePreference");
    if (savedTextSize) {
        // Set the slider value to the saved preference
        textSizeSlider.value = savedTextSize;
        // Update the text size based on the saved preference
        updateTextSize();
    }
};