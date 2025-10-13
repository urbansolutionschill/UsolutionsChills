// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Simple search function (optional)
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    alert(`You searched for: ${query}`);
  } else {
    alert("Please enter something to search!");
  }
});
// ===== REALTIME LOCATION (SHOW CITY/STATE/COUNTRY) =====
const locationText = document.getElementById("locationText");

// Check if browser supports location
if ("geolocation" in navigator) {
  locationText.textContent = "Detecting your location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Fetch readable location name using OpenStreetMap reverse geocoding API
      fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address) {
            const { city, town, village, state, country } = data.address;

            // Choose best available name
            const placeName = city || town || village || "Unknown Area";

            locationText.textContent = `${placeName}, ${state || ""}, ${country || ""}`;
          } else {
            locationText.textContent = "Location not found";
          }
        })
        .catch(() => {
          locationText.textContent = "Unable to detect city";
        });
    },
    (error) => {
      locationText.textContent = "Location access denied";
      console.error(error);
    }
  );
} else {
  locationText.textContent = "Geolocation not supported";
}
