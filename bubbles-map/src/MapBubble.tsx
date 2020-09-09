import React from "react";
import { LatLong } from "./LatLong";
import "leaflet/dist/leaflet.css";
var Component = React.Component;

export interface LatLongProps {
  latitude?: number;
  longitude?: number;
  title?: string;
}

interface State {
  latitude?: number;
  longitude?: number;
  title?: string;
}

export class MapBubble extends Component<LatLongProps, State> {
  receiveEvent: (event: any) => void;

  constructor(props: LatLongProps) {
    super(props);

    this.state = {
      latitude: 28.7041,
      longitude: 77.1025,
      title: "Most Populous Cities in Asia",
    };
    
    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const latitude = params.get("latitude");
      const longitude = params.get("longitude");
      const title = params.get("title");

      this.setState({
        latitude: params.get("latitude") as any,
        longitude: params.get("longitude") as any,
        title: params.get("title") as any,
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
          title={"Most Populous cities in Asia"}
          {...this.state}
        />
      </div>
    );
  }
}

