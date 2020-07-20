import React from 'react';

import { ChartDonut } from '@patternfly/react-charts';
import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property
import { BaseChart } from './BaseChart';

export class DonutChart extends BaseChart {

  render() {
    const { width, height, theme } = this.props;
    return (
      <ChartDonut
        ariaDesc="Average number of pets"
        ariaTitle="Donut chart example"
        constrainToVisibleArea={true}
        data={this.dataSetToPieChart()}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        legendData={this.legendData}
        legendOrientation="vertical"
        legendPosition="right"
        padding={this.props.padding}
        subTitle="Pets"
        title="100"
        themeColor={theme}
        width={width}
        height={height}
      />
    );
  }
}