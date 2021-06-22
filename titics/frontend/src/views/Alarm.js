import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
// reactstrap components
import {
  Table,
} from "reactstrap";

import { AlarmFila } from "./AlarmFila";

function Alarm(props) {

  // Alarmas
  const [alarmas, setAlarmas] = useState([]);
  let api = true;
  
  const { id } = useSelector(state => state.auth);

  // Consulta a la API cada 3 segundos
  useEffect(() => {
    setInterval(() => {
      fetchAlarmas();
    }, 2000);
    return () => api = false;
  }, []);

  const fetchAlarmas = () => {
    if (api) {
      console.log('consultando api en vista alarmas...');
      let request = new Request('http://localhost:4000/api/alarma/getAlarmas', {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      });
      fetch(request)
        .then(response => response.json())
        .then(dataJSON => {
          const { data } = dataJSON;
          setAlarmas(data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <h4 className="title"><i className="fas fa-user"></i> ID GUARDIA: {id}</h4>
            <Card>
              <CardBody>
                {/* <button
                  type="button"
                  className="btn btn-success btn-lg btn-block mb-3"
                  onClick={fetchAlarmas}
                >
                  RECARGAR ALARMAS
                </button> */}
                {
                  (alarmas === undefined || alarmas.length === 0)
                    ? <div className="alert alert-info text-center" role="alert">
                      VERIFICANDO ALARMAS
                    </div>
                    : null
                }
                {
                  (alarmas.length !== 0)
                    ?
                    (
                      <>
                        <Table className="tablesorter table-responsive">
                          <thead className="text-primary">
                            <tr>
                              <th>ID ALARMA</th>
                              <th>ID VECINO</th>
                              <th>ID GUARDIA</th>
                              <th>DIRECCIÓN</th>
                              <th>NOMBRE CONTACTO 1</th>
                              <th>NUMERO CONTACTO 1</th>
                              <th>NOMBRE CONTACTO 2</th>
                              <th>NUMERO CONTACTO 2</th>
                              <th>FECHA</th>
                              <th>ESTADO</th>
                              <th className="text-center">ACCIONES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              alarmas.map(alarma => (
                                <AlarmFila
                                  key={alarma.id_alarm}
                                  alarma={alarma}
                                  fetchAlarmas={fetchAlarmas}
                                />
                              ))
                            }
                          </tbody>
                        </Table>
                      </>
                    )
                    :
                    null
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Alarm;