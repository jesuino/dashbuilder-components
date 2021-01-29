import * as React from "react";
import { Treemaps, TreemapProps } from "./Treemaps";
import { SampleData } from "./SampleData";
import { Data, Children } from "./DataSet";
import { ComponentController, DataSet, ColumnType } from "@dashbuilder-js/component-api";
import { useState, useEffect, useCallback } from "react";
import { AnimationEasingType } from "recharts";

// Default Values
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 200;
const DEFAULT_DATAKEY = "size";
const DEFAULT_RATIO = 4 / 3;
const DEFAULT_STROKE = "#fff";
const DEFAULT_FILL = "#8884d8";
const DEFAULT_ANIMATIONBEGIN = 0;
const DEFAULT_ANIMATIONDURATION = 100;
const DEFAULT_ANIMATIONEASING: AnimationEasingType = "linear";
const NOT_ENOUGH_COLUMNS_MSG =
  "Treemap component expects 3 columns: ID(LABEL or TEXT), Parent(LABEL or TEXT), and Value (NUMBER).";
const FIRST_COLUMN_INVALID_MSG = "Wrong type for first column, it should be either LABEL or TEXT.";
const SECOND_COLUMN_INVALID_MSG = "Wrong type for second column, it should be either LABEL or TEXT.";
const THIRD_COLUMN_INVALID_MSG = "Wrong type for third column, it should be NUMBER.";

enum Params {
  WIDTH = "width",
  HEIGHT = "height",
  DATAKEY = "datakey",
  RATIO = "aspectRatio",
  STROKE = "stroke",
  FILL = "fill",
  ANIMATIONBEGIN = "animationbegin",
  ANIMATIONDURATION = "animationduration",
  ANIMATIONEASING = "animationeasing"
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

const isEmpty = (param?: string) => {
  return param === undefined || param?.trim() === "";
};

const validateParams = (params: Map<string, any>): any => {
  if (!params.get(Params.WIDTH)) {
    return "Width is required.";
  }
  if (!params.get(Params.HEIGHT)) {
    return "Height is required.";
  }
  if (isEmpty(params.get(Params.DATAKEY))) {
    return "Datakey is required.";
  }
  if (!params.get(Params.RATIO)) {
    return "Ratio is required.";
  }
  if (isEmpty(params.get(Params.STROKE))) {
    return "Stroke is required.";
  }
  if (isEmpty(params.get(Params.FILL))) {
    return "Fill is required.";
  }
  if (!params.get(Params.ANIMATIONBEGIN)) {
    return "Animation Begin is required.";
  }
  if (!params.get(Params.ANIMATIONDURATION)) {
    return "Animation Duration is required.";
  }
  if (isEmpty(params.get(Params.ANIMATIONEASING))) {
    return "Animation Easing is required.";
  }
};

const validateDataSet = (ds: DataSet): string | undefined => {
  if (ds.columns.length < 3) {
    return NOT_ENOUGH_COLUMNS_MSG;
  }
  if (ds.columns[0].type !== ColumnType.LABEL && ds.columns[0].type !== ColumnType.TEXT) {
    return FIRST_COLUMN_INVALID_MSG;
  }
  if (ds.columns[1].type !== ColumnType.LABEL && ds.columns[1].type !== ColumnType.TEXT) {
    return SECOND_COLUMN_INVALID_MSG;
  }
  if (ds.columns[2].type !== ColumnType.NUMBER) {
    return THIRD_COLUMN_INVALID_MSG;
  }
};

interface Props {
  controller: ComponentController;
}

function getData(dataset: any): any {
  var data: Data[] = [];
  const newdata: Data[] = [];
  dataset?.data.forEach((d: (string | number)[]) => {
    if (d[1] !== "null") {
      data.push({
        name: (d[1] as any) as string,
        children: [{ name: (d[0] as any) as string, size: +d[2] }]
      });
    }
  });

  let group: { [key: string]: Array<Children> } = data.reduce((r: any, a) => {
    r[a.name] = [...(r[a.name] || []), a.children[0]];
    return r;
  }, {});

  for (var key in group) {
    if (group.hasOwnProperty(key)) {
      newdata.push({
        name: key,
        children: group[key]
      });
    }
  }
  data = newdata;
  return data;
}

export function Chart(props: Props) {
  const [chartProps, setChartProps] = useState<TreemapProps>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    data: SampleData,
    dataKey: DEFAULT_DATAKEY,
    aspectRatio: DEFAULT_RATIO,
    stroke: DEFAULT_STROKE,
    fill: DEFAULT_FILL,
    animationBegin: DEFAULT_ANIMATIONBEGIN,
    animationDuration: DEFAULT_ANIMATIONDURATION,
    animationEasing: DEFAULT_ANIMATIONEASING
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
        processesNodesValues: getData(ds),
        state: AppStateType.FINISHED,
        configurationIssue: ""
      }));
    }
  }, []);
  useEffect(() => {
    props.controller.setOnInit(componentProps => {
      setChartProps({
        width: +componentProps.get(Params.WIDTH) || DEFAULT_WIDTH,
        height: +componentProps.get(Params.HEIGHT) || DEFAULT_HEIGHT,
        dataKey: (componentProps.get(Params.DATAKEY) as string) || DEFAULT_DATAKEY,
        aspectRatio: +componentProps.get(Params.RATIO) || DEFAULT_RATIO,
        stroke: (componentProps.get(Params.STROKE) as string) || DEFAULT_STROKE,
        fill: (componentProps.get(Params.FILL) as string) || DEFAULT_FILL,
        animationBegin: +componentProps.get(Params.ANIMATIONBEGIN) || DEFAULT_ANIMATIONBEGIN,
        animationDuration: +componentProps.get(Params.ANIMATIONDURATION) || DEFAULT_ANIMATIONDURATION,
        animationEasing: (componentProps.get(Params.ANIMATIONEASING) as AnimationEasingType) || DEFAULT_ANIMATIONEASING,
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
            return <Treemaps {...chartProps} data={appState.processesNodesValues} />;
          default:
            return <em>Status: {appState.state}</em>;
        }
      })()}
    </div>
  );
}
