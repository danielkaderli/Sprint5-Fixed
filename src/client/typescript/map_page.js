function newSidebarItem(title, body) {
    var sidebar = document.getElementById("sidebar");
    //Create & style entry title
    var entry_title = document.createElement("div");
    entry_title.className = "nav-sidebar-title";
    entry_title.textContent = title;
    //Create & style entry body
    var entry_body = document.createElement("div");
    entry_body.className = "nav-sidebar-body";
    entry_body.textContent = body;
    var entry = document.createElement("div");
    entry.className = "nav-sidebar-item";
    entry.appendChild(entry_title);
    entry.appendChild(entry_body);
    var element = document.getElementById("sidebar-button-last");
    sidebar === null || sidebar === void 0 ? void 0 : sidebar.insertBefore(entry, element);
}
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var maptoggle = document.getElementById("map-button-toggle-map");
    var button = document.getElementById("map-button-collapse-sidebar");
    if (button && sidebar && maptoggle && (sidebar === null || sidebar === void 0 ? void 0 : sidebar.style.display) === "none") { // Evaluates if sidebar exists, then if the property exists
        sidebar.style.display = "";
        maptoggle.style.display = "";
        button.style.left = "25%";
    }
    else if (button && sidebar && maptoggle) {
        sidebar.style.display = "none";
        maptoggle.style.display = "none";
        button.style.left = "0%";
    }
}
function toggleMap() {
    var map = document.getElementById("content");
    var sidebartoggle = document.getElementById("map-button-collapse-sidebar");
    if (map && sidebartoggle && (map === null || map === void 0 ? void 0 : map.style.display) === "none") { // Evaluates if sidebar exists, then if the property exists
        map.style.display = "";
        sidebartoggle.style.display = "";
    }
    else if (map && sidebartoggle) {
        map.style.display = "none";
        sidebartoggle.style.display = "none";
    }
}
