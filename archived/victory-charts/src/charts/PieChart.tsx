import React from 'react';

import { ChartPie } from '@patternfly/react-charts';
import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property
import { BaseChart } from './BaseChart';
import { PieBaseChart } from './PieBaseChart';

export class PieChart extends PieBaseChart {

  render() {
    const { width, height, theme } = this.props;
    return (
      <ChartPie
        ariaDesc={this.props.ariaDescription}
        ariaTitle={this.props.ariaTitle}
        constrainToVisibleArea={true}
        data={this.dataSetToPieChart()}
        height={height}
        labels={({ datum }) => `${datum.name}: ${datum.y}`}
        legendData={this.legendData}
        legendOrientation={this.legendOrientation}
        legendPosition={this.pieLegendPosition()}
        animate={this.animationProp}
        padding={this.props.padding}
        themeColor={theme}
        width={width}
      />
    );
  }
}