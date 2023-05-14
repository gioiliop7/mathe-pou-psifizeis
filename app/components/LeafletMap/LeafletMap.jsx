import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LeafletMap({ points }) {
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (map) {
      map.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const svgIcon = L.divIcon({
    html: `
<svg height="30px" width="30px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#0400f0" stroke="#0400f0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#0400f0;} </style> <g> <path class="st0" d="M195.928,376.064H148.67l-43.168,82.738H512l-43.168-82.738h-42.957l9.478,28.779h-28.799L364.51,185.406 c0,0-5.038,1.349-12.576,3.281l-0.52-2.614c-0.928-4.518-2.642-8.621-4.68-12.527c-2.051-3.9-4.441-7.581-6.914-11.01l-0.716-0.991 l-0.899-0.78c-5.677-5.017-15.949-13.237-33.402-24.598l0.042,0.028c-18.274-11.945-38.938-18.345-56.946-18.774 c-38.826-0.801-81.727-1.68-93.2-1.911l-10.856-6.984l6.415-9.465L83.967,53.197L0,178.176l65.525,45.852l8.796-12.971 l22.414,15.141l32.298,48.009c4.771,7.082,11.27,12.871,18.908,16.757l0.077,0.042c0.014,0,5.754,2.867,13.82,6.942 c8.052,4.075,18.416,9.359,27.556,14.158l0.014,0.007c7.364,3.85,15.725,7.194,24.563,10.146l0.112,0.035l5.621,1.743 l15.569,80.806h-29.769L195.928,376.064z M220.757,301.771c-8.031-2.684-15.408-5.67-21.345-8.782h0.014 c-18.422-9.66-41.285-21.05-41.742-21.282c-4.286-2.185-8.044-5.522-10.742-9.542l-34.638-51.501l-25.87-17.474l45.29-66.789 l16.441,10.568l3.049,0.056c0.028,0.007,12.745,0.267,31.14,0.64c18.401,0.379,42.465,0.871,65.103,1.342 c13.089,0.204,30.795,5.466,45.528,15.218l0.45,0.295l-0.407-0.267c15.696,10.23,24.9,17.509,29.93,21.865 c0.619,0.871,1.209,1.742,1.771,2.614l-29.776,2.494l-36.605,13.251l-1.398,1.124c-11.755,9.436-18.682,23.6-18.921,38.636v0.681 c-0.006,14.846,6.506,28.94,17.825,38.552l2.382,2.016l0.295,0.042c0.886,0.717,2.122,1.728,3.921,3.239 c4.026,3.379,10.651,9.028,21.443,18.401c1.982,1.721,3.106,3.274,3.738,4.56c0.639,1.293,0.836,2.326,0.844,3.337 c0.014,2.108-1.082,4.722-3.865,7.103c-2.74,2.333-6.913,4.054-11.719,4.047c-1.939,0-3.977-0.267-6.113-0.885l-0.498-0.14 l0.541,0.154c-8.347-2.445-17.143-4.798-25.743-7.285L220.757,301.771z"></path> </g> </g></svg>`,
    className: "svg-icon",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
  });

  const position = [37.9838, 23.7275];
  const combinedPoints = [];
  points.forEach((point) => {
    const existingPoint = combinedPoints.find(
      (combinedPoint) =>
        combinedPoint.lat === point.lat && combinedPoint.long === point.long
    );

    if (existingPoint) {
      existingPoint.names.push(`${point.name} ${point.surname}`);
      existingPoint.pollingIds.push(point.pollingId);
      existingPoint.dhmots.push(point.dhmot);
    } else {
      combinedPoints.push({
        lat: point.lat,
        long: point.long,
        names: [`${point.name} ${point.surname}`],
        pollingIds: [point.pollingId],
        dhmots: [point.dhmot],
        address: point.address,
      });
    }
  });

  const cartoLight =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const cartoDark =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={position}
      zoom={8}
      style={{ height: "100%" }}
      minZoom={7}
      whenCreated={setMap}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Carto" checked>
          <TileLayer
            attribution='&copy; <a href="https://carto.com">CARTO</a> | &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Maps">
          <TileLayer
            attribution='&copy; <a href="https://maps.google.com">Google Maps</a> | &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Satellite">
          <TileLayer
            attribution='&copy; <a href="https://maps.google.com">Google Maps</a> contributors'
            url="http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Carto Light">
          <TileLayer url={cartoLight} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Carto Dark">
          <TileLayer url={cartoDark} />
        </LayersControl.BaseLayer>

        {combinedPoints.map((combinedPoint, index) => (
          <Marker
            key={index}
            position={[combinedPoint.lat, combinedPoint.long]}
            icon={svgIcon}
          >
            <Popup>
              <div>
                {combinedPoint.names.map((name, nameIndex) => (
                  <div key={nameIndex} className="m-2 text-center">
                    {name}
                  </div>
                ))}
                <div className="m-2 font-bold text-center">
                  {`${combinedPoint.pollingIds.join(
                    ", "
                  )} - ${combinedPoint.dhmots.join(", ")}`}
                </div>
                <div className="m-2 text-center">{combinedPoint.address}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </LayersControl>
    </MapContainer>
  );
}

export default LeafletMap;
