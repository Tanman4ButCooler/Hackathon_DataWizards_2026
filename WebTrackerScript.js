// MY JAVASCIPT
let accidents = [];
let markers = [];
let map;
let selectedIncident = null;

// Edmonton coordinates
const EDMONTON_CENTER = [53.5461, -113.4938];

//INITIALIZE MAP 
function initMap() {
    map = L.map('map').setView(EDMONTON_CENTER, 11);
    
    // Add OpenStreetMap tiles (free, no API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add click handler to map
    map.on('click', onMapClick);
    
    // Load sample data
    loadSampleAccidents();
}

// SAMPLE ACCIDENTS SUDEV DONT EDIT YET
function loadSampleAccidents() {
    const sampleData = [
        {
            id: 'ACC001',
            lat: 53.5461, lng: -113.4938,
            location: 'Jasper Ave & 109 St',
            type: 'vehicle',
            severity: 'high',
            time: 'morning',
            weather: 'clear',
            dateTime: 'Today, 8:45 AM',
            description: 'Two vehicles collided at intersection. Injuries reported.'
        },
        {
            id: 'ACC002',
            lat: 53.5261, lng: -113.5238,
            location: 'Whyte Ave & 104 St',
            type: 'pedestrian',
            severity: 'medium',
            time: 'afternoon',
            weather: 'rain',
            dateTime: 'Today, 3:30 PM',
            description: 'Pedestrian struck at crosswalk. Minor injuries.'
        },
        {
            id: 'ACC003',
            lat: 53.5661, lng: -113.5838,
            location: 'Kingsway & 111 Ave',
            type: 'vehicle',
            severity: 'high',
            time: 'night',
            weather: 'snow',
            dateTime: 'Yesterday, 10:45 PM',
            description: 'Multi-vehicle pileup due to whiteout conditions.'
        }
    ];
    
    sampleData.forEach(data => {
        addAccidentMarker(data);
        accidents.push(data);
    });
    
    updateTotalReports();
    updateAccidentCounter();
}

function addAccidentMarker(accident) {
    // Determine marker color based on severity
    let markerColor = '#27ae60'; // low - green
    if (accident.severity === 'high') markerColor = '#e74c3c'; // red
    else if (accident.severity === 'medium') markerColor = '#f39c12'; // orange
    
    // Create custom marker icon
    const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -13]
    });
    
    // Create marker
    const marker = L.marker([accident.lat, accident.lng], { icon: markerIcon }).addTo(map);
    
    // Add popup
    marker.bindPopup(`
        <strong>${accident.location}</strong><br>
        Type: ${accident.type}<br>
        Severity: ${accident.severity}<br>
        Time: ${accident.dateTime}<br>
        <button onclick="selectAccident('${accident.id}')" style="background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-top: 8px; cursor: pointer;">View Details</button>
    `);
    
    // Store marker reference
    marker.accidentId = accident.id;
    markers.push(marker);
    
    // Click handler to select accident
    marker.on('click', function() {
        selectAccident(accident.id);
    });
}

function onMapClick(e) {
    const lat = e.latlng.lat.toFixed(4);
    const lng = e.latlng.lng.toFixed(4);
    
    // Show modal with clicked coordinates
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
    document.getElementById('clickLocation').innerHTML = 
        `<i class="fas fa-map-marker-alt" style="color: #e74c3c;"></i> Selected Location: <strong>${lat}, ${lng}</strong>`; 
    
    // Clear and show modal
    document.getElementById('accidentForm').reset();
    document.getElementById('reportModal').classList.add('show');
}

function selectAccident(id) {
    const accident = accidents.find(a => a.id === id);
    if (!accident) return;
    
    selectedIncident = accident;
    
    // Update right panel
    document.getElementById('selectedIncidentId').textContent = `ID: ${accident.id}`;
    
    const detailsDiv = document.getElementById('incidentDetails');
    detailsDiv.innerHTML = `
        <div class="info-section">
            <h3>Location Details</h3>
            <div class="info-card">
                <div class="label">Intersection</div>
                <div class="value">${accident.location}</div>
            </div>
            <div class="info-card">
                <div class="label">Coordinates</div>
                <div class="value">${accident.lat.toFixed(4)}, ${accident.lng.toFixed(4)}</div>
            </div>
        </div>
        
        <div class="info-section">
            <h3>Incident Information</h3>
            <div class="info-card">
                <div class="label">Type of Accident</div>
                <div class="value">${accident.type}</div>
            </div>
            <div class="info-card">
                <div class="label">Severity Level</div>
                <div class="value"><span class="severity-badge severity-${accident.severity}">${accident.severity}</span></div>
            </div>
            <div class="info-card">
                <div class="label">Time & Date</div>
                <div class="value">${accident.dateTime}</div>
            </div>
        </div>
        
        <div class="info-section">
            <h3>Additional Details</h3>
            <div class="info-card">
                <div class="label">Weather Conditions</div>
                <div class="value">${accident.weather}</div>
            </div>
            <div class="info-card">
                <div class="label">Description</div>
                <div class="value">${accident.description}</div>
            </div>
        </div>
    `;
}

