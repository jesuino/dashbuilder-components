import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartContainer } from "./ChartContainer";
import  {ComponentApi} from "@dashbuilder-js/component-api";

const api = new ComponentApi();

ReactDOM.render(<ChartContainer controller={api.getComponentController()} />, document.getElementById("root")!);