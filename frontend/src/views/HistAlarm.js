import React from "react";

import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function HistAlarm() {
  return (
  	<>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Historial de Alarmas</h5>
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HistAlarm;