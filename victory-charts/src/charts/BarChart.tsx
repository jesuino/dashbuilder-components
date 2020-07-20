import React from 'react';

import { ChartBar, ChartGroup } from '@patternfly/react-charts';
import { XYChart, ChartGroupType } from './XYChart';

export class BarChart extends XYChart {

  buildChartGroup(): any {
    return (
      <ChartGroup offset={10}>
        {this.dataSetToXYData()
          .map(line => this.seriesLines(line))
          .map((lineData, i) =>
            <ChartBar key={i} data={lineData} />
          )}
      </ChartGroup>
    )
  }
}