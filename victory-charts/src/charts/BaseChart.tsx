import React from 'react';

export interface ChartProps {
    width: number;
    height: number;
    theme: ThemeType;
}
export type ThemeType = "blue" | "cyan" | "blue" | "gold" | "gray" |
    "green" | "multi" | "multi-ordered" | "multi-unordered" |
    "orange" | "purple";


export abstract class BaseChart extends React.Component<ChartProps, any> {

    constructor(props) {
        super(props);
        console.log("Reeived props:" + props);
        console.log(props);
    }


}
