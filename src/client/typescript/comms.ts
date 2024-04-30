async function getBuildings(){
    // console.log("getBuildings() invoked");

    let url = "http://localhost:8080/buildings"
    
    console.log("getBuildings():\n" + JSON.stringify({
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }, null, 3));
    
    const buildingsResponse = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const buildingsReader = buildingsResponse.body.getReader();
    let graphCode;
    let i = 0;
    await buildingsReader.read().then(({ done, value }) => {
        if(!done){
            graphCode = value;
        }
    });
    let buildingData = new TextDecoder().decode(graphCode);
    buildingData = buildingData.trim();

    console.log(buildingData);
    console.log("getBuildings() complete");
}

async function getMap(mapname: string) {
    // Retrieves the floor images, node list, and other data for the specified building
    console.log("getMap(" + mapname + ") invoked");

    console.log("Requesting outline data...");
    // Request the outline data for the building //
    let labels = {map: mapname};
    let url = "http://localhost:8080/maprequest"
    console.log(JSON.stringify({
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(labels),
    }, null, 3));
    
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

    const buildingReader = buildingResponse.body.getReader();
    let finished: any = false;
    let graphCode;
    let i = 0;
    await buildingReader.read().then(({ done, value }) => {
        finished = done;
        if(!done){
            graphCode = value;
        }
    });
    let buildingData = new TextDecoder().decode(graphCode);
    buildingData = buildingData.trim();

    // Store buildingData under same name
    sessionStorage.setItem("buildingData", buildingData);
    // console.log("getMap(): buildingData:\n" + buildingData);

    // Used in next segment
    let buildingInfo = await JSON.parse(buildingData);


    // Request floor images
    // console.log("Requesting floor images...");
    for (let floor in buildingInfo["Floors"]) {
        let url = "http://localhost:8080/images/" + buildingInfo["Floors"][floor]["FloorMap"];

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
        sessionImageStore("Floor " + JSON.stringify(buildingInfo["Floors"][floor]["FloorNumber"]), imageBlob);
    }

    // Request graph of the building
    // console.log("Requesting graph of the building");
    url = "http://localhost:8080/images/" + buildingInfo["Building Information"]["GraphNodes"];
    const nodesResponse = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // console.log("getMap():\nExtracting Graph Nodes...");
    // Extract the graph nodes & convert them into JSON
    const nodesReader = nodesResponse.body.getReader();
    // finished: any = false;
    graphCode = null;
    i = 0;
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
    // console.log("getMap():\nGraph Nodes successfully stored as JSON");
    console.log("getMap(" + mapname + ") complete");
}

async function getPath(startID: string, endID: string) {
    // Requests the path for the specified path
    console.log("getPath() invoked");

    // Request the outline data for the building
    let labels = { start: startID, end: endID };
    let url = "http://localhost:8080/maprequest"

    const pathResponse = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(labels),
    })

    const pathReader = pathResponse.body.getReader();
    let finished: any = false;
    let pathList;
    let i = 0;
    await pathReader.read().then(({ done, value }) => {
        finished = done;
        if(!done){
            pathList = value;
        }
    });
    let pathData = new TextDecoder().decode(pathList);
    // pathData = await JSON.parse(pathData.trim());
    // console.log(pathData);
    // Store pathResponse under same name
    sessionStorage.setItem("pathData", pathData);
}