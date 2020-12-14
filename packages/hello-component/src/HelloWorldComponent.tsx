/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
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
import { ComponentController, DataSet } from "@dashbuilder-js/component-api";
import { useState, useEffect } from "react";

const NAME_PROP = "name";
const DEFAULT_NAME = "World";

interface Props {
  controller: ComponentController;
}
export function HelloWorldComponent(props: Props) {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [dataset, setDataset] = useState<DataSet>();

  useEffect(() => {
    props.controller.setOnInit((params: Map<string, any>) => {
      setName(params.get(NAME_PROP) || DEFAULT_NAME);
    });
    props.controller.setOnDataSet((_dataset: DataSet) => {
      setDataset(_dataset);
    });
  }, [props.controller]);

  return (
    <>
      <h2>Hello {name}!</h2>
      {dataset && (
        <div>
          <h4>Dataset</h4>
          <table>
            <thead>
              <tr>
                {dataset.columns.map(c => (
                  <th>{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataset.data.map((row, i) => (
                <tr key={i}>
                  {row.map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
