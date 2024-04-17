async function getMap(mapname: string) {
    console.log("getMap() invoked");

    // Hardcoded building name for now
    mapname = "Town Hall";

    // Make HTTP request with mapname labeled as "map" in JSON
    let labels = {map: mapname};
    let url = "http://localhost:8080/maprequest"
    // let request = new Request(url, );

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(labels),
    })
    .then((response) => {
        console.log("DEBUG: status: " + response.json())
    });

    console.log("Request sent successfully");
}