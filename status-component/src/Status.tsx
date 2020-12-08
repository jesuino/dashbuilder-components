import * as React from "react";
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
import {
  CheckCircleIcon,
  ErrorCircleOIcon,
  DisconnectedIcon,
} from "@patternfly/react-icons";

export function Status() {
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
    </Page>
  );
}
