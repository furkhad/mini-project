// Mock resource data
const resources = [
    { id: 1, name: "Water Bottles", quantity: 500, location: "Warehouse A" },
    { id: 2, name: "Blankets", quantity: 200, location: "Warehouse B" },
    { id: 3, name: "Medical Kits", quantity: 50, location: "Warehouse A" }
];

// Display resources
function displayResources(filter = "") {
    const tbody = document.getElementById("resource-body");
    if (tbody) {
        tbody.innerHTML = "";
        resources
            .filter(r => r.name.toLowerCase().includes(filter.toLowerCase()) || r.location.toLowerCase().includes(filter.toLowerCase()))
            .forEach(r => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${r.name}</td><td>${r.quantity}</td><td>${r.location}</td>`;
                tbody.appendChild(row);
            });
    }
}

// Filter resources
document.getElementById("filter")?.addEventListener("input", e => displayResources(e.target.value));

// Handle form submission
document.getElementById("request-form")?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const resource = document.getElementById("resource").value;
    const quantity = document.getElementById("quantity").value;
    const location = document.getElementById("location").value;
    
    // Store locally
    const requests = JSON.parse(localStorage.getItem("requests") || "[]");
    requests.push({ name, resource, quantity, location, status: "Pending" });
    localStorage.setItem("requests", JSON.stringify(requests));
    
    document.getElementById("form-message").textContent = "Request submitted!";
    e.target.reset();
    displayRequests(); // Update dashboard if open
});

// Display requests
function displayRequests() {
    const tbody = document.getElementById("request-body");
    if (tbody) {
        tbody.innerHTML = "";
        const requests = JSON.parse(localStorage.getItem("requests") || "[]");
        requests.forEach((r, i) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${r.name}</td>
                <td>${r.resource}</td>
                <td>${r.quantity}</td>
                <td>${r.location}</td>
                <td>${r.status}</td>
                <td><button class="btn" onclick="updateStatus(${i}, 'Approved')">Approve</button></td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Update request status
function updateStatus(index, status) {
    const requests = JSON.parse(localStorage.getItem("requests") || "[]");
    requests[index].status = status;
    localStorage.setItem("requests", JSON.stringify(requests));
    displayRequests();
}

// Initialize pages
if (document.getElementById("resource-body")) displayResources();
if (document.getElementById("request-body")) displayRequests();
