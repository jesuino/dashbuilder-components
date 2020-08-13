import React from "react";
import {
  Page,
  PageSection,
  Flex,
  FlexItem,
  Title,
  Card,
  CardHeader,
  CardBody,
} from "@patternfly/react-core";
import { ChartDonut } from "@patternfly/react-charts";

export interface ChartProps {
  Title?: string
}

interface State {
  Title?: string
}
export class ChartRow extends React.Component<ChartProps, State> {
  render() {
    return (
      <Page>
        <PageSection>
          <Card>
            <CardHeader>
              <Title headingLevel="h3" size="lg">
                {this.props.Title || "Processes"}
              </Title>
            </CardHeader>
            <CardBody>
              <Flex>
                <FlexItem>
                  <div style={{ height: "100px", width: "100px" }}>
                    <ChartDonut
                      ariaDesc="Active processes"
                      ariaTitle="Active processes"
                      constrainToVisibleArea={true}
                      data={[
                        { x: "travel", y: 35 },
                        { x: "hotelbooking", y: 55 },
                      ]}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                      padding={{
                        bottom: 0,
                        left: 0,
                        right: 0, 
                        top: 0,
                      }}
                      subTitle={"Active"}
                      title={"90"}
                      width={350}
                    />
                  </div>
                </FlexItem>

                <FlexItem>
                  <div style={{ height: "100px", width: "100px" }}>
                    <ChartDonut
                      ariaDesc="Completed processes"
                      ariaTitle="Completed processes"
                      constrainToVisibleArea={true}
                      data={[
                        { x: "travel", y: 514 },
                        { x: "visaApplications", y: 10 },
                        { x: "hotelbooking", y: 238 },
                      ]}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                      padding={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                      }}
                      subTitle={"Completed"}
                      title={"762"}
                      width={350}
                    />
                  </div>
                </FlexItem>
                <FlexItem>
                  <div style={{ height: "100px", width: "100px" }}>
                    <ChartDonut
                      ariaDesc="Aborted processes"
                      ariaTitle="Aborted processes"
                      constrainToVisibleArea={true}
                      data={[
                        { x: "travel", y: 4 },
                        { x: "visaApplications", y: 0 },
                        { x: "hotelbooking", y: 3 },
                      ]}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                      padding={{
                        bottom: 0,
                        left: 0,
                        right: 0, 
                        top: 0,
                      }}
                      subTitle={"Aborted"}
                      title={"7"}
                      width={350}
                    />
                  </div>
                </FlexItem>
                <FlexItem>
                  <div style={{ height: "100px", width: "100px" }}>
                    <ChartDonut
                      ariaDesc="Suspended processes"
                      ariaTitle="Suspended processes"
                      constrainToVisibleArea={true}
                      data={[
                        { x: "travel", y: 14 },
                        { x: "visaApplications", y: 30 },
                        { x: "hotelbooking", y: 23 },
                      ]}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                      padding={{
                        bottom: 0,
                        left: 0,
                        right: 0, 
                        top: 0,
                      }}
                      subTitle={"Suspended"}
                      title={"67"}
                      width={350}
                    />
                  </div>
                </FlexItem>
                <FlexItem>
                  <div style={{ height: "100px", width: "100px" }}>
                    <ChartDonut
                      ariaDesc="Error processes"
                      ariaTitle="Error processes"
                      constrainToVisibleArea={true}
                      data={[
                        { x: "travel", y: 1 },
                        { x: "visaApplications", y: 10 },
                        { x: "hotelbooking", y: 0 },
                      ]}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                      padding={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                      }}
                      subTitle={"Error"}
                      title={"11"}
                      width={350}
                    />
                  </div>
                </FlexItem>
              </Flex>
            </CardBody>
          </Card>
        </PageSection>
      </Page>
    );
  }
}
