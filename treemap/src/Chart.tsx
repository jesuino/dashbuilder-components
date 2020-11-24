import React from "react";
import { Treemaps, TreemapProps } from "./Treemaps";
import { SampleData } from "./SampleData";
import { Data, Children } from "./DataSet";
var Component = React.Component;
type ColumnType = "TEXT" | "LABEL" | "NUMBER";

interface Column {
  name: string;
  type: ColumnType;
}

interface DataSet {
  columns: Column[];
  data: string[][];
}

// Default Values
const WIDTH = 400;
const HEIGHT = 200;
const DATAKEY = "size";
const TYPE = "flat";
const RATIO = 4 / 3;
const STROKE = "#fff";
const FILL = "#8884d8";
const ANIMATIONBEGIN = 0;
const ANIMATIONDURATION = 1500;
const ANIMATIONEASING = "linear";
// constants
const INVALID_DATASET_MESSAGE =
  "Provided dataset is not valid. Please check Treemap Component instructions for more details. Showing sample data.";

function validateDataset(dataSet: DataSet): boolean {
  if (dataSet) {
    const cols = dataSet.columns;
    if (cols.length === 3) {
      return (
        (cols[0].type === "TEXT" || cols[0].type === "LABEL") &&
        (cols[1].type === "TEXT" || cols[1].type === "LABEL") &&
        cols[2].type === "NUMBER"
      );
    }
  }

  return false;
}

interface State {
  width?: number;
  height?: number;
  data?: Data[];
  dataKey?: string;
  type?: string;
  ratio?: number;
  stroke?: string;
  fill?: string;
  animationBegin?: number;
  animationDuration?: number;
  animationEasing?: string;
  invalidDataSet?: boolean;
}

export class Chart extends Component<any, State> {
  receiveEvent: (event: any) => void;

  constructor(props: TreemapProps) {
    super(props);

    this.state = {
      width: WIDTH,
      height: HEIGHT,
      data: SampleData,
      dataKey: DATAKEY,
      type: TYPE,
      ratio: RATIO,
      stroke: STROKE,
      fill: FILL,
      animationBegin: ANIMATIONBEGIN,
      animationDuration: ANIMATIONDURATION,
      animationEasing: ANIMATIONEASING,
      invalidDataSet: false,
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const width = +(params.get("width") as any);
      const height = +(params.get("height") as any);
      const dataSet = params.get("dataSet") as DataSet;
      let isValid = validateDataset(dataSet);
      const datakey = (params.get("datakey") as any) as string;
      const type = (params.get("type") as any) as string;
      const ratio = +(params.get("ratio") as any);
      const stroke = (params.get("stroke") as any) as string;
      const fill = (params.get("fill") as any) as string;
      const animationbegin = +(params.get("animationbegin") as any);
      const animationduration = +(params.get("animationduration") as any);
      const animationeasing = (params.get("animationeasing") as any) as string;
      var newdata: Data[] = [];
      let data: Data[] = [];

      if (isValid) {
        dataSet.data.forEach((d) => {
          if (d[1] !== "null") {
            data.push({
              name: (d[1] as any) as string,
              children: [{ name: (d[0] as any) as string, size: +d[2] }],
            });
          }
        });

        let group: { [key: string]: Array<Children> } = data.reduce((r, a) => {
          r[a.name] = [...(r[a.name] || []), a.children[0]];
          return r;
        }, {});

        for (var key in group) {
          if (group.hasOwnProperty(key)) {
            newdata.push({
              name: key,
              children: group[key],
            });
          }
        }
      }
      this.setState({
        width: width || WIDTH,
        height: height || HEIGHT,
        data: newdata,
        dataKey: datakey || DATAKEY,
        type: type || TYPE,
        ratio: ratio || RATIO,
        stroke: stroke ? "#" + stroke : STROKE,
        fill: fill ? "#" + fill : FILL,
        animationBegin: animationbegin || ANIMATIONBEGIN,
        animationDuration: animationduration || ANIMATIONDURATION,
        animationEasing: animationeasing || ANIMATIONEASING,
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
        <Treemaps {...this.state} />
      </div>
    );
  }
}

export default Chart;
