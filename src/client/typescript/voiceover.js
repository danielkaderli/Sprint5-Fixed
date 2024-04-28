let playButtonReading = false;

function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

function activateVoiceover(){
    console.log("Voiceover Activated");
    readScreenElements();

    // Attach event listeners to detect mouse hover and mouse out events
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
}

function deactivateVoiceover(){
    console.log("Voiceover deactivated");
    window.speechSynthesis.cancel();

    // Attach event listeners to detect mouse hover and mouse out events
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
}

function readScreenElements(textContent){
    var synthesis = window.speechSynthesis;

    // Extract text from HTML divs
    // var allDivsText = extractTextFromDivs();

    // If text is not empty, record in console and read text
    if(textContent){
        console.log("Text for voiceover reading: ", textContent);
        var instruction = new SpeechSynthesisUtterance(textContent);
        synthesis.speak(instruction);
        console.log("Text is speaking");
    }else{ console.log("text empty");}

}

// Function to handle mouseover event
function handleMouseOver(event) {
    console.log("hovering");
    if(!playButtonReading){

        // Retrieve the element that triggered the mouseover event
        var element = event.target;
        if(event.target.alt){
            let altText = event.target.alt;
            var textContent = '';
            if (altText && altText.trim() !== '') {
                textContent = altText;
            }
        }

        element = element.parentElement;

        if(!element.classList.contains('ignore')){
            // Get the text content of the element and trim whitespace
            textContent += element.textContent.trim();
            textContent = textContent.replace(/(\r\n|\n|\r|\t)/gm,"");

            // Call the voiceover function with the text content
            readScreenElements(textContent);
        }
    }



}

// Function to handle mouseout event
function handleMouseOut() {
    // Stop the voiceover when mouse leaves the element
    if(!playButtonReading){
        window.speechSynthesis.cancel();
    }
    console.log("done hovering");
}

function playButton() {
    playButtonReading = true;
    console.log('play buttoning');
    var text = extractTextFromDivs().split('~');
    console.log(text);
    readScreenElements(text[0]);
    for(var i = 1; i < text.length; i++){
            console.log(text[i]);
            readScreenElements(text[i]);
            sleep(6000);
    }
    playButtonReading = false;
    console.log('done playing buttoning');
}

// Attach event listeners to detect mouse hover and mouse out events
//document.addEventListener('mouseover', handleMouseOver);
//document.addEventListener('mouseout', handleMouseOut);

function extractTextFromDivs() {

    var titles = document.getElementsByClassName("nav-sidebar-title");
    var bodies = document.getElementsByClassName("nav-sidebar-body");
    var divText = '';
    for (var i = 0; i < titles.length; i++) {
        divText += titles[i].textContent.trim() + ' ';
        if(bodies[i]){
            divText += bodies[i].textContent.trim() + ' ';
        }
        divText += '~';
    }
    

    console.log(divText);
    return divText;

    ////////////////////////////////////////////

    // var divText = '';
    // Get all div elements in the document
    // document.querySelectorAll('div').forEach((div) =>{
    //     divText += div.textContent;
    // });

    //////////////////////////////////////

    // // Iterate through each div element
    // for (var i = 0; i < divs.length; i++) {

    //     // add ignore tag to div elements not to be read by voiceover
    //     if (divs[i].classList.contains('ignore')) {
    //         continue; // Skip to the next iteration
    //     }

    //     var textContent = divs[i].textContent.trim();

    //     // If text content is not empty, add it to the concatenated string
    //     if (textContent) {
    //         // Add a space between div texts for readability
    //         divText += textContent + ' ';
    //     }
    //     setTimeout(1000);
    // }

    // Return the concatenated text content of all divs
    // return divText.trim(); 
}

// // Execute the following code when the window is fully loaded
// window.onload = function() {
//     // Retrieve the user's preference for voiceover from localStorage
//     var voiceoverPreference = localStorage.getItem('voiceover');
//     if (voiceoverPreference === 'activated') {

//         // Call the activateVoiceover function
//         activateVoiceover();

//     } else {

//         // Call the deactivateVoiceover function
//         deactivateVoiceover();
        
//     }

// };