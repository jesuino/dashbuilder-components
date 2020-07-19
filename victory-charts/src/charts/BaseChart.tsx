import React from 'react';
import { PaddingProps } from 'victory-core';

export type ThemeType = "blue" | "cyan" | "blue" | "gold" | "gray" |
    "green" | "multi" | "multi-ordered" | "multi-unordered" |
    "orange" | "purple";


export type LegendPosition = "bottom-left" | "bottom" | "right";
export type ChartType = "bar" | "area" | "line" | "donut" | "pie" | "stack";
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
}
export interface DataSet {
    columns: Column[];
    data: string[][];
}

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export interface LegendData {
    name: string;
}

const FIRST_COLUMN_TYPES: ColumnType[] = ["TEXT", "LABEL", "DATE"];
const SERIES_COLUMN_TYPE: ColumnType = "NUMBER";

const NOT_ENOUGHT_COLUMNS_VALIDATION = (chartType: string, n: number, required: number): ValidationResult => {
    return {
        isValid: false,
        message: `Not enough columns to build chart of type ${chartType}. The dataset has ${n}, but the chart requires at least ${required}`
    }
}

const WRONG_TYPE_FOR_SERIES = (chartType: ChartType): ValidationResult => {
    return {
        isValid: false,
        message: `Series data type for ${chartType} must be ${SERIES_COLUMN_TYPE}`
    }
}

const NOT_ALL_COLUMNS_OF_TYPE = (columns: Column[], startIndex: number, columnType: ColumnType) =>
    columns.slice(startIndex).some(c => c.type !== columnType);


export function validateDataSetForChart(chartType: ChartType, dataSet: DataSet): ValidationResult {
    const columns = dataSet.columns;
    switch (chartType) {
        case "area" || "bar" || "line" || "stack":
            if (NOT_ALL_COLUMNS_OF_TYPE(columns, 2, SERIES_COLUMN_TYPE)) {
                return WRONG_TYPE_FOR_SERIES(chartType);
            }
            break;
        case "donut" || "pie":
            if (NOT_ALL_COLUMNS_OF_TYPE(columns, 1, SERIES_COLUMN_TYPE)) {
                return WRONG_TYPE_FOR_SERIES(chartType);
            }
            break;
    }

    if (columns.length < 2) {
        return NOT_ENOUGHT_COLUMNS_VALIDATION(chartType, columns.length, 2);
    }

    if (!FIRST_COLUMN_TYPES.some(t => t === columns[0].type)) {
        return {
            isValid: false,
            message: `First Column for ${chartType} should have one of the following types: ${FIRST_COLUMN_TYPES}`
        };
    }

    return { isValid: true };
};

export interface ChartProps {
    width: number;
    height: number;
    theme: ThemeType;
    dataSet: DataSet;
    legendPosition: LegendPosition;
    animate: boolean;
}

export abstract class BaseChart extends React.Component<ChartProps, any> {

    legendOrientation: LegendOrientation = "horizontal";
    legendData: LegendData[] = [];
    padding: PaddingProps = { bottom: 50, left: 50, right: 50, top: 50 };

    constructor(props) {
        super(props);
        this.buildLegendData();
        this.setupPadding();
        this.legendOrientation = this.props.legendPosition === 'right' ? 'vertical' : 'horizontal';
    }

    setupPadding() {
        switch (this.props.legendPosition) {
            case "bottom":
            case "bottom-left":
                this.padding = {
                    bottom: 75,
                    left: 50,
                    right: 50,
                    top: 50,
                }
                break;
            case "right":
                this.padding = {
                    bottom: 50,
                    left: 50,
                    right: 75,
                    top: 50,
                }
                break;

            default:
                break;
        }
    }

    buildLegendData() {
        this.legendData = this.categories().map(name => {
            return { name: name };
        });
    }


    categories(): string[] {
        return this.props.dataSet.columns.slice(1).map(column => column.name);
    }

    dataSetToXYData(): XYChartSeries[] {
        const groupedLines: Map<string, XYChartData[]> = new Map();
        const categories = this.categories();
        const ds = this.props.dataSet;
        const rows = ds.data.length;
        const cols = ds.columns.length;
        const series: XYChartSeries[] = [];

        categories.forEach(name => groupedLines.set(name, []))

        for (let i = 0; i < rows; i++) {
            const name = ds.data[i][0];
            for (let j = 1; j < cols; j++) {
                const cat = categories[j - 1];
                groupedLines.get(cat)?.push({
                    x: name,
                    y: +ds.data[i][j]
                });
            }
        }

        groupedLines.forEach((lines, name) => series.push({ name: name, data: lines }));
        return series;
    }

    dataSetToPieChart(): PieChartSerie[] {
        const ds = this.props.dataSet;
        const rows = this.props.dataSet.data.length;
        const series: PieChartSerie[] = [];

        for (let i = 0; i < rows; i++) {
            series.push({
                name: ds.data[i][0],
                y: +ds.data[i][1]
            });
        }
        return series;
    }

    seriesLines(series: XYChartSeries): XYChartDataLine[] {
        return series.data.map(d => {
            return { name: series.name, x: d.x, y: d.y };
        })
    }


}
