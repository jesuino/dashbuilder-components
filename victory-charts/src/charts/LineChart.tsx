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
        legendData={[{ name: 'Cats' }, { name: 'Dogs', symbol: { type: 'dash' } }, { name: 'Birds' }, { name: 'Mice' }]}
        legendPosition="bottom-left"
        height={height}
        maxDomain={{ y: 10 }}
        minDomain={{ y: 0 }}
        padding={{
          bottom: 75, // Adjusted to accommodate legend
          left: 50,
          right: 50,
          top: 50
        }}
        themeColor={theme}
        width={width}
      >
        <ChartAxis tickValues={[2, 3, 4]} />
        <ChartAxis dependentAxis showGrid tickValues={[2, 5, 8]} />
        <ChartGroup>
          <ChartLine
            data={[
              { name: 'Cats', x: '2015', y: 1 },
              { name: 'Cats', x: '2016', y: 2 },
              { name: 'Cats', x: '2017', y: 5 },
              { name: 'Cats', x: '2018', y: 3 }
            ]}
          />
          <ChartLine
            data={[
              { name: 'Dogs', x: '2015', y: 2 },
              { name: 'Dogs', x: '2016', y: 1 },
              { name: 'Dogs', x: '2017', y: 7 },
              { name: 'Dogs', x: '2018', y: 4 }
            ]}
            style={{
              data: {
                strokeDasharray: '3,3'
              }
            }}
          />
          <ChartLine
            data={[
              { name: 'Birds', x: '2015', y: 3 },
              { name: 'Birds', x: '2016', y: 4 },
              { name: 'Birds', x: '2017', y: 9 },
              { name: 'Birds', x: '2018', y: 5 }
            ]}
          />
          <ChartLine
            data={[
              { name: 'Mice', x: '2015', y: 3 },
              { name: 'Mice', x: '2016', y: 3 },
              { name: 'Mice', x: '2017', y: 8 },
              { name: 'Mice', x: '2018', y: 7 }
            ]}
          />
        </ChartGroup>
      </Chart>
    );
  }
}