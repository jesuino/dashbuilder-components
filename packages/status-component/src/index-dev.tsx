import * as React from "react";
import * as ReactDOM from "react-dom";
import { Status } from "./Status";
import { ComponentDev } from "@dashbuilder-js/component-dev";
import { ComponentApi } from "@dashbuilder-js/component-api";

const api = new ComponentApi();

ReactDOM.render(<Status />, document.getElementById("app")!);

new ComponentDev().start();