import React from 'react';

import { Chart, ChartAxis, ChartBar, ChartGroup } from '@patternfly/react-charts';
import { VictoryZoomContainer } from 'victory-zoom-container';
import { BaseChart } from './BaseChart';

export class BarChart extends BaseChart {

  render() {
    const { width, height, theme } = this.props;
    return (
      <Chart
        ariaDesc="Average number of pets"
        ariaTitle="Bar chart example"
        containerComponent={<VictoryZoomContainer />}
        domainPadding={{ x: [30, 25] }}
        legendData={this.legendData}
        legendOrientation={this.legendOrientation}
        legendPosition={this.props.legendPosition}
        height={height}
        animate={this.props.animate}
        padding={this.padding}
        themeColor={theme}
        width={width}
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartGroup offset={10} >
          {this.dataSetToXYData()
            .map(line => this.seriesLines(line))
            .map((lineData, i) => <ChartBar key={i} data={lineData} />)}
        </ChartGroup>
      </Chart>
    );
  }
}