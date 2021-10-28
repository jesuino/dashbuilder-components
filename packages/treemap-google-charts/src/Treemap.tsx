/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import Chart from "react-google-charts";

export interface TreemapProps {
  data: any;
  title: string;
  titletextcolor: string;
  titlefontname: string;
  titlefontsize: number;
  titlebold: boolean;
  titleitalic: boolean;
  maxDepth: number;
  maxPostDepth: number;
  minHighlightColor: string;
  midHighlightColor: string;
  maxHighlightColor: string;
  minColor: string;
  midColor: string;
  maxColor: string;
  textcolor: string;
  fontname: string;
  fontsize: number;
  bold: boolean;
  italic: boolean;
  headerHeight: number;
  showScale: boolean;
  useWeightedAverageForAggregation: boolean;
  showTooltips: boolean;
}

export function Treemap(props: TreemapProps) {
  return (
    <div className="App">
      <Chart
        chartType="TreeMap"
        width={"100%"}
        height={"100%"}
        data={props.data}
        options={{
          title: props.title,
          showTooltips: props.showTooltips,
          titleTextStyle: {
            color: props.titletextcolor,
            fontName: props.titlefontname,
            fontSize: props.titlefontsize,
            bold: props.titlebold,
            italic: props.titleitalic
          },
          maxDepth: props.maxDepth,
          maxPostDepth: props.maxPostDepth,
          minHighlightColor: props.minHighlightColor,
          midHighlightColor: props.midHighlightColor,
          maxHighlightColor: props.maxHighlightColor,
          minColor: props.minColor,
          midColor: props.midColor,
          maxColor: props.maxColor,
          textStyle: {
            color: props.textcolor,
            fontName: props.fontname,
            fontSize: props.fontsize,
            bold: props.bold,
            italic: props.italic
          },
          headerHeight: props.headerHeight,
          showScale: props.showScale,
          height: 500,
          useWeightedAverageForAggregation: props.useWeightedAverageForAggregation,
          generateTooltip: (row: any, size: any, value: any) => {
            return (
              '<div style="background:#fd9; padding:10px; border-style:solid"> row: ' +
              row +
              " size: " +
              size +
              " val: " +
              value +
              "</div>"
            );
          }
        }}
      />
    </div>
  );
}
