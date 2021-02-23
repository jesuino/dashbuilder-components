import * as React from "react";
import { Options, SingleSeries } from "./Data";
import Chart from "react-apexcharts";

export interface ChartProps {
  options: Options;
  series: Array<SingleSeries>;
}

export function LineChart(props: ChartProps) {
  return (
    <Chart type="line" options={props.options} series={props.series} />
  );
}
