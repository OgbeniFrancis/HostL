/* MOBILE MENU */ function toggleMenu() { const menu = document.getElementById("mobileMenu"); if (menu) { menu.classList.toggle("show"); } }

/* DARK MODE */ function toggleDarkMode() { document.body.classList.toggle("dark"); localStorage.setItem( "darkMode", document.body.classList.contains("dark") ); }

window.onload = () => { if (localStorage.getItem("darkMode") === "true") { document.body.classList.add("dark"); }

loadProperties(); loadPropertyDetails(); };

/* LOAD PROPERTY GRID */ async function loadProperties() { const grid = document.getElementById("propertyGrid"); if (!grid) return;

try { const res = await fetch("properties.json"); const data = await res.json();
     grid.innerHTML = data
  .map(
    (p) => `
${p.title}
${p.location}

₦${p.price.toLocaleString()} [blocked] ` ) .join(""); } catch (error) { grid.innerHTML = "
Error loading properties.

"; } }
/* PROPERTY DETAILS */ async function loadPropertyDetails() { const container = document.getElementById("detailsContainer"); if (!container) return;

const params = new URLSearchParams(window.location.search); const id = params.get("id");

try { const res = await fetch("properties.json"); const data = await res.json();
     const property = data.find((p) => p.id == id);

if (!property) {
  container.innerHTML = "<p>Property not found.</p>";
  return;
}

container.innerHTML = `
  <h2 class="page-title">${property.title}</h2>
  <p><strong>Location:</strong> ${property.location}</p>
  <p><strong>Price:</strong> ₦${property.price.toLocaleString()}</p>
  <p style="margin-top:10px">${property.description}</p>
  ${property.images
    .map((img) => `<img src="${img}" alt="${property.title}">`)
    .join("")}
  <a class="btn-primary" style="margin-top:20px; display:inline-block;" href="contact.html">
    Request Inspection
  </a>
`;
} catch (error) { container.innerHTML = "

Error loading property.

"; } }
