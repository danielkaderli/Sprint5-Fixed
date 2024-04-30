// Get the pathname of the current URL
var pathname = window.location.pathname;

// Extract the filename from the pathname
var filename = pathname.split('/').pop();

// Execute the following code when the window is fully loaded
window.onload = function() {
    // Retrieve the user's preference for voiceover from localStorage
    var voiceoverPreference = localStorage.getItem('voiceover');
    if (voiceoverPreference === 'activated') {
        if(filename === 'settings.html'){
            voiceoverToggle.checked = true;
        }
        activateVoiceover();
    } else {
        if(filename === 'settings.html'){
            voiceoverToggle.checked = false;
        }
        deactivateVoiceover();
    }


    var savedTextSize = localStorage.getItem('textSizePreference');
    if (savedTextSize) {

        if(filename === 'settings.html'){
            textSizeSlider.value = savedTextSize;
        }
        
        // Set the slider value to the saved preference
        textSizeRatio = savedTextSize.valueOf();
        // Update the text size based on the saved preference
        document.body.style.fontSize = textSizeRatio + "%";
    }

};

