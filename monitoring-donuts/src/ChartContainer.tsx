import React from "react";
import { ChartRow } from "./ChartRow";
var Component = React.Component;

export interface ChartProps {
  Title?: string;
}

interface State {
  Title?: string;
}

export class ChartContainer extends Component<ChartProps, State> {
  receiveEvent: (event: any) => void;

  constructor(props: ChartProps) {
    super(props);

    this.state = {
      Title: "Processes",
    };

    this.receiveEvent = (event: any) => {
      const params = event.data.properties as Map<string, object>;
      const Title = params.get("Title");

      this.setState({
        Title: params.get("Title") as any,
      });
    };
  }
  componentDidMount() {
    window.addEventListener("message", this.receiveEvent, false);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.receiveEvent, false);
  }
  render() {
    return (
      <div style={{ width: "auto", height: "auto" }}>
        <ChartRow
          Title={"Processes"}
          {...this.state}
        />
      </div>
    );
  }
}
