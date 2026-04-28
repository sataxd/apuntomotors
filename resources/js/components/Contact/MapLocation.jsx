import React from "react"
import { MapPin, Phone, Clock } from 'lucide-react';
import Global from "../../Utils/Global";

const MapLocation = ({ generals }) => {
  // const location = (generals.find(x => x.correlative == 'location')?.description ?? '0,0').split(',').map(x => Number(x.trim()));
  // const lat = location[0];
  // const lng = location[1];
  const latField = generals.find(x => x.correlative === 'lat');
  const longField = generals.find(x => x.correlative === 'long');
  const lat = parseFloat(latField?.description || 0);
  const lng = parseFloat(longField?.description || 0);
  
  return (
    <>
      <div className="relative w-full">
       
            <div className="w-full h-[400px] lg:h-[450px] rounded-lg shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${Global.GMAPS_API_KEY}&q=${lat},${lng}&zoom=15`}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

      </div>
    </>
  );
}

export default MapLocation;

