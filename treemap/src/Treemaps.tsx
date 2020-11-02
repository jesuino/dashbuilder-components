import React, { PureComponent } from "react";
import { Treemap } from "recharts";
import { data } from "./Data";

export class Treemaps extends PureComponent {
  render() {
    return (
      <div className="App">
        <Treemap
          width={400}
          height={200}
          data={data}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        />
      </div>
    );
  }
}

export default Treemaps;