// Form submission
document.getElementById('accidentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
    
    const newAccident = {
        id: 'ACC' + String(accidents.length + 1).padStart(3, '0'),
        lat: lat,
        lng: lng,
        location: document.getElementById('location').value,
        type: document.getElementById('type').value,
        severity: document.getElementById('severity').value,
        time: document.getElementById('time').value,
        weather: document.getElementById('weather').value,
        dateTime: document.getElementById('dateTime').value,
        description: document.getElementById('description').value
    };
    
    // Add to array
    accidents.push(newAccident);
    
    // Add marker to map
    addAccidentMarker(newAccident);
    
    // Close modal
    closeModal();
    
    // Show success message
    showNotification('Accident reported successfully!', 'success');
    
    // Update counters
    updateTotalReports();
    updateAccidentCounter();
});

// modal-content
function closeModal() {
    document.getElementById('reportModal').classList.remove('show');
}

document.querySelector('.close-modal').addEventListener('click', closeModal);

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// filters
function applyFilters() {
  
    // Get active filters
    const highActive = document.querySelector('[data-filter="severity-high"] .toggle-switch')?.classList.contains('active');
    const mediumActive = document.querySelector('[data-filter="severity-medium"] .toggle-switch')?.classList.contains('active');
    const lowActive = document.querySelector('[data-filter="severity-low"] .toggle-switch')?.classList.contains('active');
    
    const morningActive = document.querySelector('[data-filter="time-morning"] .toggle-switch')?.classList.contains('active');
    const afternoonActive = document.querySelector('[data-filter="time-afternoon"] .toggle-switch')?.classList.contains('active');
    const nightActive = document.querySelector('[data-filter="time-night"] .toggle-switch')?.classList.contains('active');
    
    const clearActive = document.querySelector('[data-filter="weather-clear"] .toggle-switch')?.classList.contains('active');
    const rainActive = document.querySelector('[data-filter="weather-rain"] .toggle-switch')?.classList.contains('active');
    const snowActive = document.querySelector('[data-filter="weather-snow"] .toggle-switch')?.classList.contains('active');
    
    // Get legend filters
    const vehicleActive = !document.querySelector('[data-type="vehicle"]')?.classList.contains('inactive');
    const pedestrianActive = !document.querySelector('[data-type="pedestrian"]')?.classList.contains('inactive');
    const cyclistActive = !document.querySelector('[data-type="cyclist"]')?.classList.contains('inactive');
    const severeActive = !document.querySelector('[data-type="severe"]')?.classList.contains('inactive');
    
    let visibleCount = 0;
    
    markers.forEach(marker => {
        const accident = accidents.find(a => a.id === marker.accidentId);
        if (!accident) return;
        
        const severityMatch = (accident.severity === 'high' && highActive) ||
                            (accident.severity === 'medium' && mediumActive) ||
                            (accident.severity === 'low' && lowActive);
        
        const timeMatch = (accident.time === 'morning' && morningActive) ||
                        (accident.time === 'afternoon' && afternoonActive) ||
                        (accident.time === 'night' && nightActive);
        
        const weatherMatch = (accident.weather === 'clear' && clearActive) ||
                            (accident.weather === 'rain' && rainActive) ||
                            (accident.weather === 'snow' && snowActive);
        
        let typeMatch = true;
        if (accident.type === 'vehicle' && !vehicleActive) typeMatch = false;
        if (accident.type === 'pedestrian' && !pedestrianActive) typeMatch = false;
        if (accident.type === 'cyclist' && !cyclistActive) typeMatch = false;
        if (accident.severity === 'high' && !severeActive) typeMatch = false;
        
        if (severityMatch && timeMatch && weatherMatch && typeMatch) {
            marker.addTo(map);
            visibleCount++;
        } else {
            map.removeLayer(marker);
        }
    });
    
    updateAccidentCounter(visibleCount);
}

// Update counter 
function updateTotalReports() {
    document.getElementById('totalReports').textContent = accidents.length;
}

function updateAccidentCounter(count) {
    const counter = document.getElementById('accidentCounter');
    if (count !== undefined) {
        counter.innerHTML = `Showing ${count} accidents`;
    } else {
        counter.innerHTML = `Click on map to report an accident`;
    }
}

