import React from 'react';
import { AreaChart } from './AreaChart';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { DonutChart } from './DonutChart';
import { PieChart } from './PieChart';
import { StackChart } from './StackChart';
import { ThemeType } from './BaseChart';

interface Props {
}

// TODO: Support chart theme
type ChartType = "bar" | "area" | "line" | "donut" | "pie" | "stack";

interface Params {
  chartType: ChartType;
  theme: ThemeType,
  chartHeight: string;
  chartTitle: string;
}

interface State {
  width: number;
  height: number;
  type: ChartType;
  theme: ThemeType;
  chartTitle: string;
}

export class ChartDemo extends React.Component<Props, State>  {

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
      theme: 'multi-ordered',
      chartTitle: "string"
    };
    this.handleResize = () => {
      if (this.containerRef.current && this.containerRef.current.clientWidth) {
        this.setState({ width: this.containerRef.current.clientWidth });
      }
    };

    this.receiveEvent = (event: any) => {
      const params = event.data as Params;
      this.setState({
        type: params.chartType,
        height: +params.chartHeight,
        theme: params.theme,
        chartTitle: params.chartTitle
      });
    }
    this.selectChart = (type: ChartType,) => {
      const { width, height, theme } = this.state;
      switch (type) {
        case "area":
          return <AreaChart width={width} height={height} theme={theme} />
        case "bar":
          return <BarChart width={width} height={height} theme={theme} />;
        case "line":
          return <LineChart width={width} height={height} theme={theme} />;
        case "donut":
          return <DonutChart width={width} height={height} theme={theme} />;
        case "pie":
          return <PieChart width={width} height={height} theme={theme} />;
        case "stack":
          return <StackChart width={width} height={height} theme={theme} />;
      }
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('message', this.receiveEvent, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('message', this.receiveEvent, false);
  }



  render() {
    const { type, chartTitle } = this.state;
    return (
      <div ref={this.containerRef} style={{ width: 'auto', height: 'auto' }}>
        <p>{chartTitle}</p>
        {this.selectChart(type)}
      </div>
    );
  }
}