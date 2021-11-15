import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Col,
} from "reactstrap";

function Escolta() {

  

  return (
    <>
      <div className="content">
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Solicitudes de Escolta</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
      </div>
    </>
  );
}

export default Escolta;
