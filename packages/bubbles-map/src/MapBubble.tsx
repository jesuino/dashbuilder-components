import * as React from "react";
import { LatLong, LatLongProps } from "./LatLong";
import "leaflet/dist/leaflet.css";
import { Data } from "./Data";
import { DefaultData } from "./SampleData";
import { ComponentController, DataSet } from "@dashbuilder-js/component-api";
import { useState, useEffect } from "react";

type ColumnType = "TEXT" | "LABEL" | "DATE" | "NUMBER";

interface Column {
  name: string;
  type: ColumnType;
}

// interface DataSet {
//   columns: Column[];
//   data: string[][];
// }

// Default Values
const DEFAULT_CENTER = [28.7041, 77.1025];
const DEFAULT_TITLE_ENABLED = true;
const DEFAULT_TITLE = "Most Populous Cities in Asia";
const DEFAULT_ZOOM = 1;
const DEFAULT_COLOR = "blue";
const DEFAULT_MAX_RADIUS = 20;
const DEFAULT_MIN_RADIUS = 2;
const DEFAULT_RESIZE_BUBBLES = true;
const DEFAULT_LATITUDE = 28.7041;
const DEFAULT_LONGITUDE = 77.1025;
const TITLE_PROP = "title";
const LATITUDE_PROP = "latitude";
const LONGITUDE_PROP = "longitude";
const TITLE_ENABLED_PROP = "titleenabled";
const ZOOM_PROP = "zoom";
const BUBBLECOLOR_PROP = "bubblecolor";
const MAXRADIUS_PROP = "maxRadius";
const MINRADIUS_PROP = "minRadius";
const RESIZEBUBBLES_PROP = "resizeBubbles";

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

interface Props {
  controller: ComponentController;
}

export function MapBubble(props: Props) {
  const [mapProps, setMapProps] = useState<LatLongProps>({
    title: DEFAULT_TITLE,
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    titleenabled: DEFAULT_TITLE_ENABLED,
    zoom: DEFAULT_ZOOM,
    bubblecolor: DEFAULT_COLOR,
    maxRadius: DEFAULT_MAX_RADIUS,
    minRadius: DEFAULT_MIN_RADIUS,
    resizeBubbles: DEFAULT_RESIZE_BUBBLES,
    data: DefaultData
  });
  const [dataset, setDataset] = useState<DataSet>();
  let data: Data[] = DefaultData;
  useEffect(() => {
    props.controller.setOnInit(componentProps => {
      setMapProps({
        title: (componentProps.get(TITLE_PROP) as string) || DEFAULT_TITLE,
        latitude: +(componentProps.get(LATITUDE_PROP)) || DEFAULT_LATITUDE,
        longitude: +(componentProps.get(LONGITUDE_PROP)) || DEFAULT_LONGITUDE,
        titleenabled: componentProps.get(TITLE_ENABLED_PROP) as boolean || DEFAULT_TITLE_ENABLED,
        zoom: +(componentProps.get(ZOOM_PROP)) || DEFAULT_ZOOM ,
        bubblecolor:componentProps.get(BUBBLECOLOR_PROP) as string || DEFAULT_COLOR,
        maxRadius: +(componentProps.get(MAXRADIUS_PROP)) || DEFAULT_MAX_RADIUS,
        minRadius: +(componentProps.get(MINRADIUS_PROP)) || DEFAULT_MIN_RADIUS,
        resizeBubbles: componentProps.get(RESIZEBUBBLES_PROP) as boolean || DEFAULT_RESIZE_BUBBLES,
        data: data
      });
    });
    props.controller.setOnDataSet((_dataset: DataSet) => {
      setDataset(_dataset);
    });
  }, [props.controller]);

  let isValid = dataset ? validateDataset(dataset) : false;

  // retrieving data
  if (isValid) {
    data = [];
    const isLatLong = dataset && dataset.columns[2].type === "TEXT";

    dataset?.data.forEach(d => {
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
        longitude: longitude
      });
    });
  }

  return (
    <div style={{ width: "auto", height: "auto" }}>
      {dataset && validateDataset(dataset) ? (
        <div>
          <em>
            <strong>{INVALID_DATASET_MESSAGE}</strong>
          </em>
        </div>
      ) : null}
      <LatLong {...mapProps}/>
    </div>
  );
}
