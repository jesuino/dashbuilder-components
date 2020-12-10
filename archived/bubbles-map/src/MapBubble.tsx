import React from "react";
import { LatLong } from "./LatLong";
import "leaflet/dist/leaflet.css";
import { Data } from "./Data";
import { DefaulData } from "./SampleData";
var Component = React.Component;

type ColumnType = "TEXT" | "LABEL" | "DATE" | "NUMBER";

interface Column {
  name: string;
  type: ColumnType;
}

interface DataSet {
  columns: Column[];
  data: string[][];
}

// Default Values
const CENTER = [28.7041, 77.1025];
const TITLE_ENABLED = true;
const TITLE = "Most Populous Cities in Asia";
const ZOOM = 1;
const COLOR = "blue";
const MAX_RADIUS = 20;
const MIN_RADIUS = 2;
const RESIZE_BUBBLES = true;

// constants
const INVALID_DATASET_MESSAGE =
  "Provided dataset is not valid. Please check Map Component instructions for more details. Showing sample data.";

function validateDataset(dataSet: DataSet): boolean {
  if (dataSet) {
    const cols = dataSet.columns;

    // Case where lat/long is possibly in a concatenate value divided by comma
    if (cols.length === 3) {
      return (
        (cols[0].type === "TEXT" || cols[0].type === "LABEL") &&
        cols[1].type === "NUMBER" &&
        (cols[2].type === "TEXT" || cols[2].type === "LABEL")
      );
    }
    // Case where lat and long are provided in different columns
    if (cols.length === 4) {
      return (
        (cols[0].type === "TEXT" || cols[0].type === "LABEL") &&
        cols[1].type === "NUMBER" &&
        cols[2].type === "NUMBER" &&
        cols[3].type === "NUMBER"
      );
    }
  }

  return false;
}

export interface LatLongProps {
  latitude?: number;
  longitude?: number;
  titleenabled?: boolean;
  title?: string;
  zoom?: number;
  bubblecolor?: string;
}

interface State {
  latitude: number;
  longitude: number;
  titleenabled: boolean;
  title: string;
  zoom: number;
  bubblecolor: string;
  maxRadius: number;
  minRadius: number;
  data: Data[];
  invalidDataSet: boolean;
  resizeBubbles: boolean;
}

export class MapBubble extends Component<LatLongProps, State> {
  receiveEvent: (event: any) => void;

  constructor(props: LatLongProps) {
    super(props);

    this.state = {
      latitude: CENTER[0],
      longitude: CENTER[1],
      titleenabled: TITLE_ENABLED,
      title: TITLE,
      zoom: ZOOM,
      bubblecolor: COLOR,
      maxRadius: MAX_RADIUS,
      minRadius: MIN_RADIUS,
      data: DefaulData,
      resizeBubbles: RESIZE_BUBBLES,
      invalidDataSet: false,
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const latitude = +(params.get("latitude") as any);
      const longitude = +(params.get("longitude") as any);
      const titleenabled = (params.get("titleenabled") as any) === "false";
      const title = (params.get("title") as any) as string;
      const zoom = +(params.get("zoom") as any);
      const maxRadius = +(params.get("maxRadius") as any);
      const minRadius = +(params.get("minRadius") as any);
      const bubblecolor = (params.get("bubblecolor") as any) as string;
      const resizeBubbles = (params.get("resizeBubbles") as any) === "true";

      const dataSet = params.get("dataSet") as DataSet;

      let data: Data[] = DefaulData;

      let isValid = validateDataset(dataSet);

      // retrieving data
      if (isValid) {
        data = [];
        const isLatLong = dataSet.columns[2].type === "TEXT";

        dataSet.data.forEach((d) => {
          let latitude: number;
          let longitude: number;
          if (isLatLong) {
            const latLong = (d[2] as any) as string;
            const latLongParts = latLong.split(",");
            latitude = +latLongParts[0].trim();
            longitude = +latLongParts[1].trim();
          } else {
            latitude = +d[2];
            longitude = +d[3];
          }

          data.push({
            name: (d[0] as any) as string,
            value: +d[1],
            latitude: latitude,
            longitude: longitude,
          });
        });
      }

      this.setState({
        latitude: latitude || CENTER[0],
        longitude: longitude || CENTER[1],
        titleenabled: titleenabled,
        title: title || TITLE,
        zoom: zoom || ZOOM,
        bubblecolor: bubblecolor ? "#" + bubblecolor : COLOR,
        maxRadius: maxRadius || MAX_RADIUS,
        minRadius: minRadius || MIN_RADIUS,
        data: data,
        invalidDataSet: !isValid,
        resizeBubbles: resizeBubbles,
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
        {this.state.invalidDataSet ? (
          <div>
            <em>
              <strong>{INVALID_DATASET_MESSAGE}</strong>
            </em>
          </div>
        ) : null}
        <LatLong {...this.state} />
      </div>
    );
  }
}
