import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

export interface TreemapProps {
  data?: any;
  title?: string;
  titletextcolor?: string;
  titlefontname?: string;
  titlefontsize?: number;
  titlebold?: boolean;
  titleitalic?: boolean; 
  maxDepth?: number;
  maxPostDepth?: number;
  minHighlightColor?: string;
  midHighlightColor?: string;
  maxHighlightColor?: string;
  minColor?: string;
  midColor?: string;
  maxColor?: string;
  textcolor?: string;
  fontname?: string;
  fontsize?: number;
  bold?: boolean;
  italic?: boolean; 
  headerHeight?: number;
  showScale?: boolean;
  useWeightedAverageForAggregation?: boolean;
  showTooltips?: boolean;
}

export interface TreemapState {}

export class Treemap extends React.Component<TreemapProps, TreemapState> {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="TreeMap"
          width={'100%'}
          height={'100%'}
          data={this.props.data}
          options={{
            title: this.props.title,
            showTooltips: this.props.showTooltips,
            titleTextStyle: { color: this.props.titletextcolor,
              fontName: this.props.titlefontname,
              fontSize: this.props.titlefontsize,
              bold: this.props.titlebold,
              italic: this.props.titleitalic },
            maxDepth: this.props.maxDepth,
            maxPostDepth: this.props.maxPostDepth,
            minHighlightColor: this.props.minHighlightColor,
            midHighlightColor: this.props.midHighlightColor,
            maxHighlightColor: this.props.maxHighlightColor,
            minColor: this.props.minColor,
            midColor: this.props.midColor,
            maxColor: this.props.maxColor,
            textStyle: { color: this.props.textcolor,
              fontName: this.props.fontname,
              fontSize: this.props.fontsize,
              bold: this.props.bold,
              italic: this.props.italic }, 
            headerHeight: this.props.headerHeight,
            showScale: this.props.showScale,
            height: 500,
            useWeightedAverageForAggregation: this.props.useWeightedAverageForAggregation,
            generateTooltip: (row, size, value) => {
              return (
                '<div style="background:#fd9; padding:10px; border-style:solid"> row: ' +
                row +
                " size: " +
                size +
                " val: " +
                value +
                "</div>"
              );
            },
          }}
        />
      </div>
    );
  }
}

export default Treemap;
