import * as React from "react";
import { Treemap, TreemapProps } from "./Treemap";
import { SampleData } from "./SampleData";
import { ComponentController, DataSet, ColumnType } from "@dashbuilder-js/component-api";
import { useState, useEffect, useCallback } from "react";

// Default Values
const DEFAULT_TITLE = "Sample Data";
const DEFAULT_TITLETEXTCOLOR = "black";
const DEFAULT_TITLEFONTNAME = "Times New Roman";
const DEFAULT_TITLEFONTSIZE = 10;
const DEFAULT_TITLEBOLD = true;
const DEFAULT_TITLEITALIC = true;
const DEFAULT_TEXTCOLOR = "black";
const DEFAULT_FONTNAME = "Times New Roman";
const DEFAULT_FONTSIZE = 10;
const DEFAULT_BOLD = true;
const DEFAULT_ITALIC = true;
const DEFAULT_MAXDEPTH = 1;
const DEFAULT_MAXPOSTDEPTH = 2;
const DEFAULT_MINHIGHLIGHTCOLOR = "#8c6bb1";
const DEFAULT_MIDHIGHLIGHTCOLOR = "#9ebcda";
const DEFAULT_MAXHIGHLIGHTCOLOR = "#edf8fb";
const DEFAULT_MINCOLOR = "#009688";
const DEFAULT_MIDCOLOR = "#f7f7f7";
const DEFAULT_MAXCOLOR = "#ee8100";
const DEFAULT_HEADERHEIGHT = 15;
const DEFAULT_SHOWSCALE = true;
const DEFAULT_USEWEIGHTEDAVERAGEFORAGGREGATION = true;
const DEFAULT_SHOWTOOLTIPS = true;
const NOT_ENOUGH_COLUMNS_MSG =
  "Treemap component expects 3 columns: ID(LABEL or TEXT), Parent(LABEL or TEXT), and Value (NUMBER).";
const FIRST_COLUMN_INVALID_MSG = "Wrong type for first column, it should be either LABEL or TEXT.";
const SECOND_COLUMN_INVALID_MSG = "Wrong type for second column, it should be either LABEL or TEXT.";
const THIRD_COLUMN_INVALID_MSG = "Wrong type for third column, it should be NUMBER.";

enum Params {
  TITLE = "title",
  TITLETEXTCOLOR = "titletextcolor",
  TITLEFONTNAME = "titlefontname",
  TITLEFONTSIZE = "titlefontsize",
  TITLEBOLD = "titlebold",
  TITLEITALIC = "titleitalic",
  TEXTCOLOR = "textcolor",
  FONTNAME = "fontname",
  FONTSIZE = "fontsize",
  BOLD = "bold",
  ITALIC = "italic",
  MAXDEPTH = "maxDepth",
  MAXPOSTDEPTH = "maxPostDepth",
  MINHIGHLIGHTCOLOR = "minHighlightColor",
  MIDHIGHLIGHTCOLOR = "midHighlightColor",
  MAXHIGHLIGHTCOLOR = "maxHighlightColor",
  MINCOLOR = " minColor",
  MIDCOLOR = "midColor",
  MAXCOLOR = "maxColor",
  HEADERHEIGHT = "headerHeight",
  SHOWSCALE = "showScale",
  USEWEIGHTEDAVERAGEFORAGGREGATION = "useWeightedAverageForAggregation",
  SHOWTOOLTIPS = "showTooltips"
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
  processesNodesValues: Array<Array<string | number>>;
  configurationIssue: string;
  message?: string;
}

const isEmpty = (param?: string) => {
  return param === undefined || param?.trim() === "";
};

