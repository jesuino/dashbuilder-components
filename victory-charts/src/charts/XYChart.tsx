import React from "react";
import {
  BaseChart,
  XYChartSeries,
  XYChartDataLine,
  XYChartData,
} from "./BaseChart";
import { Chart, ChartAxis, ChartGroup } from "@patternfly/react-charts";
var numeral = require("numeral");

export type ChartGroupType = typeof ChartGroup;

export abstract class XYChart extends BaseChart {
  render() {
    const { width, height, theme } = this.props;
    return (
      <Chart
        ariaDesc={this.props.ariaDescription}
        ariaTitle={this.props.ariaTitle}
        containerComponent={this.containerComponent}
        domainPadding={{ x: [30, 25] }}
        legendData={this.legendData}
        legendOrientation={this.legendOrientation}
        legendPosition={this.props.legendPosition}
        height={height}
        animate={this.animationProp}
        padding={this.props.padding}
        themeColor={theme}
        width={width}
      >
        <ChartAxis showGrid={this.props.grid.y} />
        <ChartAxis dependentAxis showGrid={this.props.grid.x}
          tickFormat={(t) => numeral(t).format(this.pattern())} />
        {this.buildChartGroup()}
      </Chart>
    );
  }

  abstract buildChartGroup(): ChartGroupType;

  categories() {
    return this.props.dataSet.columns
      .slice(1)
      .map((column) => column.settings["columnName"]);
  }

  pattern(){
    let getPattern = this.props.dataSet.columns
    .slice(1)
    .map((column) => column.settings["valuePattern"]);
    let pattern = Object.values(getPattern)[0].toString();
    let p = pattern.replace(/#/g, "0");
    return p;
  }

  dataSetToXYData(): XYChartSeries[] {
    let groupedLines: Map<string, XYChartData[]> = new Map();
    const categories = this.categories();
    const ds = this.props.dataSet;
    const rows = ds.data.length;
    const cols = ds.columns.length;
    let getcolumnExpression = this.props.dataSet.columns
      .slice(0)
      .map((column) => column.settings["valueExpression"]);
    let getcolumn1Expression = Object.values(getcolumnExpression)[0].toString();
    let column1expression = getcolumn1Expression
      .replace("value", "")
      .replace("+", "")
      .slice(1, -1);
    let getExpression = this.props.dataSet.columns
      .slice(1)
      .map((column) => column.settings["valueExpression"]);
    let expression = Object.values(getExpression)[0].toString();
    let exp = expression.replace("value", "1");
    const series: XYChartSeries[] = [];

    categories.forEach((name) => groupedLines.set(name, []));

    for (let i = 0; i < rows; i++) {
      const name = ds.data[i][0];
      for (let j = 1; j < cols; j++) {
        const cat = categories[j - 1];
        groupedLines.get(cat)?.push({
          x: name + column1expression,
          y: numeral(+ds.data[i][j] * eval(exp)).format(this.pattern()),
        });
      }
    }
    groupedLines.forEach((lines, name) =>
      series.push({ name: name, data: lines })
    );
    return series;
  }

  seriesLines(series: XYChartSeries): XYChartDataLine[] {
    return series.data.map((d) => {
      return { name: series.name, x: d.x, y: d.y, yVal: numeral(d.y).value() };
    });
  }
}
