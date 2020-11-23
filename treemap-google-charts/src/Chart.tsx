import React from "react";
import { Treemap, TreemapProps } from "./Treemap";
import { data } from "./SampleData";
var Component = React.Component;
type ColumnType = "TEXT" | "LABEL" | "NUMBER";

interface Column {
  name: string;
  type: ColumnType;
}

interface DataSet {
  columns: Column[];
  data: Array<Array<string | number>>;
}

// Default Values
const TITLE = "Sample Data";
const TITLETEXTCOLOR = "black";
const TITLEFONTNAME = "Times New Roman";
const TITLEFONTSIZE = 10;
const TITLEBOLD = true;
const TITLEITALIC = true;
const TEXTCOLOR = "black";
const FONTNAME = "Times New Roman";
const FONTSIZE = 10;
const BOLD = true;
const ITALIC = true;
const MAXDEPTH = 1;
const MAXPOSTDEPTH = 2;
const MINHIGHLIGHTCOLOR = "#8c6bb1";
const MIDHIGHLIGHTCOLOR = "#9ebcda";
const MAXHIGHLIGHTCOLOR = "#edf8fb";
const MINCOLOR = "#009688";
const MIDCOLOR = "#f7f7f7";
const MAXCOLOR = "#ee8100";
const HEADERHEIGHT = 15;
const SHOWSCALE = true;
const USEWEIGHTEDAVERAGEFORAGGREGATION = true;
const SHOWTOOLTIPS = true;

// constants
const INVALID_DATASET_MESSAGE =
  "Provided dataset is not valid. Please check Treemap Google Charts Component instructions for more details. Showing sample data.";

function validateDataset(dataSet: DataSet): boolean {
  if (dataSet) {
    const cols = dataSet.columns;
    if (cols.length === 3) {
      return (
        (cols[0].type === "TEXT" || cols[0].type === "LABEL") &&
        (cols[1].type === "TEXT" || cols[1].type ==="LABEL") &&
        (cols[2].type === "NUMBER")
      );
    }
  }

  return false;
}

interface State {
  data?: any;
  title?: string;
  titletextcolor?: string;
  titlefontname?: string;
  titlefontsize?: number;
  titlebold?: boolean;
  titleitalic?: boolean;
  maxDepth?: number;
  maxPostDepth?: number;
  minHighlightColor?: string;
  midHighlightColor?: string;
  maxHighlightColor?: string;
  minColor?: string;
  midColor?: string;
  maxColor?: string;
  textcolor?: string;
  fontname?: string;
  fontsize?: number;
  bold?: boolean;
  italic?: boolean;
  headerHeight?: number;
  showScale?: boolean;
  useWeightedAverageForAggregation?: boolean;
  showTooltips?: boolean;
  invalidDataSet?: boolean;
}

export class Chart extends Component<any, State> {
  receiveEvent: (event: any) => void;

