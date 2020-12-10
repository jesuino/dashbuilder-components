import React from 'react';
import { PaddingProps, AnimationEasing, AnimatePropTypeInterface } from 'victory-core';
import { VictoryZoomContainer } from 'victory-zoom-container';
import { ChartVoronoiContainer } from '@patternfly/react-charts';

export type ThemeType = "blue" | "cyan" | "blue" | "gold" | "gray" |
    "green" | "multi" | "multi-ordered" | "multi-unordered" |
    "orange" | "purple";


export type LegendPosition = "bottom-left" | "bottom" | "right";
export type ChartType = "bar" | "area" | "line" | "donut" | "pie" | "stack" | "utilization-donut";
export type LegendOrientation = "horizontal" | "vertical";
export type ColumnType = "TEXT" | "LABEL" | "DATE" | "NUMBER";

export interface XYChartData {
    x: any;
    y: number;
}

export interface ChartSeries {
    name: string;
}

export interface XYChartDataLine extends XYChartData, ChartSeries {
}

export interface XYChartSeries extends ChartSeries {
    data: XYChartData[];
}

export interface PieChartSerie extends ChartSeries {
    y: number;
}

export interface Column {
    name: string;
    type: ColumnType;
    settings: Object;
}

export interface DataSet {
    columns: Column[];
    data: string[][];
}

export interface Grid {
    x: boolean;
    y: boolean;
}

export interface AnimationProp {
    enabled: boolean;
    duration?: number;
    easing?: AnimationEasing;
}

export interface LegendData {
    name: string;
}

export interface ChartProps {
    width: number;
    height: number;
    theme: ThemeType;
    zoom: boolean;
    dataSet: DataSet;
    legendPosition: LegendPosition;
    animation: AnimationProp;
    ariaTitle: string;
    ariaDescription: string;
    grid: Grid;
    padding: PaddingProps;

    donutTitle?: string;
    donutSubTitle?: string;
}

export abstract class BaseChart extends React.Component<ChartProps, any> {

    legendOrientation: LegendOrientation = "horizontal";
    legendData: LegendData[] = [];
    animationProp: boolean | AnimatePropTypeInterface = false;
    containerComponent: React.ReactElement<any> = <ChartVoronoiContainer
        labels={({ datum }) => `${datum.name}: ${datum.y}`}
        constrainToVisibleArea />;

    constructor(props) {
        super(props);
        this.buildLegendData();
        this.legendOrientation = this.props.legendPosition === 'right' ? 'vertical' : 'horizontal';
        if (props.zoom) {
            this.containerComponent = <VictoryZoomContainer />;
        }
        if (props.animation.enabled) {
            this.animationProp = {
                duration: props.animation.duration,
                easing: props.animation.easing
            };
        }
    }


    buildLegendData() {
        this.legendData = this.categories().map(name => {
            return { name: name };
        });
    }

    abstract categories(): string[];

}
