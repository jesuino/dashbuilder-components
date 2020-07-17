import React from 'react';

import { Chart, ChartArea, ChartAxis, ChartGroup, ChartVoronoiContainer } from '@patternfly/react-charts';
import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property
import { BaseChart } from './BaseChart';

export class AreaChart extends BaseChart {

  render() {
    const { width, height, theme} = this.props;
    return (
      <Chart
        ariaDesc="Average number of pets"
        ariaTitle="Area chart example"
        containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
        legendData={this.legendData}
        legendOrientation={this.legendOrientation}
        legendPosition={this.props.legendPosition}
        padding={this.padding}
        animate={this.props.animate}
        themeColor={theme}
        width={width}
        height={height}
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartGroup>
          {this.dataSetToXYData()
            .map(line => this.seriesLines(line))
            .map((lineData, i) => <ChartArea key={i} data={lineData} interpolation="monotoneX" />)}
        </ChartGroup>
      </Chart>
    );
  }
}