  constructor(props: TreemapProps) {
    super(props);

    this.state = {
      data: data,
      title: TITLE,
      titletextcolor: TITLETEXTCOLOR,
      titlefontname: TITLEFONTNAME,
      titlefontsize: TITLEFONTSIZE,
      titlebold: TITLEBOLD,
      titleitalic: TITLEITALIC,
      maxDepth: MAXDEPTH,
      maxPostDepth: MAXPOSTDEPTH,
      minHighlightColor: MINHIGHLIGHTCOLOR,
      midHighlightColor: MIDHIGHLIGHTCOLOR,
      maxHighlightColor: MAXHIGHLIGHTCOLOR,
      minColor: MINCOLOR,
      midColor: MIDCOLOR,
      maxColor: MAXCOLOR,
      textcolor: TEXTCOLOR,
      fontname: FONTNAME,
      fontsize: FONTSIZE,
      bold: BOLD,
      italic: ITALIC,
      headerHeight: HEADERHEIGHT,
      showScale: SHOWSCALE,
      useWeightedAverageForAggregation: USEWEIGHTEDAVERAGEFORAGGREGATION,
      showTooltips: SHOWTOOLTIPS,
      invalidDataSet: false,
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const dataSet = params.get("dataSet") as DataSet;
      let isValid = validateDataset(dataSet);
      var headerrow= dataSet.columns.map(column => column.name);
      if(isValid){
      for (var i = 0; i < dataSet.data.length; i++) {  
        for (var j=0; j< dataSet.data.length; j++){
            dataSet.data[i][2] = Number(dataSet.data[i][2]);
            if(dataSet.data[i][j]==="null"){
                dataSet.data[i][j] = JSON.parse(String(dataSet.data[i][j]));
         }
        }
      }
      dataSet.data.unshift(headerrow);
    }
      const title = (params.get("title") as any) as string;
      const titletextcolor = (params.get("titletextcolor") as any) as string;
      const titlefontname = (params.get("titlefontname") as any) as string;
      const titlefontsize = +(params.get("titlefontsize") as any);
      const titlebold = (params.get("titlebold") as any) as boolean;
      const titleitalic = (params.get("titleitalic") as any) as boolean;
      const maxDepth = +(params.get("maxdepth") as any);
      const maxPostDepth = +(params.get("maxpostdepth") as any);
      const minHighlightColor = (params.get(
        "minhighlightcolor"
      ) as any) as string;
      const midHighlightColor = (params.get(
        "midhighlightcolor"
      ) as any) as string;
      const maxHighlightColor = (params.get(
        "maxhighlightcolor"
      ) as any) as string;
      const minColor = (params.get("mincolor") as any) as string;
      const midColor = (params.get("midcolor") as any) as string;
      const maxColor = (params.get("maxcolor") as any) as string;
      const textcolor = (params.get("textcolor") as any) as string;
      const fontname = (params.get("fontname") as any) as string;
      const fontsize = +(params.get("fontsize") as any);
      const bold = (params.get("bold") as any) as boolean;
      const italic = (params.get("italic") as any) as boolean;
      const headerHeight = +(params.get("headerheight") as any);
      const showscale = (params.get("showscale") as any) as boolean;
      const useWeightedAverageForAggregation = (params.get(
        "useweightedaverageforaggregation"
      ) as any) as boolean;
      const showTooltips = (params.get("showtooltips") as any) as boolean;

      this.setState({
        data: dataSet.data || data,
        title: title || TITLE,
        titletextcolor: titletextcolor ? "#" + titletextcolor : TITLETEXTCOLOR,
        titlefontname: titlefontname || TITLEFONTNAME,
        titlefontsize: titlefontsize || TITLEFONTSIZE,
        titlebold: titlebold || TITLEBOLD,
        titleitalic: titleitalic || TITLEITALIC,
        maxDepth: maxDepth || MAXDEPTH,
        maxPostDepth: maxPostDepth || MAXPOSTDEPTH,
        minHighlightColor: minHighlightColor
          ? "#" + minHighlightColor
          : MINHIGHLIGHTCOLOR,
        midHighlightColor: midHighlightColor
          ? "#" + midHighlightColor
          : MIDHIGHLIGHTCOLOR,
        maxHighlightColor: maxHighlightColor
          ? "#" + maxHighlightColor
          : MAXHIGHLIGHTCOLOR,
        minColor: minColor ? "#" + minColor : MINCOLOR,
        midColor: midColor ? "#" + midColor : MIDCOLOR,
        maxColor: maxColor ? "#" + maxColor : MAXCOLOR,
        textcolor: textcolor ? "#" + textcolor : TEXTCOLOR,
        fontname: fontname || FONTNAME,
        fontsize: fontsize || FONTSIZE,
        bold: bold || BOLD,
        italic: italic || ITALIC,
        headerHeight: headerHeight || HEADERHEIGHT,
        showScale: showscale || SHOWSCALE,
        useWeightedAverageForAggregation:
          useWeightedAverageForAggregation || USEWEIGHTEDAVERAGEFORAGGREGATION,
        showTooltips: showTooltips || SHOWTOOLTIPS,
        invalidDataSet: !isValid,
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
        <Treemap {...this.state} />
      </div>
    );
  }
}

export default Chart;
