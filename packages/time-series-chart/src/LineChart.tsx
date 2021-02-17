import * as React from "react";
import { Options, SingleSeries } from "./Data";
import Chart from "react-apexcharts";

export interface ChartProps {
  width?: number;
  height?: number;
  options: Options;
  series: Array<SingleSeries>;
}

export function LineChart(props: ChartProps) {
  return (
    <Chart width={props.width} height={props.height} type="line" options={props.options} series={props.series} />
  );
}
