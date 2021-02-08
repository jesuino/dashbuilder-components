import * as React from "react";
import {typeoptions, typeseries} from "./Data";
import  Chart from "react-apexcharts";

export interface ChartProps {
  width?: number;
  height?: number;
  options: typeoptions;
  series: typeseries;
}

export interface TreemapState {}

export function LineChart(props: ChartProps) {
  return (
      <Chart
        width={props.width}
        height={props.height}
        type="line"
        options={props.options}
        series={[props.series]}
      />
  );
}
