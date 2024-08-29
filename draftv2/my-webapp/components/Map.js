import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ setSelectedMarker }) => {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = [
      { id: 1, name: 'Marker 1', lat: 51.505, lng: -0.09, image: 'image1.jpg', description: 'Description 1' },
      { id: 2, name: 'Marker 2', lat: 51.51, lng: -0.1, image: 'image2.jpg', description: 'Description 2' },
    ];

    markers.forEach(marker => {
      const markerInstance = L.marker([marker.lat, marker.lng]).addTo(map);
      markerInstance.on('click', () => {
        setSelectedMarker(marker);
      });
    });

    return () => {
      map.remove();
    };
  }, [setSelectedMarker]);

  return (
    <div 
      id="map" 
      className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-lg shadow"
    />
  );
};

export default Map;
