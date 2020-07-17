import React from 'react';

import { Chart, ChartAxis, ChartGroup, ChartLine } from '@patternfly/react-charts';
import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property
import { BaseChart } from './BaseChart';
import { VictoryZoomContainer } from 'victory';

export class LineChart extends BaseChart {

  render() {
    const { width, height, theme } = this.props;
    return (
      <Chart
        ariaDesc="Average number of pets"
        ariaTitle="Line chart example"
        containerComponent={<VictoryZoomContainer zoomDimension="x" />}
        legendData={this.legendData}
        legendOrientation={this.legendOrientation}
        legendPosition={this.props.legendPosition}
        height={height}
        minDomain={{ y: 0 }}
        padding={this.padding}
        themeColor={theme}
        width={width}
        animate={this.props.animate}
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartGroup>
          {this.dataSetToXYData()
            .map(line => this.seriesLines(line))
            .map((lineData, i) => <ChartLine key={i} data={lineData} />)}
        </ChartGroup>
      </Chart>
    );
  }
}