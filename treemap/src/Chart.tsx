import React from "react";
import { Treemaps, TreemapProps } from "./Treemaps";
import {data} from "./Data";
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
const WIDTH = 400;
const HEIGHT = 200;
const DATAKEY= "size";
const TYPE = "flat";
const RATIO= 4/3;
const STROKE= "#fff";
const FILL= "#8884d8";
const ANIMATIONBEGIN= 0;
const ANIMATIONDURATION= 1500;
const ANIMATIONEASING = "linear";

interface State {
  width?: number;
  height?: number;
  data?: any;
  dataKey?: string;
  type?: string;
  ratio?: number;
  stroke?: string;
  fill?: string;
  animationBegin?: number;
  animationDuration?: number;
  animationEasing?: string;
}

export class Chart extends Component<any, State> {
  receiveEvent: (event: any) => void;

  constructor(props: TreemapProps) {
    super(props);

    this.state = {
      width: WIDTH,
      height: HEIGHT,
      data: data,
      dataKey: DATAKEY,
      type: TYPE ,
      ratio: RATIO,
      stroke: STROKE,
      fill: FILL,
      animationBegin: ANIMATIONBEGIN,
			animationDuration: ANIMATIONDURATION,
			animationEasing: ANIMATIONEASING
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const width = +(params.get("width") as any);
      const height = +(params.get("height") as any);
      const datakey = (params.get("datakey") as any) as string;
      const type= (params.get("type") as any) as string;
      const ratio = +(params.get("ratio") as any);
      const stroke = (params.get("stroke") as any) as string;
      const fill = (params.get("fill") as any) as string;
      const animationbegin = +(params.get("animationbegin") as any);
      const animationduration = +(params.get("animationduration") as any);
      const animationeasing = (params.get("animationeasing") as any) as string;

      this.setState({
        width: width || WIDTH,
        height: height || HEIGHT,
        data: data,
        dataKey: datakey|| DATAKEY,
        type: type || TYPE,
        ratio: ratio || RATIO,
        stroke: stroke ? "#" + stroke : STROKE,
        fill: fill ? "#" + fill : FILL,
        animationBegin: animationbegin || ANIMATIONBEGIN,
        animationDuration: animationduration || ANIMATIONDURATION,
        animationEasing: animationeasing || ANIMATIONEASING
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
        <Treemaps {...this.state}/>
      </div>
    );
  }
}

export default Chart;
