import * as React from "react";
import { LineChart, ChartProps } from "./LineChart";
import { options, series } from "./SampleData";
import { ComponentController, DataSet, ColumnType } from "@dashbuilder-js/component-api";
import { useState, useEffect, useCallback } from "react";
import { typeoptions, typeseries } from "./Data";

// Default Values
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 200;
const NOT_ENOUGH_COLUMNS_MSG =
  "Time series component expects 2 columns: category(LABEL or TEXT or NUMBER) and series(NUMBER).";
const FIRST_COLUMN_INVALID_MSG = "Wrong type for first column, it should be either LABEL or TEXT or NUMBER.";
const SECOND_COLUMN_INVALID_MSG = "Wrong type for second column, it should be NUMBER.";

enum Params {
  WIDTH = "width",
  HEIGHT = "height"
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
  processesoptions: typeoptions;
  processesseries: typeseries;
  configurationIssue: string;
  message?: string;
}

const validateParams = (params: Map<string, any>): any => {
  if (!params.get(Params.WIDTH)) {
    return "Width is required.";
  }
  if (!params.get(Params.HEIGHT)) {
    return "Height is required.";
  }
};

const validateDataSet = (ds: DataSet): string | undefined => {
  if (ds.columns.length < 2) {
    return NOT_ENOUGH_COLUMNS_MSG;
  }
  if (
    ds.columns[0].type !== ColumnType.LABEL &&
    ds.columns[0].type !== ColumnType.TEXT &&
    ds.columns[0].type !== ColumnType.NUMBER
  ) {
    return FIRST_COLUMN_INVALID_MSG;
  }
  if (ds.columns[1].type !== ColumnType.NUMBER) {
    return SECOND_COLUMN_INVALID_MSG;
  }
};

interface Props {
  controller: ComponentController;
}

function getseries(dataset: any): any {
  var newseries: typeseries = { name: dataset.columns[1].name, data: dataset.data.map((d: any) => d[1]) };
  return newseries;
}

function getoptions(dataset: any): any {
  var newoptions: typeoptions = {
    chart: { id: dataset.columns[0].name },
    xaxis: { categories: dataset.data.map((d: any) => d[1]) }
  };
  return newoptions;
}

export function Chart(props: Props) {
  const [chartProps, setChartProps] = useState<ChartProps>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    options: options,
    series: series
  });
  const [appState, setAppState] = useState<AppState>({
    state: AppStateType.INIT,
    processesoptions: { chart: { id: "" }, xaxis: { categories: [] } },
    processesseries: { name: "", data: [] },
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
        processesoptions: getoptions(ds),
        processesseries: getseries(ds),
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
        options: appState.processesoptions,
        series: appState.processesseries
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
            return <LineChart {...chartProps} options={appState.processesoptions} series={appState.processesseries} />;
          default:
            return <em>Status: {appState.state}</em>;
        }
      })()}
    </div>
  );
}
