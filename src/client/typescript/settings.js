// Get the slider element
const textSizeSlider = document.getElementById("textSizeSlider");

// Get the example text element
const exampleText1 = document.querySelector(".example-text1 p");
const exampleText2 = document.querySelector(".example-text2 p");


// Event listener for slider change
textSizeSlider.addEventListener("input", () => {
    //updateTextSize();
    updateExampleTextSize(); // Update the example text size
});

// Function to update the font size of the example text
function updateTextSize() {
    const textSizeRatio = parseFloat(textSizeSlider.value);
    document.body.style.fontSize = textSizeRatio + "%";
    localStorage.setItem("textSizePreference", textSizeRatio);
}

function updateExampleTextSize() {
    const textSizeRatio = parseFloat(textSizeSlider.value);
    exampleText1.style.fontSize = textSizeRatio + "%";
    exampleText2.style.fontSize = textSizeRatio + "%";
    localStorage.setItem("textSizePreference", textSizeRatio);
}


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
