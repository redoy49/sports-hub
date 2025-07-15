import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SectionTitle from "../../components/shared/SectionTitle";

const position = [23.8103, 90.4125]; // Example: Dhaka coordinates

const LocationSection = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%]">
        <SectionTitle
          title="Our Location"
          subtitle="Visit us or find us on the map"
        />
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Address Info */}
          <div className="flex-1 space-y-4 text-gray-700 text-lg">
            <h3 className="font-semibold text-xl mb-2">Sports Club Address</h3>
            <p>123 Club Avenue</p>
            <p>Sports City, Dhaka 1207</p>
            <p>Bangladesh</p>
            <p>Phone: +880 1234 567 890</p>
            <p>Email: info@sportsclub.com</p>
          </div>

          {/* Interactive Map */}
          <div className="flex-1 h-80 rounded-lg overflow-hidden shadow-lg">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Sports Club Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
