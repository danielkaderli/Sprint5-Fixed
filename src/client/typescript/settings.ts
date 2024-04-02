// const voiceoverToggle = document.getElementById('voiceover-toggle') as HTMLInputElement;

// voiceoverToggle.addEventListener('change', function() {
//     if (this.checked) {
//         // Save user preference for voiceover activated
//         localStorage.setItem('voiceover', 'activated');
//         // Activate voiceover function
//         activateVoiceover();
//     } else {
//         // Save user preference for voiceover deactivated
//         localStorage.setItem('voiceover', 'deactivated');
//         // Deactivate voiceover function
//         deactivateVoiceover();
//     }
// });

// // Check user preference on page load
// window.onload = function() {
//     const voiceoverPreference = localStorage.getItem('voiceover');
//     if (voiceoverPreference === 'activated') {
//         voiceoverToggle.checked = true;
//         activateVoiceover();
//     } else {
//         voiceoverToggle.checked = false;
//         deactivateVoiceover();
//     }
// };

// function activateVoiceover() {
//     console.log("Voiceover activated");
//     // TODO: implement voiceover activation
// }

// function deactivateVoiceover() {
//     console.log("Voiceover deactivated");
//     // TODO: implement voiceover deactivation
// }