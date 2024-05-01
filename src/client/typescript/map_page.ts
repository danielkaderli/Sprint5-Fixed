function newSidebarItem(title: string, body: string, nodeId = null): void {
	let sidebar = document.getElementById("sidebar");
	
	// Create & style entry title
	let entry_title = document.createElement("div");
	entry_title.className = "nav-sidebar-title";
	entry_title.textContent = title;
	
	// Create & style entry body
	let entry_body = document.createElement("div");
	entry_body.className = "nav-sidebar-body";
	entry_body.textContent = body;
	
	let entry = document.createElement("div");
	entry.className = "nav-sidebar-item";
	if(nodeId !== null){
		entry.setAttribute("data-nodeid", nodeId);
	}
	
	entry.appendChild(entry_title);
	entry.appendChild(entry_body);

	// Count how many instructions already exist and assign a proper id (starting at 1)
	let instructions = document.getElementsByClassName("nav-sidebar-item");
	entry.id = (instructions.length + 1).toString();
	
	let element = document.getElementById("nav-button-holder");

	sidebar?.insertBefore(entry, element);
}

function toggleSidebar(): void {
	let sidebar = document.getElementById("sidebar");
	let maptoggle = document.getElementById("map-button-toggle-map");
	let button = document.getElementById("map-button-collapse-sidebar");
	if (button && sidebar && maptoggle && sidebar?.style.display === "none"){	// Evaluates if sidebar exists, then if the property exists
		sidebar.style.display = "";
		maptoggle.style.display = "";
		button.style.left = "25%";
	} else if (button && sidebar && maptoggle) {
		sidebar.style.display = "none";
		maptoggle.style.display = "none";
		button.style.left = "0%";
	}
}
function toggleMap(): void {
	let map = document.getElementById("content");
	let sidebartoggle = document.getElementById("map-button-collapse-sidebar");
	if (map && sidebartoggle && map?.style.display === "none"){	// Evaluates if sidebar exists, then if the property exists
		map.style.display = "";
		sidebartoggle.style.display = "";
	} else if (map && sidebartoggle) {
		map.style.display = "none";
		sidebartoggle.style.display = "none";
	}
}

function getCurrentFloor(): number{
	// console.log("getCurrentFloor() invoked");
	let items = document.getElementsByClassName("nav-sidebar-item");
	// console.log("Length of items: " + items.length);
	if(!items){
		console.error("getCurrentFloor(): items collection invalid");
	}

	// Find the first item that is still visible
	const firstVisibleItem = Array.from(items).find((item) => {
		return document.getElementById(item.id).style.display !== 'none';
	});
	if(!firstVisibleItem){
		console.error("getCurrentFloor(): valid visible item not found");
	}

	if(firstVisibleItem){
		const floorPathData = JSON.parse(sessionStorage.getItem("pathData"));
		// console.log("floorPathData:");
		// console.log(floorPathData);

		const currentNodeId = firstVisibleItem.getAttribute("id");
		if (currentNodeId && floorPathData[currentNodeId]) {
			// Access the current floor
			// If the current Node is a transition node, get the floor value of the previous node
			let currentFloor;
			if(floorPathData[currentNodeId]["typeCurr"] == "TRANSITION"){
				currentFloor = floorPathData[parseInt(currentNodeId) - 1]["floorCurr"];
			}else{
				// Otherwise be normal
				currentFloor = floorPathData[parseInt(currentNodeId)]["floorCurr"];
			}
			// console.log("Current Floor: " + currentFloor);
			return currentFloor;
		}
	}
	console.log("getCurrentFloor: returning null");
	return null;
}

async function addNodesToSidebar(){
	let pathData = await JSON.parse(sessionStorage.getItem("pathData"));
	let timeSum = 0;
	// console.log("addNodesToSidebar:()");
	// console.log(pathData);

	for (let node in pathData){
		if(pathData[node]["typeCurr"] !== "TRANSITION"){

			// Make the very last node look pretty
			if(pathData[node]["typeCurr"] !== "FINAL"){
				newSidebarItem("Est. time: " + pathData[node]["TimeEstimate"] + "s", "Node " + node, pathData[node]["NodeID"]);
			}else if(parseInt(node) == (pathData.length - 1)){
				newSidebarItem("You have arrived!", "You have reached your destination", pathData[node]["NodeID"]);
			}
		}
	}
}
function nextStep(): void{
	let items = document.getElementsByClassName("nav-sidebar-item");
	// Find the first item that is still visible
	let toHide = null;
	for (let item of items as HTMLCollectionOf<HTMLDivElement>){
		if(item.style.display !== 'none'){
			toHide = item;
			break;
		}
	}
	if(toHide !== null){
		toHide.style.display = 'none';
	}else{
		// console.log("nextStep():\nDone!");
	}
}
function lastStep(): void{
	let items = document.getElementsByClassName("nav-sidebar-item");
	// Find the first item that is still visible
	let indicator = null;
	let i = 1;
	for (let item of items as HTMLCollectionOf<HTMLDivElement>){
		let currentItem = document.getElementById(i.toString());

		// If the current item isn't the first item in the list
		if(currentItem.style.display !== 'none' && i !== 1){
			let itemToUnhide = document.getElementById((i - 1).toString());
			itemToUnhide.style.display = 'flex';
			// console.log("lastStep():\nDone!");
			return;
		}
		i++;
	}
	let itemToUnhide = document.getElementById((i - 1).toString());
	itemToUnhide.style.display = 'flex';
}