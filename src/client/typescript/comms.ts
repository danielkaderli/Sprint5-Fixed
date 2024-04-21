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
    // console.log(buildingData);
    // Store buildingData under same name
    sessionStorage.setItem("buildingData", buildingData);

    // Request floor images
    for (let floor in buildingData["Floors"]) {
        let url = "http://localhost:8080/images/" + buildingData["Floors"][floor]["FloorMap"];
        // console.log("URL: " + url);

        const floorResponse = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Store document locally, stored as url that can be used directly in <img> src properties
        let imageBlob = await floorResponse.blob();
        sessionImageStore(buildingData["Floors"][floor], imageBlob);
    }

    // Request graph of the building
    url = "http://localhost:8080/images/" + buildingData["Building Information"]["GraphNodes"];
    console.log(url);

    const nodesResponse = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log("Extracting Graph Nodes...");
    // Extract the graph nodes & convert them into JSON
    const nodesReader = nodesResponse.body.getReader();
    let finished: any = false;
    let graphCode;
    let i = 0;
    await nodesReader.read().then(({ done, value }) => {
        finished = done;
        if(!done){
            graphCode = value;
        }
    });
    let graphNodes = new TextDecoder().decode(graphCode);
    graphNodes = graphNodes.trim();

    // Process the received graph nodes into json
    // nodeID, floor, Type, X, Y, EdgeID, Weight
    let nodeArray = graphNodes.split("\n");
    let nodeObject: { [key:string]: any } = {};
    for(let i = 0; i < nodeArray.length; i++){
        let currentNode = nodeArray[i].split(",");
        let node = {
            Floor: currentNode[1],
            Type: currentNode[2],
            X: currentNode[3],
            Y: currentNode[4],
            EdgeID: currentNode[5],
            Weight: currentNode[6],
        };

        // Store it by the index of its NodeID
        nodeObject[currentNode[0]] = node;
    }
    let nodeJson = JSON.stringify(nodeObject, null, "  ");
    // console.log(nodeJson);

    // Store nodeJson under same name
    sessionStorage.setItem("nodeJson", nodeJson);
    console.log("Graph Nodes successfully stored as JSON");
    console.log("GetMap() complete")
}