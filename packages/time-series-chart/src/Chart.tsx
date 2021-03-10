/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { LineChart, ChartProps } from "./LineChart";
import { options, series } from "./SampleData";
import { ComponentController, DataSet, ColumnType } from "@dashbuilder-js/component-api";
import { useState, useEffect, useCallback } from "react";
import { Options, SingleSeries } from "./Data";

// Default Values
const NOT_ENOUGH_COLUMNS_MSG =
  "Time series component expects at least 2 columns: category(LABEL or TEXT or NUMBER or DATE) and one or more series(NUMBER).";
const NOT_ENOUGH_COLUMNS_MSG_1 =
  "Time series component expects 3 columns: category(LABEL or TEXT or NUMBER or DATE), series(TEXT) and values(NUMBER).";
const SECOND_COLUMN_INVALID_MSG_1 = "Wrong type for second column, it should be TEXT.";
const THIRD_COLUMN_INVALID_MSG_1 = "Wrong type for third column, it should be NUMBER.";

enum Params {
  TRANSPOSED = "transposed",
  CHARTNAME = "chartName",
  SHOWAREA = "showArea",
  DATECAT = "dateCat",
  DATALABELS = "dataLabels"
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
  processesseries: SingleSeries[];
  configurationIssue: string;
  message?: string;
}

const validateParams = (params: Map<string, string | number>): string | undefined => {
  if (!params.get(Params.TRANSPOSED)) {
    return "Transposed is required.";
  }
  if (!params.get(Params.CHARTNAME)) {
    return "Chart name is required.";
  }
};

const validateDataSet = (ds: DataSet, transposed: boolean): string | undefined => {
  return transposed ? validateTransposedDataset(ds) : validateNonTransposedDataset(ds);
};

const validateNonTransposedDataset = (ds: DataSet): string | undefined => {
  if (ds.columns.length < 2) {
    return NOT_ENOUGH_COLUMNS_MSG;
  }
  for (let i = 1; i < ds.columns.length; i++) {
    if (ds.columns[i].type !== ColumnType.NUMBER) {
      return "Wrong type for column" + (i + 1) + ", it should be NUMBER";
    }
  }
};

const validateTransposedDataset = (ds: DataSet): string | undefined => {
  if (ds.columns.length < 3) {
    return NOT_ENOUGH_COLUMNS_MSG_1;
  }
  if (ds.columns[1].type !== ColumnType.TEXT && ds.columns[1].type !== ColumnType.LABEL) {
    return SECOND_COLUMN_INVALID_MSG_1;
  }
  if (ds.columns[2].type !== ColumnType.NUMBER) {
    return THIRD_COLUMN_INVALID_MSG_1;
  }
};

interface Props {
  controller: ComponentController;
}

function getSeries(dataset: DataSet, transposed: boolean): SingleSeries[] {
  return transposed ? getSeriesforTransposedDataset(dataset) : getSeriesforNonTransposedDataset(dataset);
}

function getSeriesforNonTransposedDataset(dataset: DataSet): SingleSeries[] {
  const arrayseries: SingleSeries[] = [];
  let newseries: SingleSeries = { name: "", data: [] };
  for (let i = 1; i < dataset.columns.length; i++) {
    newseries = {
      name: dataset.columns[i].settings.columnName,
      data: dataset.data.map((d: Array<string | number>) => d[i])
    };
    arrayseries.push(newseries);
  }
  return arrayseries;
}

function getSeriesforTransposedDataset(dataset: DataSet): SingleSeries[] {
  const arrayseries: SingleSeries[] = [];
  let newseries: SingleSeries = { name: "", data: [] };
  let names: string[] = [];
  let datum: Array<string | number> = [];
  const newnames: string[] = [];
  names = dataset.data.map((d: string[]) => d[1]);
  datum = dataset.data.map((d: Array<string | number>) => d[2]);
  for (const i of names) {
    if (newnames.indexOf(i) === -1) {
      newnames.push(i);
    }
  }
  for (const i of newnames) {
    const newdata: Array<number | string> = [];
    for (let j = 0; j < names.length; j++) {
      if (i === names[j]) {
        newdata.push(datum[j]);
      }
    }
    newseries = { name: i, data: newdata };
    arrayseries.push(newseries);
  }
  return arrayseries;
}

function getOptions(dataset: DataSet, transposed: boolean, chartName: string): Options {
  const newoptions: Options = {
    chart: { id: chartName },
    xaxis: { type: "category", categories: dataset.data.map((d: Array<string | number>) => +d[0]) },
    dataLabels: { enabled: false }
  };
  if (transposed) {
    newoptions.xaxis.categories = Array.from(new Set(newoptions.xaxis.categories));
  }
  return newoptions;
}

export function Chart(props: Props) {
  const [chartProps, setChartProps] = useState<ChartProps>({
    options,
    series
  });
  const [appState, setAppState] = useState<AppState>({
    state: AppStateType.INIT,
    processesoptions: {
      chart: { id: "" },
      xaxis: { type: "category", categories: [] },
      dataLabels: { enabled: false }
    },
    processesseries: [{ name: "", data: [] }],
    configurationIssue: ""
  });
  const onDataset = useCallback((ds: DataSet, params: Map<string, any>) => {
    const transposed = params.get(Params.TRANSPOSED) === "true";
    const validationMessage = validateParams(params) || validateDataSet(ds, transposed);
    if (validationMessage) {
      setAppState(previousAppState => ({
        ...previousAppState,
        state: AppStateType.ERROR,
        message: validationMessage,
        configurationIssue: validationMessage
      }));
    } else {
      const op = getOptions(ds, transposed, params.get(Params.CHARTNAME));
      op.xaxis.type = params.get(Params.DATECAT) === "true" ? "datetime" : "category";
      op.dataLabels.enabled = params.get(Params.DATALABELS) === "true";
      setAppState(previousAppState => ({
        ...previousAppState,
        processesoptions: op,
        processesseries: getSeries(ds, transposed),
        state: AppStateType.FINISHED,
        configurationIssue: ""
      }));
    }
  }, []);
  useEffect(() => {
    props.controller.setOnInit(componentProps => {
      setChartProps({
        type: componentProps.get(Params.SHOWAREA) === "true" ? "area" : "line",
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
