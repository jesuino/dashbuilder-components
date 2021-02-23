import * as React from "react";
import { LineChart, ChartProps } from "./LineChart";
import { options, series } from "./SampleData";
import { ComponentController, DataSet, ColumnType } from "@dashbuilder-js/component-api";
import { useState, useEffect, useCallback } from "react";
import { Options, SingleSeries } from "./Data";

// Default Values
const NOT_ENOUGH_COLUMNS_MSG =
  "Time series component expects at least 2 columns: category(LABEL or TEXT or NUMBER or DATE) and one or more series(NUMBER).";
const FIRST_COLUMN_INVALID_MSG = "Wrong type for first column, it should be either LABEL, TEXT, NUMBER or DATE.";
const SECOND_COLUMN_INVALID_MSG = "Wrong type for second column, it should be NUMBER.";
const NOT_ENOUGH_COLUMNS_MSG_1 =
  "Time series component expects 3 columns: category(LABEL or TEXT or NUMBER or DATE), series(TEXT) and values(NUMBER).";
const FIRST_COLUMN_INVALID_MSG_1 = "Wrong type for first column, it should be either LABEL, TEXT, NUMBER or DATE.";
const SECOND_COLUMN_INVALID_MSG_1 = "Wrong type for second column, it should be TEXT.";
const THIRD_COLUMN_INVALID_MSG_1 = "Wrong type for third column, it should be NUMBER.";

enum Params {
  FLAG = "flag",
  CHARTNAME = "chartName"
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
  processesoptions: Options;
  processesseries: Array<SingleSeries>;
  configurationIssue: string;
  message?: string;
}

const validateParams = (params: Map<string, string | number>): string | undefined => {
  if (!params.get(Params.FLAG)) {
    return "Flag is required.";
  }
  if (!params.get(Params.CHARTNAME)) {
    return "Chart name is required.";
  }
};

const validateDataSet = (ds: DataSet, flag: number): string | undefined => {
  if (flag === 0) {
    if (ds.columns.length < 2) {
      return NOT_ENOUGH_COLUMNS_MSG;
    }
    if (
      ds.columns[0].type !== ColumnType.LABEL &&
      ds.columns[0].type !== ColumnType.TEXT &&
      ds.columns[0].type !== ColumnType.NUMBER &&
      ds.columns[0].type !== ColumnType.DATE
    ) {
      return FIRST_COLUMN_INVALID_MSG;
    }
    if (ds.columns[1].type !== ColumnType.NUMBER) {
      return SECOND_COLUMN_INVALID_MSG;
    }
  }
  if (flag === 1) {
    if (ds.columns.length < 3) {
      return NOT_ENOUGH_COLUMNS_MSG_1;
    }
    if (
      ds.columns[0].type !== ColumnType.LABEL &&
      ds.columns[0].type !== ColumnType.TEXT &&
      ds.columns[0].type !== ColumnType.NUMBER &&
      ds.columns[0].type !== ColumnType.DATE
    ) {
      return FIRST_COLUMN_INVALID_MSG_1;
    }
    if (ds.columns[1].type !== ColumnType.TEXT && ds.columns[1].type !== ColumnType.LABEL) {
      return SECOND_COLUMN_INVALID_MSG_1;
    }
    if (ds.columns[2].type !== ColumnType.NUMBER) {
      return THIRD_COLUMN_INVALID_MSG_1;
    }
  }
};

interface Props {
  controller: ComponentController;
}

function getseries(dataset: DataSet, flag: number): Array<SingleSeries> {
  var arrayseries: Array<SingleSeries> = [];
  var newseries: SingleSeries = { name: "", data: [] };
  if (flag === 0) {
    for (var i = 1; i < dataset.columns.length; i++) {
      newseries = { name: dataset.columns[i].name, data: dataset.data.map((d: Array<string | number>) => d[i]) };
      arrayseries.push(newseries);
    }
  }
  if (flag === 1) {
    var names: Array<string> = [];
    var datum: Array<string | number> = [];
    var newnames: Array<string> = [];
    names = dataset.data.map((d: Array<string>) => d[1]);
    datum = dataset.data.map((d: Array<string | number>) => d[2]);
    for (var i = 0; i < names.length; i++) {
      if (newnames.indexOf(names[i]) == -1) {
        newnames.push(names[i]);
      }
    }
    for (var i = 0; i < newnames.length; i++) {
      var newdata: Array<number | string> = [];
      for (var j = 0; j < names.length; j++) {
        if (newnames[i] == names[j]) {
          newdata.push(datum[j]);
        }
      }
      newseries = { name: newnames[i], data: newdata };
      arrayseries.push(newseries);
    }
  }
  return arrayseries;
}

function getoptions(dataset: DataSet, flag: number, chartName: string): Options {
  function removeduplicates(arr: Array<string | number>): Array<string | number> {
    let outputArray: Array<string | number> = Array.from(new Set(arr));
    return outputArray;
  }
  var newoptions: Options = { chart: { id: "" }, xaxis: { categories: [] } };
  newoptions = {
    chart: { id: chartName },
    xaxis: { categories: dataset.data.map((d: Array<string | number>) => d[0]) }
  };
  if (flag === 1) {
    newoptions.xaxis.categories = removeduplicates(newoptions.xaxis.categories);
  }
  return newoptions;
}

export function Chart(props: Props) {
  const [chartProps, setChartProps] = useState<ChartProps>({
    options: options,
    series: series
  });
  const [appState, setAppState] = useState<AppState>({
    state: AppStateType.INIT,
    processesoptions: { chart: { id: "" }, xaxis: { categories: [] } },
    processesseries: [{ name: "", data: [] }],
    configurationIssue: ""
  });
  const onDataset = useCallback((ds: DataSet, params: Map<string, any>) => {
    const validationMessage = validateParams(params) || validateDataSet(ds, params.get(Params.FLAG));
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
        processesoptions: getoptions(ds, params.get(Params.FLAG), params.get(Params.CHARTNAME)),
        processesseries: getseries(ds, params.get(Params.FLAG)),
        state: AppStateType.FINISHED,
        configurationIssue: ""
      }));
    }
  }, []);
  useEffect(() => {
    props.controller.setOnInit(componentProps => {
      setChartProps({
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
