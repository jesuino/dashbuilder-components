import React from "react";
import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { DonutChart } from "./DonutChart";
import { PieChart } from "./PieChart";
import { StackChart } from "./StackChart";
import { PaddingProps, AnimationEasing } from "victory-core";
import {
  ThemeType,
  DataSet,
  ChartType,
  LegendPosition,
  Grid,
  AnimationProp,
} from "./BaseChart";
import { ValidationResult, validateDataSetForChart } from "./PropsValidation";
import { UtilizationDonut } from "./UtilizationDonut";

interface Props {}

interface Params {
  chartType: ChartType;
  theme: ThemeType;
}

const DEFAULT_DATASET: DataSet = {
  columns: [
    { name: "Animal", type: "TEXT", settings: { columnName: "New" } },
    { name: "2017", type: "NUMBER", settings: { columnName: "New" } },
    { name: "2018", type: "NUMBER", settings: { columnName: "New" } },
    { name: "2019", type: "NUMBER", settings: { columnName: "New" } },
    { name: "2020", type: "NUMBER", settings: { columnName: "New" } },
  ],
  data: [
    ["Pigs", "3", "7", "2", "9"],
    ["Dogs", "6", "3", "2", "7"],
    ["Sheeps", "5", "1", "2", "1"],
    ["Horses", "6", "2", "2", "3"],
    ["Cows", "1", "2", "4", "8"],
    ["Cats", "1", "2", "2", "4"],
  ],
};

interface State {
  width: number;
  height: number;
  type: ChartType;
  theme: ThemeType;
  validation: ValidationResult;
  dataSet: DataSet;
  legendPosition: LegendPosition;
  animation: AnimationProp;
  ariaTitle: string;
  ariaDescription: string;
  padding: PaddingProps;
  zoom: boolean;
  grid: Grid;
  donutTitle?: string;
  donutSubTitle?: string;
}

export class ChartContainer extends React.Component<Props, State> {
  containerRef: React.RefObject<any>;
  handleResize: () => void;
  selectChart: (type: ChartType) => JSX.Element;
  receiveEvent: (event: any) => void;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      width: 600,
      height: 300,
      type: "stack",
      theme: "multi-ordered",
      validation: { isValid: true },
      dataSet: DEFAULT_DATASET,
      legendPosition: "bottom",
      animation: {
        enabled: false,
      },
      ariaTitle: "Chart Title",
      ariaDescription: "Chart Description",
      zoom: false,
      padding: { bottom: 20, left: 0, right: 0, top: 0 },
      grid: { x: true, y: false },
    };

    this.handleResize = () => {
      if (this.containerRef.current && this.containerRef.current.clientWidth) {
        this.setState({ width: this.containerRef.current.clientWidth });
      }
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const dataSet = params.get("dataSet") as DataSet;
      const chartType = (params.get("chartType") as unknown) as ChartType;
      const validation = validateDataSetForChart(chartType, dataSet);

      const paddingBottom = params.get("paddingBottom") || "0";
      const paddingRight = params.get("paddingRight") || "0";
      const paddingLeft = params.get("paddingLeft") || "0";
      const paddingTop = params.get("paddingTop") || "0";

      const gridx = (params.get("gridx") as unknown) === "true";
      const gridy = (params.get("gridy") as unknown) === "true";

      const animation = (params.get("animate") as unknown) == "true";
      const animationProp: AnimationProp = {
        enabled: animation,
      };
      if (animation) {
        animationProp.duration = +(params.get("animationDuration") || "0");
        animationProp.easing = (params.get("animationEasing") ||
          "linear") as AnimationEasing;
      }

      const grid: Grid = {
        x: gridx,
        y: gridy,
      };

      const padding: PaddingProps = {
        bottom: +paddingBottom,
        right: +paddingRight,
        left: +paddingLeft,
        top: +paddingTop,
      };

      this.setState({
        type:
          ((params.get("chartType") as unknown) as ChartType) ||
          this.state.type,
        theme:
          ((params.get("theme") as unknown) as ThemeType) || this.state.theme,
        dataSet:
          ((params.get("dataSet") as unknown) as DataSet) || this.state.dataSet,
        legendPosition:
          ((params.get("legendPosition") as unknown) as LegendPosition) ||
          this.state.legendPosition,
        animation: animationProp,
        ariaTitle: (params.get("ariaTitle") as unknown) as string,
        ariaDescription: (params.get("ariaDescription") as unknown) as string,
        padding: padding,
        zoom: (params.get("zoom") as unknown) === "true",
        grid: grid,
        validation: validation,
        donutTitle: params.get("donutTitle") as any,
        donutSubTitle: params.get("donutSubTitle") as any,
      });
    };

    this.selectChart = (type: ChartType) => {
      switch (type) {
        case "area":
          return <AreaChart {...this.state} />;
        case "bar":
          return <BarChart {...this.state} />;
        case "line":
          return <LineChart {...this.state} />;
        case "donut":
          return <DonutChart {...this.state} />;
        case "pie":
          return <PieChart {...this.state} />;
        case "stack":
          return <StackChart {...this.state} />;
        case "utilization-donut":
          return <UtilizationDonut {...this.state} />;
      }
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("message", this.receiveEvent, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("message", this.receiveEvent, false);
  }

  render() {
    const { type, validation } = this.state;
    return (
      <div ref={this.containerRef} style={{ width: "auto", height: "auto" }}>
        {validation.isValid ? (
          this.selectChart(type)
        ) : (
          <em>{validation.message}</em>
        )}
      </div>
    );
  }
}
