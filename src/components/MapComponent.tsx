import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SiGooglemaps } from 'react-icons/si';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom Orange Marker Icon
const orangeIcon = L.divIcon({
    html: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Localização da Igreja Verbo da Vida Cabula">
    <title>Localização da Igreja Verbo da Vida Cabula</title>
    <path d="M12 0C7.58 0 4 3.58 4 8C4 13.54 12 24 12 24C12 24 20 13.54 20 8C20 3.58 16.42 0 12 0ZM12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11Z" fill="#f27f22" stroke="white" stroke-width="1.5"/>
  </svg>`,
    className: "custom-marker-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

interface MapComponentProps {
    position: [number, number];
    googleMapsUrl: string;
}

const MapComponent = ({ position, googleMapsUrl }: MapComponentProps) => {
    return (
        <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={orangeIcon} alt="Localização da Igreja Verbo da Vida Cabula, Salvador/BA">
                <Popup>
                    <div className="font-aeonik text-rvl-escuro p-1">
                        <strong className="block mb-1 text-sm">Verbo da Vida Cabula</strong>
                        <span className="text-xs block mb-3 opacity-70">Salvador/BA</span>
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-rvl-laranja text-white border border-rvl-laranja px-3 py-2 rounded-lg text-[10px] font-bold no-underline shadow-sm active:scale-95"
                        >
                            <SiGooglemaps size={14} className="text-white" />
                            <span className="text-white">VER NO GOOGLE MAPS</span>
                        </a>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
