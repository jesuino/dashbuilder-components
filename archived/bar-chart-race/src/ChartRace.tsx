import React from "react";
import {BarChartRace, BarChartRaceProps} from "./BarChartRace";
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
const TIMELINE= Array(20).fill(0).map((itm, idx) => String(idx + 1));

interface State {
  titleenabled: boolean;
  title: string;
  data: any;
  timeline: string[];
}

export class ChartRace extends Component<any, State> {
  receiveEvent: (event: any) => void;

  constructor(props: BarChartRaceProps) {
    super(props);

    this.state = {
      titleenabled: TITLE_ENABLED,
      title: TITLE,
      data: DefaultData,
      timeline: TIMELINE
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const titleenabled = (params.get("titleenabled") as any) === "false";
      const title = (params.get("title") as any) as string;
      let data = DefaultData;
      const dataSet = params.get("dataSet") as DataSet;
      const timeline = dataSet.columns.slice(1).map((column) => column.name);
      if (dataSet!==null) {
        var objectvalues: { [key: string]: Array<number> } = {};
        for (var j = 0; j < Object.keys(dataSet.data).length; j++) {
          var keyObj = String(Object.values(dataSet.data)[j][0]);
          var valuesarray: Array<number> = [];
          for (var i = 1; i < Object.values(dataSet.data)[j].length; i++) {
            let values = Number(Object.values(dataSet.data)[j][i]);
            valuesarray.push(values);
          }
          objectvalues[keyObj] = valuesarray;
        }
        data = objectvalues;
      }
      this.setState({
        titleenabled: titleenabled,
        title: title || TITLE,
        data: data,
        timeline: timeline,
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
        <BarChartRace {...this.state} />
      </div>
    );
  }
}
