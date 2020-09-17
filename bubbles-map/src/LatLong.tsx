import React, { Component } from "react";
import {Data} from "./Data"
import {
  Map,
  CircleMarker,
  TileLayer,
  Tooltip
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface LatLongProps {
  latitude: number;
  longitude: number;
  titleenabled: boolean;
  title: string;
  zoom: number;
  bubblecolor: string;
  data: Data[];
  maxRadius: number;
}


function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export class LatLong extends Component<LatLongProps> {
  renderTitle() {
    if (this.props.titleenabled === true) {
      return <h3 style={{ textAlign: "center" }}>{this.props.title}</h3>;
    } else {
      return null;
    }
  }
  render() {
    const allValues: number[] = this.props.data.map(d => d.value);
    const maxValue = Math.max.apply(Math, allValues);
    const minValue = Math.min.apply(Math, allValues);
    return (
      <div>
        {this.renderTitle()}
        <Map
          style={{ height: "480px", width: "100%" }}
          zoom={this.props.zoom}
          center={[this.props.latitude, this.props.longitude]}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {this.props.data.map((d) => {
            return (
              <div>
                <CircleMarker
                  key={d.name}
                  center={[d.longitude, d.latitude]}
                  radius={map_range(d.value, minValue, maxValue, 1, this.props.maxRadius)}
                  color={this.props.bubblecolor}
                  fillOpacity={0.5}
                  stroke={false}
                >
                  <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                    <span>
                    {`${d.name}: ${d.value}`}
                    </span>
                  </Tooltip>
                </CircleMarker>                
              </div>
            );
          })}
        </Map>
      </div>
    );
  }
}
