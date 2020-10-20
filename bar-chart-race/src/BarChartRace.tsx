import React from "react";
import BarChart from "chart-race-react";

export interface BarChartRaceProps {
  titleenabled: boolean;
  title: string;
  data: Map<string, Array<string>>;
  timeline: string[];
}

export interface BarChartRaceState {
}
const colorsrange=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"];

function len(data: Object) {
  return Object.keys(data).length;
}

function colors(data: Object) {
  let i=0;
  return Object.keys(data).reduce(
    (res, item) => ({
      ...res,
      ...{ [item]: colorsrange[i++ % colorsrange.length] },
    }),
    {}
  );
}

function labels(data: Object) {
  return Object.keys(data).reduce((res, item, idx) => {
    return {
      ...res,
      ...{
        [item]: (
          <div style={{ textAlign: "center" }}>
            <div>{item}</div>
          </div>
        ),
      },
    };
  }, {});
}

export class BarChartRace extends React.Component<BarChartRaceProps,BarChartRaceState> {
  constructor(props: BarChartRaceProps) {
    super(props);
  }
  renderTitle() {
    if (this.props.titleenabled === true) {
      return <h2 style={{ textAlign: "center" }}>{this.props.title}</h2>;
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          {this.renderTitle()}
          <BarChart
            start={true}
            data={this.props.data}
            timeline={this.props.timeline}
            labels={labels(this.props.data)}
            colors={colors(this.props.data)}
            len={len(this.props.data)}
            timeout={400}
            delay={100}
            timelineStyle={{
              textAlign: "center",
              fontSize: "20px",
              color: "rgb(148, 148, 148)",
              marginBottom: "50px",
            }}
            textBoxStyle={{
              textAlign: "right",
              color: "rgb(133, 131, 131)",
              fontSize: "30px",
            }}
            barStyle={{
              height: "60px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
            width={[15, 75, 10]}
            maxItems={len(this.props.data)}
          />
        </div>
      </div>
    );
  }
}
