import React, { Component } from "react";
import { Data } from "./Data";
import { Map, CircleMarker, TileLayer, Tooltip, Viewport } from "react-leaflet";
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
  minRadius: number;
  resizeBubbles: boolean;
}

export interface LatLongState {
  currentZoom: number;
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export class LatLong extends Component<LatLongProps, LatLongState> {
  constructor(props: LatLongProps) {
    super(props);
    this.state = {
      currentZoom: props.zoom,
    };
  }

  renderTitle() {
    if (this.props.titleenabled === true) {
      return <h3 style={{ textAlign: "center" }}>{this.props.title}</h3>;
    } else {
      return null;
    }
  }

  onViewPortChanged(viewPort: Viewport) {
    if (this.props.resizeBubbles) {
      this.setState({
        currentZoom: viewPort.zoom || this.props.zoom,
      });
    }
  }

  zoomFactor(): number {
    const currentZoom = this.state.currentZoom;
    const userZoom = this.props.zoom;
    if (currentZoom > userZoom) {
      return currentZoom / userZoom;
    }
    return 1;
  }

  render() {
    const allValues: number[] = this.props.data.map((d) => d.value);
    const maxValue = allValues.length > 1 ? Math.max.apply(Math, allValues) : allValues[0];
    const minValue = allValues.length > 1 ? Math.min.apply(Math, allValues) : 0;
    return (
      <div>
        {this.renderTitle()}
        <Map
          style={{ height: "480px", width: "100%" }}
          zoom={this.props.zoom}
          center={[this.props.latitude, this.props.longitude]}
          onViewportChange={(viewPort) => this.onViewPortChanged(viewPort)}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {this.props.data.map((d) => {
            return (
              <div key={d.name}>
                <CircleMarker
                  key={d.name}
                  center={[d.latitude, d.longitude]}
                  radius={
                    map_range(
                      d.value,
                      minValue,
                      maxValue,
                      this.props.minRadius,
                      this.props.maxRadius
                    ) * this.zoomFactor()
                  }
                  color={this.props.bubblecolor}
                  fillOpacity={0.5}
                  stroke={false}
                >
                  <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                    <span>{`${d.name}: ${d.value}`}</span>
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
