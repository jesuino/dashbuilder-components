import React from 'react';

import { ChartPie } from '@patternfly/react-charts';
import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property
import { BaseChart } from './BaseChart';

export class PieChart extends BaseChart {

  render() {
    const { width, height, theme } = this.props;
    return (
      <ChartPie
        ariaDesc="Average number of pets"
        ariaTitle="Pie chart example"
        constrainToVisibleArea={true}
        data={this.dataSetToPieChart()}
        height={height}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        legendData={this.legendData}
        legendOrientation="vertical"
        legendPosition="right"
        padding={{
          bottom: 65,
          left: 20,
          right: 20,
          top: 20
        }}
        themeColor={theme}
        width={width}
      />
    );
  }
}