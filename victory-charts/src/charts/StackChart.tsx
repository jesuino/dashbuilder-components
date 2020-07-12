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
        legendData={[{ name: 'Cats' }, { name: 'Dogs' }, { name: 'Birds' }, { name: 'Mice' }]}
        legendPosition="bottom-left"
        height={height}
        padding={{
          bottom: 75, // Adjusted to accommodate legend
          left: 50,
          right: 50,
          top: 50
        }}
        themeColor={theme}
        width={width}
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartStack>
          <ChartBar
            data={[
              { name: 'Cats', x: '2015', y: 1, label: 'Cats: 1' },
              { name: 'Cats', x: '2016', y: 2, label: 'Cats: 2' },
              { name: 'Cats', x: '2017', y: 5, label: 'Cats: 5' },
              { name: 'Cats', x: '2018', y: 3, label: 'Cats: 3' }
            ]}
            labelComponent={<ChartTooltip constrainToVisibleArea />}
          />
          <ChartBar
            data={[
              { name: 'Dogs', x: '2015', y: 2, label: 'Dogs: 2' },
              { name: 'Dogs', x: '2016', y: 1, label: 'Dogs: 1' },
              { name: 'Dogs', x: '2017', y: 7, label: 'Dogs: 7' },
              { name: 'Dogs', x: '2018', y: 4, label: 'Dogs: 4' }
            ]}
            labelComponent={<ChartTooltip constrainToVisibleArea />}
          />
          <ChartBar
            data={[
              { name: 'Birds', x: '2015', y: 4, label: 'Birds: 4' },
              { name: 'Birds', x: '2016', y: 4, label: 'Birds: 4' },
              { name: 'Birds', x: '2017', y: 9, label: 'Birds: 9' },
              { name: 'Birds', x: '2018', y: 7, label: 'Birds: 7' }
            ]}
            labelComponent={<ChartTooltip constrainToVisibleArea />}
          />
          <ChartBar
            data={[
              { name: 'Mice', x: '2015', y: 3, label: 'Mice: 3' },
              { name: 'Mice', x: '2016', y: 3, label: 'Mice: 3' },
              { name: 'Mice', x: '2017', y: 8, label: 'Mice: 8' },
              { name: 'Mice', x: '2018', y: 5, label: 'Mice: 5' }
            ]}
            labelComponent={<ChartTooltip constrainToVisibleArea />}
          />
        </ChartStack>
      </Chart>
    );
  }
}