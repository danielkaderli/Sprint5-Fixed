// Get the slider element
const textSizeSlider = document.getElementById("textSizeSlider");

// Get the example text element
const exampleText1 = document.querySelector(".example-text1 p");
const exampleText2 = document.querySelector(".example-text2 p");

// Function to update the font size of the example text
function updateExampleTextSize() {
    const textSizeRatio = parseFloat(textSizeSlider.value);
    exampleText1.style.fontSize = textSizeRatio + "%";
    exampleText2.style.fontSize = textSizeRatio + "%";
    localStorage.setItem("textSizePreference", textSizeRatio);
}

// Event listener for slider change
textSizeSlider.addEventListener("input", () => {
    //updateTextSize();
    updateExampleTextSize(); // Update the example text size
});

function updateTextSize() {
    const textSizeRatio = parseFloat(textSizeSlider.value);
    
    document.body.style.fontSize = textSizeRatio + "%";
    localStorage.setItem("textSizePreference", textSizeRatio);
}

// Event listener for slider change
//textSizeSlider.addEventListener("input", updateTextSize);

// // Execute the following code when the window is fully loaded
// window.onload = function() {

//     const savedTextSize = localStorage.getItem("textSizePreference");
//     if (savedTextSize) {
//         // Set the slider value to the saved preference
//         textSizeSlider.value = savedTextSize;
//         // Update the text size based on the saved preference
//         updateTextSize();
//     }
// };