// TOOLS FOR MAKING BRAIN HURT LESS WHEN DEALING WITH IMAGES
// I don't want to completely redo the way typescript is currently handled, so cannot offload these to another file
// Would be good for future refactoring though
function sessionImageStore(imageIndex: string, imageData: Blob): void{
    // console.log("sessionImageStore() invoked");
    
    // Convert the data to Base64
    const reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.onloadend = function() {
        let base64string = reader.result
        
        // Do type checking for TypeScript's sanity (apparently the 'string | ArrayBuffer' data type isn't 'string' enough)
        if(base64string instanceof ArrayBuffer){
            const decoder = new TextDecoder('utf-8');
            base64string = decoder.decode(base64string);
        }else{
            base64string = (base64string as string);
            // console.log(base64string)
        }

        // Store the Base64 data
        sessionStorage.setItem(imageIndex, base64string);
        // console.log("Image stored");

    }
    // sessionStorage.setItem(imageIndex, imageBlob);
}

function sessionImageRetrieve(imageIndex: string): string{
    // Returns the image in a url form, can be used as an <img> src to render the image directly from the url
    let retrievedData = sessionStorage.retrieveItem(imageIndex);
    
    // Return that bad boy
    return retrievedData;

}