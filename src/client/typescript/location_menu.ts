// Retrieve nodes from session storage
let nodeJson = JSON.parse(sessionStorage.getItem("nodeJson"));
// console.log(nodeJson);
// Add nodes to the item container
for (let node in nodeJson){
    let nodeType = nodeJson[node]["Type"];
    if(nodeType == "FINAL"){
        console.log(nodeJson[node]["Type"]);
        let newitem = document.createElement("div");
        newitem.className = "location-menu-item";
        newitem.textContent = node;

        let itemContainer = document.getElementById("location-menu");

        itemContainer.appendChild(newitem);
    }
}


// When an item is clicked, sets that item as active & stores in session storage
let itemContainer = document.getElementById("location-menu");
let items = itemContainer.getElementsByClassName("location-menu-item");

items[0].className += " active";
let result = document.getElementById("choose-destination");
if(result != null){
    // On destination menu
    saveDestination(items[0].textContent);
}
result = document.getElementById("choose-location");
if(result != null){
    // On location menu
    saveLocation(items[0].textContent);
}

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
        console.log("location_menu.ts:\nEvent listener invoked");

        let item = itemContainer.getElementsByClassName("location-menu-item active");
        // Remove any elements with active set
        item[0].className = item[0].className.replace(" active", "");
        // Add active to current element
        this.className += " active";

        let result = document.getElementById("choose-destination");
        if(result != null){
            // On destination menu
            saveDestination(this.textContent);
        }
        result = document.getElementById("choose-location");
        if(result != null){
            // On location menu
            saveLocation(this.textContent);
        }
    });
}

function saveDestination(name: string){
    _saveNode("destination", name);
}
function saveLocation(name: string){
    _saveNode("location", name);
}
function _saveNode(key: string, nodeName: string){
    // Get active item
    sessionStorage.setItem(key, nodeName);
    console.log("_saveNode():\nSaved " + nodeName + " as " + key);
}