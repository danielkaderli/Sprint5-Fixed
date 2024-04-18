export function sessionImageStore(imageIndex: string, imageData: Blob): void{
    console.log("sessionImageStore() invoked")
    
    // Convert the data to Base64
    const reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.onloadend = function() {
        let base64url = reader.result
        console.log(base64url);
        // Image is currently stored as a base64 url, must remove 
        // sessionStorage.setItem(imageIndex, imageBlob);
    }
    // Store the Base64 data
    // sessionStorage.setItem(imageIndex, imageBlob);
}

export function sessionImageRetrieve(imageIndex: string): Blob{
    return null;
}