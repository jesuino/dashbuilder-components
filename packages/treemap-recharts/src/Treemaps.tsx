import * as React from "react";
import { AnimationEasingType, Treemap } from "recharts";

export interface TreemapProps {
  width?: number;
  height?: number;
  data?: any;
  dataKey?: string;
  aspectRatio?: number | undefined;
  stroke?: string;
  fill?: string;
  animationBegin?: number;
  animationDuration?: number;
  animationEasing?: AnimationEasingType;
}

export interface TreemapState {}

export function Treemaps(props: TreemapProps) {
  console.log(props.data);
  return (
    <div className="App">
      <Treemap
        width={props.width}
        height={props.height}
        data={props.data}
        dataKey={props.dataKey}
        // type={'nest'}
        aspectRatio={props.aspectRatio}
        stroke={props.stroke}
        fill={props.fill}
        animationBegin={props.animationBegin}
        animationDuration={props.animationDuration}
        animationEasing={props.animationEasing}
      />
    </div>
  );
}
