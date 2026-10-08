"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Star } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const geoUrl = "/world-110m.json";

// Coordinates are [longitude, latitude]
const nodes = [
  { id: "hq", name: "India (HQ)", coordinates: [72.8777, 19.0760], isHQ: true }, // Mumbai
  { id: "us", name: "New York, USA", coordinates: [-74.0060, 40.7128] },
  { id: "uk", name: "London, UK", coordinates: [-0.1276, 51.5072] },
  { id: "uae", name: "Dubai, UAE", coordinates: [55.2708, 25.2048] },
  { id: "sg", name: "Singapore", coordinates: [103.8198, 1.3521] },
  { id: "aus", name: "Sydney, Australia", coordinates: [151.2093, -33.8688] },
  { id: "jp", name: "Tokyo, Japan", coordinates: [139.6917, 35.6895] },
];

export function GlobalOperationsMap() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  const hqNode = nodes.find(n => n.isHQ)!;

  return (
    <section className="relative py-24 overflow-hidden bg-[#081120]">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">
            <span className="text-white">Worldwide </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#00E5A0]">
              Service Provider
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Our data infrastructure scales globally. We deliver highly available, low-latency data solutions across continents.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full max-w-5xl mx-auto bg-[#0A1325] rounded-3xl border border-white/[0.05] shadow-2xl overflow-hidden p-4 sm:p-8">
          
          {/* Badge */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-lg">
            <Globe className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span className="text-xs font-medium text-[#CBD5E1]">Interactive Operations Map — Global</span>
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 130,
                center: [20, 25] // Adjust center to better fit all nodes
              }}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "2/1",
              }}
            >
              {/* Map Outline & Fill */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#0F172A"
                      stroke="#1E293B"
                      strokeWidth={1}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#1E293B", outline: "none", transition: "all 0.2s" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Dotted Connections to HQ */}
              {nodes.filter(n => !n.isHQ).map((node, i) => (
                <Line
                  key={`line-${node.id}`}
                  from={hqNode.coordinates as [number, number]}
                  to={node.coordinates as [number, number]}
                  stroke="#00C2FF"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  strokeOpacity={0.4}
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(0, 194, 255, 0.5))"
                  }}
                />
              ))}



              {/* Node Markers */}
              {nodes.map((node) => (
                <Marker key={node.id} coordinates={node.coordinates as [number, number]}>
                  {node.isHQ ? (
                    <g transform="translate(0, 0)">
                      <circle r={18} fill="#00E5A0" opacity={0.15} className="animate-ping" />
                      <circle r={12} fill="#00E5A0" opacity={0.3} className="blur-sm" />
                      <circle r={6} fill="#00E5A0" stroke="#FFF" strokeWidth={1.5} style={{ filter: "drop-shadow(0 0 8px rgba(0,229,160,0.8))" }} />
                      
                      {/* HQ Label */}
                      <g transform="translate(0, 20)">
                        <rect x="-45" y="0" width="90" height="24" rx="4" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <text textAnchor="middle" y="16" fill="#FFF" fontSize="10px" fontWeight="bold" style={{ fontFamily: "inherit" }}>
                          {node.name}
                        </text>
                        {/* Fake star via text or path could be added if needed */}
                      </g>
                    </g>
                  ) : (
                    <g transform="translate(0, 0)">
                      <circle r={3.5} fill="#0057D9" stroke="#FFF" strokeWidth={1} style={{ filter: "drop-shadow(0 0 6px rgba(0,194,255,0.6))" }} />
                      
                      {/* Regular Label */}
                      <g transform="translate(0, 14)">
                        <rect x="-35" y="0" width="70" height="18" rx="4" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <text textAnchor="middle" y="12" fill="#FFF" fontSize="8px" fontWeight="500" style={{ fontFamily: "inherit" }}>
                          {node.name}
                        </text>
                      </g>
                    </g>
                  )}
                </Marker>
              ))}
            </ComposableMap>
          </div>

        </div>
      </div>
    </section>
  );
}