const validateParams = (params: Map<string, any>): any => {
  if (isEmpty(params.get(Params.TITLE))) {
    return "Title is required.";
  }
  if (isEmpty(params.get(Params.TITLEFONTNAME))) {
    return "Title font name is required.";
  }
  if (!params.get(Params.TITLEFONTSIZE)) {
    return "Title font size is required.";
  }
  if (isEmpty(params.get(Params.TITLETEXTCOLOR))) {
    return "Title text color is required.";
  }
  if (!params.get(Params.TITLEBOLD)) {
    return "Title bold is required.";
  }
  if (!params.get(Params.TITLEITALIC)) {
    return "Title italic is required.";
  }
  if (isEmpty(params.get(Params.TEXTCOLOR))) {
    return "Text color is required.";
  }
  if (isEmpty(params.get(Params.FONTNAME))) {
    return "Font name is required.";
  }
  if (!params.get(Params.FONTSIZE)) {
    return "Font size is required.";
  }
  if (!params.get(Params.BOLD)) {
    return "Bold is required.";
  }
  if (!params.get(Params.ITALIC)) {
    return "Italic is required.";
  }
  if (!params.get(Params.MAXDEPTH)) {
    return "Max depth is required.";
  }
  if (!params.get(Params.MAXPOSTDEPTH)) {
    return "Max Post depth is required.";
  }
  if (isEmpty(params.get(Params.MINHIGHLIGHTCOLOR))) {
    return "Min highlightcolor is required.";
  }
  if (isEmpty(params.get(Params.MIDHIGHLIGHTCOLOR))) {
    return "Mid highlightcolor is required.";
  }
  if (isEmpty(params.get(Params.MAXHIGHLIGHTCOLOR))) {
    return "Max highlightcolor is required.";
  }
  if (isEmpty(params.get(Params.MIDCOLOR))) {
    return "Mid color is required.";
  }
  if (isEmpty(params.get(Params.MAXCOLOR))) {
    return "Max color is required.";
  }
  if (!params.get(Params.HEADERHEIGHT)) {
    return "Header height is required.";
  }
  if (!params.get(Params.SHOWSCALE)) {
    return "Showscale is required.";
  }
  if (!params.get(Params.USEWEIGHTEDAVERAGEFORAGGREGATION)) {
    return "Use weighted average aggregation is required.";
  }
  if (!params.get(Params.SHOWTOOLTIPS)) {
    return "Showtooltips is required.";
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
  var headerrow = dataset.columns.map((column: any) => column.name);
  for (var i = 0; i < dataset.data.length; i++) {
    for (var j = 0; j < dataset.data.length; j++) {
      dataset.data[i][2] = Number(dataset.data[i][2]);
      if (dataset.data[i][j] === "null") {
        dataset.data[i][j] = JSON.parse(String(dataset.data[i][j]));
      }
    }
  }
  dataset.data.unshift(headerrow);
  return dataset.data;
}

export function Chart(props: Props) {
  const [chartProps, setChartProps] = useState<TreemapProps>({
    title: DEFAULT_TITLE,
    titletextcolor: DEFAULT_TITLETEXTCOLOR,
    titlefontname: DEFAULT_TITLEFONTNAME,
    titlefontsize: DEFAULT_TITLEFONTSIZE,
    titlebold: DEFAULT_TITLEBOLD,
    titleitalic: DEFAULT_TITLEITALIC,
    maxDepth: DEFAULT_MAXDEPTH,
    maxPostDepth: DEFAULT_MAXPOSTDEPTH,
    minHighlightColor: DEFAULT_MINHIGHLIGHTCOLOR,
    midHighlightColor: DEFAULT_MIDHIGHLIGHTCOLOR,
    maxHighlightColor: DEFAULT_MAXHIGHLIGHTCOLOR,
    minColor: DEFAULT_MINCOLOR,
    midColor: DEFAULT_MIDCOLOR,
    maxColor: DEFAULT_MAXCOLOR,
    textcolor: DEFAULT_TEXTCOLOR,
    fontname: DEFAULT_FONTNAME,
    fontsize: DEFAULT_FONTSIZE,
    bold: DEFAULT_BOLD,
    italic: DEFAULT_ITALIC,
    headerHeight: DEFAULT_HEADERHEIGHT,
    showScale: DEFAULT_SHOWSCALE,
    useWeightedAverageForAggregation: DEFAULT_USEWEIGHTEDAVERAGEFORAGGREGATION,
    showTooltips: DEFAULT_SHOWTOOLTIPS,
    data: SampleData
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
        title: (componentProps.get("title") as any) as string,
        titletextcolor: (componentProps.get("titletextcolor") as any) as string,
        titlefontname: (componentProps.get("titlefontname") as any) as string,
        titlefontsize: +(componentProps.get("titlefontsize") as any),
        titlebold: (componentProps.get("titlebold") as any) as boolean,
        titleitalic: (componentProps.get("titleitalic") as any) as boolean,
        maxDepth: +(componentProps.get("maxdepth") as any),
        maxPostDepth: +(componentProps.get("maxpostdepth") as any),
        minHighlightColor: (componentProps.get("minhighlightcolor") as any) as string,
        midHighlightColor: (componentProps.get("midhighlightcolor") as any) as string,
        maxHighlightColor: (componentProps.get("maxhighlightcolor") as any) as string,
        minColor: (componentProps.get("mincolor") as any) as string,
        midColor: (componentProps.get("midcolor") as any) as string,
        maxColor: (componentProps.get("maxcolor") as any) as string,
        textcolor: (componentProps.get("textcolor") as any) as string,
        fontname: (componentProps.get("fontname") as any) as string,
        fontsize: +(componentProps.get("fontsize") as any),
        bold: (componentProps.get("bold") as any) as boolean,
        italic: (componentProps.get("italic") as any) as boolean,
        headerHeight: +(componentProps.get("headerheight") as any),
        showScale: (componentProps.get("showscale") as any) as boolean,
        useWeightedAverageForAggregation: (componentProps.get("useweightedaverageforaggregation") as any) as boolean,
        showTooltips: (componentProps.get("showtooltips") as any) as boolean,
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
            return <Treemap {...chartProps} data={appState.processesNodesValues} />;
          default:
            return <em>Status: {appState.state}</em>;
        }
      })()}
    </div>
  );
}

export default Chart;
