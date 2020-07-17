import React from 'react';


import { Chart, ChartBar, ChartAxis, ChartStack, ChartTooltip } from '@patternfly/react-charts';
import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property
import { BaseChart } from './BaseChart';

export class StackChart extends BaseChart {

  render() {
    const { width, height, theme } = this.props;
    return (
      <Chart
        ariaDesc="Average number of pets"
        ariaTitle="Stack chart example"
        domainPadding={{ x: [30, 25] }}
        legendData={this.legendData}
        legendPosition={this.props.legendPosition}
        legendOrientation={this.legendOrientation}
        height={height}
        animate={this.props.animate}
        padding={this.padding}
        themeColor={theme}
        width={width}
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartStack>
          {this.dataSetToXYData()
            .map(line => this.seriesLines(line))
            .map((lineData, i) => <ChartBar key={i} data={lineData} labelComponent={<ChartTooltip constrainToVisibleArea />} />)}
        </ChartStack>
      </Chart>
    );
  }
}