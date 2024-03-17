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
	if (sidebar && sidebar?.style.display === "none"){	// Evaluates if sidebar exists, then if the property exists
		sidebar.style.display = "";
	} else if (sidebar) {
		sidebar.style.display = "none";
	}

}

newSidebarItem("Just testing out", "This new function");