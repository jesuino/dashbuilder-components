import React, { Component } from "react";
import {
  Map,
  CircleMarker,
  TileLayer,
  Tooltip,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "./cities";

export interface LatLongProps {
  latitude?: number;
  longitude?: number;
}

interface State {
    latitude?: number;
    longitude?: number;
}

export class LatLong extends Component<LatLongProps, State> {
  render() {
    var centerLat = (data.minLat + data.maxLat) / 2;
    var distanceLat = data.maxLat - data.minLat;
    var bufferLat = distanceLat * 0.05;
    var centerLong = (data.minLong + data.maxLong) / 2;
    var distanceLong = data.maxLong - data.minLong;
    var bufferLong = distanceLong * 0.05;
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Most Populous Cities in Asia</h3>
        <Map
          style={{ height: "480px", width: "100%" }}
          zoom={1}
          center={[centerLat, centerLong]}
          bounds={[
            [data.minLat - bufferLat, data.minLong - bufferLong],
            [data.maxLat + bufferLat, data.maxLong + bufferLong],
          ]}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {data.city.map((city, k) => {
            return (
              <div>
                <CircleMarker
                  key={k}
                  center={[city["coordinates"][1], city["coordinates"][0]]}
                  radius={20 * Math.log(city["population"] / 10000000)}
                  fillOpacity={0.5}
                  stroke={false}
                >
                  <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                    <span>
                      {city["name"] +
                        ": " +
                        "Population" +
                        " " +
                        city["population"]}
                    </span>
                  </Tooltip>
                </CircleMarker>
                <Marker position={[this.props.longitude, this.props.latitude]}><Popup>
            <span>You marked this</span>
          </Popup></Marker>
              </div>
            );
          })}
        </Map>
      </div>
    );
  }
}
