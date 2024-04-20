async function getMap(mapname: string) {
    // Retrieves the floor images, node list, and other data for the specified building
    console.log("getMap() invoked");

    // Hardcoded building name for now
    mapname = "Town Hall";

    // Request the outline data for the building
    let labels = {map: mapname};
    let url = "http://localhost:8080/maprequest"
    // let request = new Request(url, );

    const buildingResponse = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(labels),
    })

    const buildingData = await buildingResponse.json();
    console.log();
    // Store buildingData under same name
    sessionStorage.setItem("buildingData", buildingData);

    // Request floor images
    for (let floor in buildingData["Floors"]) {
        let url = "http://localhost:8080/images/" + buildingData["Floors"][floor]["FloorMap"];
        console.log("URL: " + url);

        const floorResponse = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then()
        // Store document locally, stored as url that can be used directly in <img> src properties
        let imageBlob = await floorResponse.blob();
        sessionImageStore(buildingData["Floors"][floor], imageBlob);

        // let image = document.createElement("img")
        // image.setAttribute("src", sessionStorage.getItem(buildingData["Floors"][floor]["FloorMap"]));
    }

    // Request floor nodes
    for (let floor in buildingData["Floors"]) {
        let url = "http://localhost:8080/images/" + buildingData["Floors"][floor]["FloorMap"];
        console.log("URL: " + url);

        const floorResponse = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then()
        // Store document locally, stored as url that can be used directly in <img> src properties
        let imageBlob = await floorResponse.blob();

        // let image = document.createElement("img")
        // image.setAttribute("src", sessionStorage.getItem(buildingData["Floors"][floor]["FloorMap"]));
    }
    
}
// TODO: FINISH UP REQUESTING FLOOR NODES


// TOOLS FOR MAKING BRAIN HURT LESS WHEN DEALING WITH IMAGES
// I don't want to completely redo the way typescript is currently handled, so cannot offload these to another file
// Would be good for future refactoring though
function sessionImageStore(imageIndex: string, imageData: Blob): void{
    console.log("sessionImageStore() invoked");
    
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
            console.log(base64string)
        }

        // Store the Base64 data
        sessionStorage.setItem(imageIndex, base64string);
    }
    // sessionStorage.setItem(imageIndex, imageBlob);
}

function sessionImageRetrieve(imageIndex: string): string{
    // Returns the image in a url form, can be used as an <img> src to render the image directly from the url
    console.log("sessionImageRetrieve() invoked");

    // Retrieve the Base64 url
    let retrievedData = sessionStorage.retrieveItem(imageIndex);
    // Return that bad boy
    return retrievedData;

}