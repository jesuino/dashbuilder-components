import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChartContainer } from "./ChartContainer";
import { ComponentDev } from "@dashbuilder-js/component-dev";
import { ComponentApi } from "@dashbuilder-js/component-api";
import "@patternfly/react-core/dist/styles/base.css";
import "./index.css";

const api = new ComponentApi();

ReactDOM.render(<ChartContainer controller={api.getComponentController()} />, document.getElementById("app")!);

new ComponentDev().start();