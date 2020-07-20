import React from 'react';
import { VictoryZoomContainer } from 'victory-zoom-container';
import { BaseChart } from './BaseChart';
import { Chart, ChartAxis, ChartGroup } from '@patternfly/react-charts';

export type ChartGroupType = typeof ChartGroup;

export abstract class XYChart extends BaseChart {

    render() {
        const { width, height, theme } = this.props;
        return (
            <Chart
                ariaDesc={this.props.ariaDescription}
                ariaTitle={this.props.ariaTitle}
                containerComponent={<VictoryZoomContainer />}
                domainPadding={{ x: [30, 25] }}
                legendData={this.legendData}
                legendOrientation={this.legendOrientation}
                legendPosition={this.props.legendPosition}
                height={height}
                animate={this.props.animate}
                padding={this.props.padding}
                themeColor={theme}
                width={width}
            >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                {this.buildChartGroup()}
            </Chart>
        );
    }

    abstract buildChartGroup(): ChartGroupType;
}