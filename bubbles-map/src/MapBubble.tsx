import React from "react";
import { LatLong } from "./LatLong";
import "leaflet/dist/leaflet.css";
var Component = React.Component;

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

export class MapBubble extends Component<LatLongProps, State> {
  receiveEvent: (event: any) => void;

  constructor(props: LatLongProps) {
    super(props);

    this.state = {
      latitude: 28.7041,
      longitude: 77.1025,
      titleenabled: false,
      title: "Most Populous Cities in Asia",
      zoom: 1,
      bubblecolor: "blue",
    };
    
    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const latitude = params.get("latitude");
      const longitude = params.get("longitude");
      const titleenabled = params.get("titleenabled");
      const title = params.get("title");
      const zoom = params.get("zoom");
      const bubblecolor = params.get("bubblecolor");

      this.setState({
        latitude: params.get("latitude") as any,
        longitude: params.get("longitude") as any,
        titleenabled: params.get("titleenabled") as unknown === "false",
        title: params.get("title") as any,
        zoom: params.get("zoom") as any,
        bubblecolor: params.get("bubblecolor") as any,
      });
    };
  }
  componentDidMount() {
    window.addEventListener("message", this.receiveEvent, false);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.receiveEvent, false);
  }
  render() {
    return (
      <div style={{ width: "auto", height: "auto" }}>
        <LatLong
          latitude={28.7041}
          longitude={77.1025}
          titleenabled={false}
          title={"Most Populous cities in Asia"}
          zoom={1}
          bubblecolor={"blue"}
          {...this.state}
        />
      </div>
    );
  }
}

