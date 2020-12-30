import * as React from "react";
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

function map_range(value:number, low1:number, high1:number, low2:number, high2:number) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export function LatLong(props:LatLongProps) {

  const [currentZoom, setcurrentZoom]=React.useState<number>(props.zoom)
  function renderTitle() {
    if (props.titleenabled === true) {
      return <h3 style={{ textAlign: "center" }}>{props.title}</h3>;
    } else {
      return null;
    }
  }

  function onViewPortChanged(viewPort: Viewport) {
    console.debug(viewPort);
    if (props.resizeBubbles) {
      setcurrentZoom(
        viewPort.zoom || props.zoom,
      );
    }
  }

  function zoomFactor(): number {
    const userZoom = props.zoom;
    if (currentZoom > userZoom) {
      return currentZoom / userZoom;
    }
    return 1;
  }

    const allValues: number[] = props.data.map((d) => d.value);
    const maxValue =
      allValues.length > 1 ? Math.max.apply(Math, allValues) : allValues[0];
    const minValue = allValues.length > 1 ? Math.min.apply(Math, allValues) : 0;
    return (
      <div>
        {renderTitle()}
        <Map
          style={{ height: "480px", width: "100%" }}
          zoom={props.zoom}
          center={[props.latitude, props.longitude]}
          onViewportChange={(viewPort: any) => onViewPortChanged(viewPort)}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {props.data.map((d) => {
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
                      props.minRadius,
                      props.maxRadius
                    ) * zoomFactor()
                  }
                  color={props.bubblecolor}
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
