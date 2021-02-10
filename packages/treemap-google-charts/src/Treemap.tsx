import * as React from "react";
import Chart from "react-google-charts";

export interface TreemapProps {
  data: any;
  title: string;
  titletextcolor: string;
  titlefontname: string;
  titlefontsize: number;
  titlebold: boolean;
  titleitalic: boolean;
  maxDepth: number;
  maxPostDepth: number;
  minHighlightColor: string;
  midHighlightColor: string;
  maxHighlightColor: string;
  minColor: string;
  midColor: string;
  maxColor: string;
  textcolor: string;
  fontname: string;
  fontsize: number;
  bold: boolean;
  italic: boolean;
  headerHeight: number;
  showScale: boolean;
  useWeightedAverageForAggregation: boolean;
  showTooltips: boolean;
}

export interface TreemapState {}

export function Treemap(props: TreemapProps) {
  return (
    <div className="App">
      <Chart
        chartType="TreeMap"
        width={"100%"}
        height={"100%"}
        data={props.data}
        options={{
          title: props.title,
          showTooltips: props.showTooltips,
          titleTextStyle: {
            color: props.titletextcolor,
            fontName: props.titlefontname,
            fontSize: props.titlefontsize,
            bold: props.titlebold,
            italic: props.titleitalic
          },
          maxDepth: props.maxDepth,
          maxPostDepth: props.maxPostDepth,
          minHighlightColor: props.minHighlightColor,
          midHighlightColor: props.midHighlightColor,
          maxHighlightColor: props.maxHighlightColor,
          minColor: props.minColor,
          midColor: props.midColor,
          maxColor: props.maxColor,
          textStyle: {
            color: props.textcolor,
            fontName: props.fontname,
            fontSize: props.fontsize,
            bold: props.bold,
            italic: props.italic
          },
          headerHeight: props.headerHeight,
          showScale: props.showScale,
          height: 500,
          useWeightedAverageForAggregation: props.useWeightedAverageForAggregation,
          generateTooltip: (row: any, size: any, value: any) => {
            return (
              '<div style="background:#fd9; padding:10px; border-style:solid"> row: ' +
              row +
              " size: " +
              size +
              " val: " +
              value +
              "</div>"
            );
          }
        }}
      />
    </div>
  );
}
