import { ChartType, ColumnType, Column, DataSet } from './BaseChart';

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

const FIRST_COLUMN_TYPES: ColumnType[] = ["TEXT", "LABEL", "DATE"];
const SERIES_COLUMN_TYPE: ColumnType = "NUMBER";

const notEnoughColumns = (chartType: string, n: number, required: number): ValidationResult => {
    return {
        isValid: false,
        message: `Not enough columns to build chart of type ${chartType}. The dataset has ${n}, but the chart requires at least ${required}`
    }
}

const wrongSeriesType = (chartType: ChartType): ValidationResult => {
    return {
        isValid: false,
        message: `Series data type for ${chartType} must be ${SERIES_COLUMN_TYPE}`
    }
}

const notAllColumnsofType = (columns: Column[], startIndex: number, columnType: ColumnType) =>
    columns.slice(startIndex).some(c => c.type !== columnType);


export function validateDataSetForChart(chartType: ChartType, dataSet: DataSet): ValidationResult {
    const columns = dataSet.columns;
    /*
    switch (chartType) {
        case "area" || "bar" || "line" || "stack":
            if (notAllColumnsofType(columns, 2, SERIES_COLUMN_TYPE)) {
                return wrongSeriesType(chartType);
            }
            break;
        case "donut" || "pie":
            if (notAllColumnsofType(columns, 1, SERIES_COLUMN_TYPE)) {
                return wrongSeriesType(chartType);
            }
            break;
    }
    */

    if (columns.length < 2 && chartType != "utilization-donut") {
        return notEnoughColumns(chartType, columns.length, 2);
    }
    /*
        if (!FIRST_COLUMN_TYPES.some(t => t === columns[0].type)) {
            return {
                isValid: false,
                message: `First Column for ${chartType} should have one of the following types: ${FIRST_COLUMN_TYPES}`
            };
        }
    */
    return { isValid: true };
};