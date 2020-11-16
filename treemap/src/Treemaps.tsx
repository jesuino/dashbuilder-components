import React, { PureComponent } from "react";
import { Treemap } from "recharts";

export interface TreemapProps {
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

export interface TreemapState {}

export class Treemaps extends PureComponent<TreemapProps,TreemapState> {
  constructor(props: TreemapProps) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Treemap
          width={this.props.width}
          height={this.props.height}
          data={this.props.data}
          dataKey= {this.props.dataKey}
          type={this.props.type}
          ratio={this.props.ratio}
          stroke={this.props.stroke}
          fill={this.props.fill}
          animationBegin={this.props.animationBegin}
          animationDuration={this.props.animationDuration}
          animationEasing={this.props.animationEasing}
        />
      </div>
    );
  }
}

// export default Treemaps;
