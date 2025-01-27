'use client'
import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

// Mock data - replace with your actual state-by-state data
const stateData = {
  "CA": { population: 45000, percentage: 25 },
  "TX": { population: 38000, percentage: 21 },
  "FL": { population: 32000, percentage: 18 },
  "NY": { population: 28000, percentage: 16 },
  // Add more states as needed
};

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const getColorScale = (percentage) => {
  if (percentage > 20) return "#fb923c"; // orange-400
  if (percentage > 15) return "#fdba74"; // orange-300
  if (percentage > 10) return "#fed7aa"; // orange-200
  return "#fff7ed"; // orange-50
};

const PrediabetesMap = () => {
  return (
     <div className="relative w-full h-full">
      <ComposableMap projection="geoAlbersUsa" width={800}
        height={400}
        projectionConfig={{
          scale: 800
        }}> 
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateCode = geo.properties.postal;
                const stateInfo = stateData[stateCode] || { percentage: 0 };
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getColorScale(stateInfo.percentage)}
                    stroke="#cbd5e1"
                    strokeWidth={0.5}
                    style={{
                      hover: {
                        fill: "#f97316",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      <div className="absolute bottom-0 right-0 bg-white p-2 rounded-md shadow-sm ">
        <div className="text-xs font-medium mb-1">Population %</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-50"></div>
            <span className="text-xs ml-1">{'<'}10%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-200"></div>
            <span className="text-xs ml-1">10-15%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-300"></div>
            <span className="text-xs ml-1">15-20%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-400"></div>
            <span className="text-xs ml-1">{'>'}20%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrediabetesMap;