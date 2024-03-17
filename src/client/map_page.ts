function newSidebarItem(title: string, body: string): void {
	let sidebar = document.getElementById("sidebar");
	
	//Create & style entry title
	let entry_title = document.createElement("div");
	entry_title.className = "nav-sidebar-title";
	entry_title.textContent = title;
	
	//Create & style entry body
	let entry_body = document.createElement("div");
	entry_body.className = "nav-sidebar-body";
	entry_body.textContent = body;
	
	let entry = document.createElement("div");
	entry.className = "nav-sidebar-item";
	
	entry.appendChild(entry_title);
	entry.appendChild(entry_body);
	
	let element = document.getElementById("sidebar-button-last");

	sidebar?.insertBefore(entry, element);
}

function toggleSidebar(): void {
	let sidebar = document.getElementById("sidebar");
	let maptoggle = document.getElementById("map-button-toggle-map");
	if (sidebar && maptoggle && sidebar?.style.display === "none"){	// Evaluates if sidebar exists, then if the property exists
		sidebar.style.display = "";
		maptoggle.style.display = "";
	} else if (sidebar && maptoggle) {
		sidebar.style.display = "none";
		maptoggle.style.display = "none";
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