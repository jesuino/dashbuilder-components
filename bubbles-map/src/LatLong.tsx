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
  titleenabled?: boolean;
  title?: string;
  zoom?: number;
  bubblecolor?: string;
}

interface State {
    latitude?: number;
    longitude?: number;
    titleenabled?: boolean;
    title?: string;
    zoom?: number;
    bubblecolor?: string;
}

export class LatLong extends Component<LatLongProps, State> {
  renderTitle(){
    if(this.props.titleenabled==true){
      return <h3 style={{ textAlign: "center" }}>{this.props.title || "Most Populous Cities in Asia"}</h3>;
    }else{
      return null;
    }
  }
  render() {
    return (
      <div>
        {this.renderTitle()}
        <Map
          style={{ height: "480px", width: "100%" }}
          zoom={this.props.zoom || 1}
          center={[this.props.latitude, this.props.longitude]}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {data.city.map((city, k) => {
            return (
              <div>
                <CircleMarker
                  key={k}
                  center={[city["coordinates"][1], city["coordinates"][0]]}
                  radius={20 * Math.log(city["population"] / 10000000)}
                  color={this.props.bubblecolor||"black"}
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
                <Marker position={[this.props.latitude, this.props.longitude]}><Popup>
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
