const MapSystem = {
    map: null,
    markers: {},
    userMarker: null,
    
    init() {
        // Init Leaflet map (default centered on Paris, will update with GPS)
        this.map = L.map('map').setView([48.8566, 2.3522], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(this.map);

        this.startGeolocation();
    },

    addPOIMarker(poi, isVisited) {
        // Red if visited, Blue if not
        const color = isVisited ? 'var(--success-color)' : 'var(--primary-color)';
        
        const iconHtml = `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`;
        
        const icon = L.divIcon({
            className: 'poi-icon',
            html: iconHtml,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });

        const marker = L.marker([poi.lat, poi.lng], { icon }).addTo(this.map);
        
        // Bind popup with link to static POI page
        marker.bindPopup(`
            <div style="text-align: center;">
                <b>${poi.name}</b><br><br>
                <a href="${poi.url}" style="display:inline-block; padding:8px 16px; background:var(--primary-color); color:white; text-decoration:none; border-radius:4px;">Visit</a>
            </div>
        `);
        
        this.markers[poi.id] = marker;
    },

    startGeolocation() {
        if (!navigator.geolocation) {
            console.warn("Geolocation is not supported by your browser");
            return;
        }

        // Watch user's position in real-time
        navigator.geolocation.watchPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            if (!this.userMarker) {
                // Create user marker on first fix
                const userIconHtml = `<div style="background-color: #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"></div>`;
                const userIcon = L.divIcon({
                    className: 'user-icon',
                    html: userIconHtml,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });
                this.userMarker = L.marker([lat, lng], { icon: userIcon, zIndexOffset: 1000 }).addTo(this.map);
                
                // Recenter map on user location initially
                this.map.setView([lat, lng], 14);
            } else {
                // Update position
                this.userMarker.setLatLng([lat, lng]);
            }
        }, (error) => {
            console.error("Geolocation error:", error.message);
        }, {
            enableHighAccuracy: true,   // Important for tracking
            maximumAge: 10000,
            timeout: 5000
        });
    }
};
