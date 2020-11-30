import React from "react";
import { BarChartRace, BarChartRaceProps } from "./BarChartRace";
import DefaultData from "./SampleData";

var Component = React.Component;

type ColumnType = "TEXT" | "LABEL" | "NUMBER";

interface Column {
  name: string;
  type: ColumnType;
}

interface DataSet {
  columns: Column[];
  data: Map<string, Array<string>>;
}

// Default Values
const TITLE_ENABLED = true;
const TITLE = "Sample Data";
const TIMELINE = Array(20)
  .fill(0)
  .map((itm, idx) => String(idx + 1));
const TIMELINETEXTALIGN = "center";
const TIMELINEFONTSIZE = "20px";
const TIMELINETEXTCOLOR = "rgb(148, 148, 148)";
const TIMELINEMARGINBOTTOM = "50px";
const TEXTBOXFONTSIZE = "rgb(133, 131, 131)";
const TEXTBOXTEXTCOLOR = "30px";
const BARHEIGHT = "60px";
const BARMARGINTOP = "10px";
const BARBORDERRADIUS = "10px";

const INVALID_DATASET_MESSAGE =
  "Provided dataset is not valid. Please check Bar Chart Race instructions for more details. Showing sample data.";

function validateDataset(dataSet: DataSet): boolean {
  if (dataSet) {
    const cols = dataSet.columns;
    var cloneCols = cols.slice();
    var i = 0;
    cloneCols.splice(i,1);
    if (cols.length) {
      return (
        (cols[0].type === "TEXT" || cols[0].type === "LABEL") && 
        cloneCols.every((val, i, arr) => cloneCols[i].type === "NUMBER")
      );
    }
  }

  return false;
}

interface State {
  titleenabled: boolean;
  title: string;
  timelinetextalign: string;
  timelinefontsize: string;
  timelinetextcolor: string;
  timelinemarginbottom: string;
  textboxfontsize: string;
  textboxtextcolor: string;
  barheight: string;
  barmargintop: string;
  barborderradius: string;
  data: any;
  timeline: string[];
  invalidDataSet?: boolean;
}

export class ChartRace extends Component<any, State> {
  receiveEvent: (event: any) => void;

  constructor(props: BarChartRaceProps) {
    super(props);

    this.state = {
      titleenabled: TITLE_ENABLED,
      title: TITLE,
      timelinetextalign: TIMELINETEXTALIGN,
      timelinefontsize: TIMELINEFONTSIZE,
      timelinetextcolor: TIMELINETEXTCOLOR,
      timelinemarginbottom: TIMELINEMARGINBOTTOM,
      textboxfontsize: TEXTBOXFONTSIZE,
      textboxtextcolor: TEXTBOXTEXTCOLOR,
      barheight: BARHEIGHT,
      barmargintop: BARMARGINTOP,
      barborderradius: BARBORDERRADIUS,
      data: DefaultData,
      timeline: TIMELINE,
      invalidDataSet: false,
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const titleenabled = (params.get("titleenabled") as any) === "false";
      const title = (params.get("title") as any) as string;
      const timelinetextalign = (params.get(
        "timelinetextalign"
      ) as any) as string;
      const timelinefontsize = (params.get(
        "timelinefontsize"
      ) as any) as string;
      const timelinetextcolor = (params.get(
        "timelinetextcolor"
      ) as any) as string;
      const timelinemarginbottom = (params.get(
        "timelinemarginbottom"
      ) as any) as string;
      const textboxfontsize = (params.get("textboxfontsize") as any) as string;
      const textboxtextcolor = (params.get(
        "textboxtextcolor"
      ) as any) as string;
      const barheight = (params.get("barheight") as any) as string;
      const barmargintop = (params.get("barmargintop") as any) as string;
      const barborderradius = (params.get("barborderradius") as any) as string;
      let data = DefaultData;
      const dataSet = params.get("dataSet") as DataSet;
      var timeline: Array<string> = [];
      let isValid = validateDataset(dataSet);
      if (isValid) {
        const keysarray = dataSet.columns.slice(1).map((column) => column.name);
        for (var i = 0; i < Object.keys(dataSet.data).length; i++) {
          timeline.push(Object.values(dataSet.data)[i][0]);
        }
        dataSet.data.forEach((array) => array.shift());
        if (dataSet !== null) {
          var objectvalues: { [key: string]: Array<number> } = {};
          for (i = 0; i < Object.keys(dataSet.data).length; i++) {
            var keyObj: string = keysarray[i];
            var valuesarray: Array<number> = [];
            for (var j = 0; j < Object.values(dataSet.data).length; j++) {
              let values = Number(Object.values(dataSet.data)[j][i]);
              valuesarray.push(values);
            }
            if (keyObj !== undefined) {
              objectvalues[keyObj] = valuesarray;
            }
          }
          data = objectvalues;
        }
      }
      this.setState({
        titleenabled: titleenabled,
        title: title || TITLE,
        timelinetextalign: timelinetextalign || TIMELINETEXTALIGN,
        timelinefontsize: timelinefontsize
          ? timelinefontsize + "px"
          : TIMELINEFONTSIZE,
        timelinetextcolor: timelinetextcolor
          ? "#" + timelinetextcolor
          : TIMELINETEXTCOLOR,
        timelinemarginbottom: timelinemarginbottom
          ? timelinemarginbottom + "px"
          : TIMELINEMARGINBOTTOM,
        textboxfontsize: textboxfontsize
          ? textboxfontsize + "px"
          : TEXTBOXFONTSIZE,
        textboxtextcolor: textboxtextcolor
          ? "#" + textboxtextcolor
          : TEXTBOXTEXTCOLOR,
        barheight: barheight ? barheight + "px" : BARHEIGHT,
        barmargintop: barmargintop ? barmargintop + "px" : BARMARGINTOP,
        barborderradius: barborderradius
          ? barborderradius + "px"
          : BARBORDERRADIUS,
        data: data,
        timeline: timeline || TIMELINE,
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
        <BarChartRace {...this.state} />
      </div>
    );
  }
}