// NOTIFICATION 
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== CSV EXPORT ====================
function exportToCSV() {
    if (accidents.length === 0) {
        showNotification('No accidents to export', 'error');
        return;
    }
    
    const headers = ['ID', 'Latitude', 'Longitude', 'Location', 'Type', 'Severity', 'Time', 'Weather', 'DateTime', 'Description'];
    const rows = accidents.map(a => [
        a.id,
        a.lat,
        a.lng,
        a.location,
        a.type,
        a.severity,
        a.time,
        a.weather,
        a.dateTime,
        a.description
    ]);
    
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edmonton_accidents_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('CSV exported successfully!', 'success');
}

// CSV IMPORT
function importCSV(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const lines = e.target.result.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const values = lines[i].split(',');
            if (values.length >= 10) {
                const accident = {
                    id: values[0] || 'ACC' + String(accidents.length + 1).padStart(3, '0'),
                    lat: parseFloat(values[1]) || 53.5461,
                    lng: parseFloat(values[2]) || -113.4938,
                    location: values[3] || 'Unknown',
                    type: values[4] || 'vehicle',
                    severity: values[5] || 'medium',
                    time: values[6] || 'afternoon',
                    weather: values[7] || 'clear',
                    dateTime: values[8] || 'Unknown',
                    description: values[9] || 'No description'
                };
                
                accidents.push(accident);
                addAccidentMarker(accident);
            }
        }
        
        updateTotalReports();
        updateAccidentCounter();
        showNotification(`Imported ${lines.length - 1} accidents`, 'success');
    };
    
    reader.readAsText(file);
    event.target.value = '';
}

// Event listener 
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    
    // Date filter buttons
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showNotification(`Filtered by: ${this.textContent}`, 'info');
        });
    });
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'list') {
                showAccidentList();
            } else if (view === 'stats') {
                showStatistics();
            } else {
                // Return to map view
                location.reload(); // Simple way to reset
            }
        });
    });
    
    // Toggle switches
    document.querySelectorAll('.toggle-switch').forEach(sw => {
        sw.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            applyFilters();
        });
    });
    
    // Filter options
    document.querySelectorAll('.filter-option').forEach(opt => {
        opt.addEventListener('click', function(e) {
            if (!e.target.classList.contains('toggle-switch')) {
                const toggle = this.querySelector('.toggle-switch');
                toggle.classList.toggle('active');
                applyFilters();
            }
        });
    });
    
    // Legend items
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('inactive');
            applyFilters();
        });
    });
    
    // CSV import
    document.getElementById('csvImport').addEventListener('change', importCSV);
});

// Functions
function showAccidentList() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; height: 100%; overflow-y: auto;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Accident List</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #2c3e50; color: white;">
                        <th style="padding: 12px;">ID</th>
                        <th style="padding: 12px;">Location</th>
                        <th style="padding: 12px;">Type</th>
                        <th style="padding: 12px;">Severity</th>
                        <th style="padding: 12px;">Date</th>
                        <th style="padding: 12px;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${accidents.map(a => `
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px;">${a.id}</td>
                            <td style="padding: 12px;">${a.location}</td>
                            <td style="padding: 12px;">${a.type}</td>
                            <td style="padding: 12px;"><span class="severity-badge severity-${a.severity}">${a.severity}</span></td>
                            <td style="padding: 12px;">${a.dateTime}</td>
                            <td style="padding: 12px;">
                                <button onclick="selectAccident('${a.id}')" style="background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">View</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function showStatistics() {
    const high = accidents.filter(a => a.severity === 'high').length;
    const medium = accidents.filter(a => a.severity === 'medium').length;
    const low = accidents.filter(a => a.severity === 'low').length;
    const vehicle = accidents.filter(a => a.type === 'vehicle').length;
    const pedestrian = accidents.filter(a => a.type === 'pedestrian').length;
    const cyclist = accidents.filter(a => a.type === 'cyclist').length;
    
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; height: 100%; overflow-y: auto;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Statistics</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #2c3e50;">${accidents.length}</div>
                    <div style="color: #7f8c8d;">Total Accidents</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #e74c3c;">${high}</div>
                    <div style="color: #7f8c8d;">High Severity</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #f39c12;">${medium}</div>
                    <div style="color: #7f8c8d;">Medium Severity</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: #27ae60;">${low}</div>
                    <div style="color: #7f8c8d;">Low Severity</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #e74c3c;">${vehicle}</div>
                    <div style="color: #7f8c8d;">Vehicle</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #f39c12;">${pedestrian}</div>
                    <div style="color: #7f8c8d;">Pedestrian</div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #27ae60;">${cyclist}</div>
                    <div style="color: #7f8c8d;">Cyclist</div>
                </div>
            </div>
        </div>
    `;
}