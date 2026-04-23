"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Lokasi = {
  id: number;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string | null;
  account: { name: string | null };
};

type Props = {
  locations: Lokasi[];
  userPosition: [number, number] | null;
  selectedLocation: Lokasi | null;
  onSelectLocation: (loc: Lokasi) => void;
};

// Custom marker icons
const createIcon = (color: string, size: number = 28) =>
  L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        transform: rotate(45deg);
        font-size: ${size * 0.35}px;
        color: white;
        font-weight: 900;
      ">●</div>
    </div>`,
  });

const greenIcon = createIcon("#00ff7f", 28);
const selectedIcon = createIcon("#00cc66", 36);

const userIcon = L.divIcon({
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  html: `<div style="
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 6px rgba(59,130,246,0.2), 0 2px 8px rgba(0,0,0,0.3);
    animation: pulse 2s ease-in-out infinite;
  "></div>
  <style>
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 6px rgba(59,130,246,0.2), 0 2px 8px rgba(0,0,0,0.3); }
      50% { box-shadow: 0 0 0 12px rgba(59,130,246,0.1), 0 2px 8px rgba(0,0,0,0.3); }
    }
  </style>`,
});

export default function LokasiMap({
  locations,
  userPosition,
  selectedLocation,
  onSelectLocation,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const center: [number, number] = userPosition || [-6.2, 106.816];

    const map = L.map(mapContainerRef.current, {
      center,
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark tile layer matching FitLife dark theme
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
      },
    ).addTo(map);

    // Zoom control di kanan bawah
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Attribution
    L.control
      .attribution({ position: "bottomleft" })
      .addAttribution(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      )
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update user position marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userPosition) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userPosition);
    } else {
      userMarkerRef.current = L.marker(userPosition, { icon: userIcon })
        .addTo(map)
        .bindPopup(
          `<div style="
            font-family: system-ui, sans-serif;
            padding: 4px 0;
          ">
            <strong style="color: #3b82f6;">📍 Lokasi Anda</strong>
          </div>`,
        );
    }
  }, [userPosition]);

  // Update location markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const currentIds = new Set(locations.map((l) => l.id));

    // Remove markers no longer in locations
    markersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add/update markers
    const bounds: [number, number][] = [];

    locations.forEach((loc) => {
      if (!loc.latitude || !loc.longitude) return;

      const pos: [number, number] = [loc.latitude, loc.longitude];
      bounds.push(pos);

      const isSelected = selectedLocation?.id === loc.id;
      const icon = isSelected ? selectedIcon : greenIcon;

      const existingMarker = markersRef.current.get(loc.id);
      if (existingMarker) {
        existingMarker.setLatLng(pos);
        existingMarker.setIcon(icon);
      } else {
        const marker = L.marker(pos, { icon })
          .addTo(map)
          .bindPopup(
            `<div style="
              font-family: system-ui, sans-serif;
              padding: 4px 0;
              min-width: 150px;
            ">
              <strong style="color: #00ff7f; font-size: 13px;">${loc.name}</strong>
              ${loc.address ? `<br><span style="color: #8aafa1; font-size: 11px;">${loc.address}</span>` : ""}
            </div>`,
          );

        marker.on("click", () => {
          onSelectLocation(loc);
        });

        markersRef.current.set(loc.id, marker);
      }
    });

    // Fit bounds if we have locations
    if (bounds.length > 0) {
      if (userPosition) bounds.push(userPosition);
      const leafletBounds = L.latLngBounds(
        bounds.map(([lat, lng]) => [lat, lng] as [number, number]),
      );
      map.fitBounds(leafletBounds, { padding: [50, 50], maxZoom: 14 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, selectedLocation]);

  // Fly to selected location
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLocation?.latitude || !selectedLocation?.longitude)
      return;

    map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 16, {
      duration: 0.8,
    });

    const marker = markersRef.current.get(selectedLocation.id);
    if (marker) {
      marker.openPopup();
    }
  }, [selectedLocation]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ background: "#062c1e" }}
    />
  );
}
