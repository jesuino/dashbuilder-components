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
        data={[{ x: 'Cats', y: 35 }, { x: 'Dogs', y: 55 }, { x: 'Birds', y: 10 }]}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        legendData={[{ name: 'Cats: 35' }, { name: 'Dogs: 55' }, { name: 'Birds: 10' }]}
        legendOrientation="vertical"
        legendPosition="right"
        padding={{
          bottom: 20,
          left: 20,
          right: 140, // Adjusted to accommodate legend
          top: 20
        }}
        subTitle="Pets"
        title="100"
        themeColor={theme}
        width={width}
        height={height}
      />
    );
  }
}