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
import {
  CheckCircleIcon,
  ErrorCircleOIcon,
  DisconnectedIcon,
} from "@patternfly/react-icons";

var Component = React.Component;
export class ChartRow extends Component {
  render() {
    return (
      <Page>
        <PageSection>
          <Card>
            <CardHeader>
              <Title headingLevel="h3" size="lg">
                Status
              </Title>
            </CardHeader>
            <CardBody>
              <Flex>
                <FlexItem>
                  <div>
                    <Flex>
                      <FlexItem>
                        <CheckCircleIcon color="green" />
                      </FlexItem>
                      <FlexItem>
                        Data Index<div>healthy</div>
                      </FlexItem>
                    </Flex>
                  </div>
                </FlexItem>
                <FlexItem>
                  <div>
                    <Flex>
                      <FlexItem>
                        <ErrorCircleOIcon color="red" />
                      </FlexItem>
                      <FlexItem>
                        Job Service<div>in error</div>
                      </FlexItem>
                    </Flex>
                  </div>
                </FlexItem>
                <FlexItem>
                  <div>
                    <Flex>
                      <FlexItem>
                        <DisconnectedIcon color="gray" />
                      </FlexItem>
                      <FlexItem>
                        Data Index<div>disconnected</div>
                      </FlexItem>
                    </Flex>
                  </div>
                </FlexItem>
              </Flex>
            </CardBody>
          </Card>
        </PageSection>
        <PageSection>
          <Card>
            <CardHeader>
              <Title headingLevel="h3" size="lg">
                Processes
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
                      // legendData={[
                      //   { name: 'travel: 35' },
                      //   { name: 'hotelbooking: 55' }
                      // ]}
                      // legendOrientation="vertical"
                      // legendPosition="right"
                      padding={{
                        bottom: 0,
                        left: 0,
                        right: 0, // Adjusted to accommodate legend
                        top: 0,
                      }}
                      title="90"
                      subTitle="Active"
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
                      title="762"
                      subTitle="Completed"
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
                      title="7"
                      subTitle="Aborted"
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
                      title="67"
                      subTitle="Suspended"
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
                      title="11"
                      subTitle="Error"
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
