import * as React from "react";
import { LatLong, LatLongProps } from "./LatLong";
import "leaflet/dist/leaflet.css";
import { Data } from "./Data";
import { DefaultData } from "./SampleData";
import { ComponentController, DataSet, ColumnType } from "@dashbuilder-js/component-api";
import { useState, useEffect, useCallback } from "react";

// Default Values
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
const NOT_ENOUGH_COLUMNS_MSG = "Map component expects 4 columns: Country(LABEL or TEXT),Latitude(NUMBER), Longitude(NUMBER, Value (NUMBER).";
const FIRST_COLUMN_INVALID_MSG = "Wrong type for first column, it should be either LABEL or TEXT.";
const SECOND_COLUMN_INVALID_MSG = "Wrong type for second column, it should be NUMBER.";
const THIRD_COLUMN_INVALID_MSG = "Wrong type for third column, it should be NUMBER.";
const FOURTH_COLUMN_INVALID_MSG = "Wrong type for fourth column, it should be NUMBER.";

enum Params {
  TITLE = "title",
  LATITUDE = "latitude",
  LONGITUDE = "longitude",
  TITLE_ENABLED = "titleenabled",
  ZOOM = "zoom",
  BUBBLECOLOR = "bubblecolor",
  MAXRADIUS = "maxRadius",
  MINRADIUS = "minRadius",
  RESIZEBUBBLES = "resizeBubbles"
}

enum AppStateType {
  ERROR = "Error",
  INIT = "Initializing",
  LOADING_COMPONENT = "Loading Component",
  LOADED_COMPONENT = "Loaded Component",
  FINISHED = "Finished loading"
}

interface AppState {
  state: AppStateType;
  processesNodesValues: Data[];
  configurationIssue: string;
  message?: string;
}

const isEmpty = (param?: string ) =>{ return param === undefined || param?.trim() === ""};

const validateParams = (params: Map<string, any>): any => {
   if (isEmpty(params.get(Params.TITLE))) {
    return "Title is required.";
  }
  if (!params.get(Params.LATITUDE)) {
    return "Latitude is required.";
  }
  if (!params.get(Params.LONGITUDE)) {
    return "Longitude is required.";
  }
  if (!params.get(Params.TITLE_ENABLED)) {
    return "Title Enabled is required.";
  }
  if (!params.get(Params.ZOOM)) {
    return "Zoom is required.";
  }
  if (isEmpty(params.get(Params.BUBBLECOLOR))) {
    return "Bubble color is required.";
  }
  if (!params.get(Params.MAXRADIUS)) {
    return "Max Radius is required.";
  }
  if (!params.get(Params.MINRADIUS)) {
    return "Min Radius is required.";
  }
  if (!params.get(Params.RESIZEBUBBLES)) {
    return "Resize Bubbles is required.";
  }
};

const validateDataSet = (ds: DataSet): string | undefined => {
  if (ds.columns.length < 4) {
    return NOT_ENOUGH_COLUMNS_MSG;
  }
  if (ds.columns[0].type !== ColumnType.LABEL && ds.columns[0].type !== ColumnType.TEXT) {
    return FIRST_COLUMN_INVALID_MSG;
  }
  if (ds.columns[1].type !== ColumnType.NUMBER) {
    return SECOND_COLUMN_INVALID_MSG;
  }
  if (ds.columns[2].type !== ColumnType.NUMBER) {
    return THIRD_COLUMN_INVALID_MSG;
  }
  if (ds.columns[3].type !== ColumnType.NUMBER) {
    return FOURTH_COLUMN_INVALID_MSG;
  }
};

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
  const [appState, setAppState] = useState<AppState>({
    state: AppStateType.INIT,
    processesNodesValues: [],
    configurationIssue: ""
  });

  const onDataset = useCallback((ds: DataSet, params: Map<string, any>) => {
    const validationMessage = validateParams(params) || validateDataSet(ds);
    if (validationMessage) {
      setAppState(previousAppState => ({
        ...previousAppState,
        state: AppStateType.ERROR,
        message: validationMessage,
        configurationIssue: validationMessage
      }));
    } else {
      setAppState(previousAppState => ({
        ...previousAppState,
        processesNodesValues: ds.data.map(d => ({ name: d[0], latitude: +d[1], longitude:+d[2], value:+d[3] })),
        state: AppStateType.FINISHED,
        configurationIssue: ""
      }));
    }
  }, []);

  useEffect(() => {
    props.controller.setOnInit(componentProps => {
      setMapProps({
        title: (componentProps.get(TITLE_PROP) as string) || DEFAULT_TITLE,
        latitude: +componentProps.get(LATITUDE_PROP) || DEFAULT_LATITUDE,
        longitude: +componentProps.get(LONGITUDE_PROP) || DEFAULT_LONGITUDE,
        titleenabled: (componentProps.get(TITLE_ENABLED_PROP) as boolean) || DEFAULT_TITLE_ENABLED,
        zoom: +componentProps.get(ZOOM_PROP) || DEFAULT_ZOOM,
        bubblecolor: (componentProps.get(BUBBLECOLOR_PROP) as string) || DEFAULT_COLOR,
        maxRadius: +componentProps.get(MAXRADIUS_PROP) || DEFAULT_MAX_RADIUS,
        minRadius: +componentProps.get(MINRADIUS_PROP) || DEFAULT_MIN_RADIUS,
        resizeBubbles: (componentProps.get(RESIZEBUBBLES_PROP) as boolean) || DEFAULT_RESIZE_BUBBLES,
        data: appState.processesNodesValues
      });
    });
    props.controller.setOnDataSet(onDataset);
  }, [appState]);

  useEffect(() => {
    if (appState.configurationIssue) {
      props.controller.requireConfigurationFix(appState.configurationIssue);
    } else {
      props.controller.configurationOk();
    }
  }, [appState.configurationIssue]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {(() => {
        switch (appState.state) {
          case AppStateType.ERROR:
            return <em style={{ color: "red" }}>{appState.message}</em>;
          case AppStateType.LOADED_COMPONENT:
          case AppStateType.FINISHED:
            return <LatLong {...mapProps} data={appState.processesNodesValues}/>;
          default:
            return <em>Status: {appState.state}</em>;
        }
      })()}
    </div>
  );
}
