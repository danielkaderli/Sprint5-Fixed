"use strict";
exports.__esModule = true;
exports.sessionImageRetrieve = exports.sessionImageStore = void 0;
exports["default"] = {};
// TOOLS FOR MAKING BRAIN HURT LESS WHEN DEALING WITH IMAGES
// I don't want to completely redo the way typescript is currently handled, so cannot offload these to another file
// Would be good for future refactoring though
function sessionImageStore(imageIndex, imageData) {
    console.log("sessionImageStore() invoked");
    // Convert the data to Base64
    var reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.onloadend = function () {
        var base64string = reader.result;
        // Do type checking for TypeScript's sanity (apparently the 'string | ArrayBuffer' data type isn't 'string' enough)
        if (base64string instanceof ArrayBuffer) {
            var decoder = new TextDecoder('utf-8');
            base64string = decoder.decode(base64string);
        }
        else {
            base64string = base64string;
            console.log(base64string);
        }
        // Store the Base64 data
        sessionStorage.setItem(imageIndex, base64string);
    };
    // sessionStorage.setItem(imageIndex, imageBlob);
}
exports.sessionImageStore = sessionImageStore;
function sessionImageRetrieve(imageIndex) {
    // Returns the image in a url form, can be used as an <img> src to render the image directly from the url
    console.log("sessionImageRetrieve() invoked");
    // Retrieve the Base64 url
    var retrievedData = sessionStorage.retrieveItem(imageIndex);
    // Return that bad boy
    return retrievedData;
}
exports.sessionImageRetrieve = sessionImageRetrieve;
