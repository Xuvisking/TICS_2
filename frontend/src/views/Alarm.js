import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
// reactstrap components
import {
  Table,
} from "reactstrap";

import { AlarmFila } from "./AlarmFila";
import { EscoltaFila } from "./EscoltaFila";
import sound from '../audio/SonidoAlerta.mp3';

function Alarm(props) {

  // Alarmas
  const [alarmas, setAlarmas] = useState([]);
  const [escoltas, setEscoltas] = useState([]);
  let api = true;
  
  const { id } = useSelector(state => state.auth);

  // Consulta a la API cada 3 segundos
  useEffect(() => {
    setInterval(() => {
      fetchEscoltas();
      fetchAlarmas();
    }, 2000);
    return () => api = false;
  }, []);

  const fetchAlarmas = () => {
    if (api) {
      console.log('consultando api en vista alarmas...');
      let request = new Request('http://20.121.32.18:4000/getAlarmas/', {
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
          const  data  = dataJSON.rows.rows;
		  //console.log(dataJSON.rows.rows);
          setAlarmas(data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  };

  const fetchEscoltas = () => {
    if (api) {
      console.log('consultando api en vista escoltas...');
      let request = new Request('http://20.121.32.18:4000/getEscoltas', {
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
          const  data  = dataJSON.rows.rows;
		      //console.log(dataJSON.rows.rows);
          setEscoltas(data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  };


  return (
    <React.Fragment key={id}>

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
                  RECARGAR ALARMAS / 
                </button> */
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
                              <th>TELEFONO</th>
                              <th>FECHA</th>
                              <th>ESTADO</th>
                              <th>¿CONFIRMAR ALARMA?</th>
                              <th>¿TERMINAR ALARMA?</th>
                              <th className="text-center">HITOS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              alarmas.map(alarma => (
                                <AlarmFila
                                  key={alarma.idalarma}
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
      <div className="content">
        <Row>
          <Col md="12">
            <h4 className="title"><i className="fas fa-user"></i> ID GUARDIA: {id}</h4>
            <Card>
              <CardBody>
                {
                  (escoltas === undefined || escoltas.length === 0 )
                    ? <div className="alert alert-info text-center" role="alert">
                      VERIFICANDO ESCOLTAS
                    </div>
                    : null
                }
                {
                  (escoltas.length !== 0)
                    ?
                    (
                      <>
                        <Table className="tablesorter table-responsive">
                          <thead className="text-primary">
                            <tr>
                              <th>ID ESCOLTA</th>
                              <th>ID VECINO</th>
                              <th>ID GUARDIA</th>
                              <th>TELEFONO</th>
                              <th>FECHA</th>
                              <th>ESTADO</th>
                              <th>¿CONFIRMAR ESCOLTA?</th>
                              <th>¿TERMINAR ESCOLTA?</th>
                              <th className="text-center">COMENTARIO</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              escoltas.map(escoltas => (
                                <EscoltaFila
                                  key={escoltas.idescolta}
                                  escoltas={escoltas}
                                  fetchEscoltas={fetchEscoltas}
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
    </React.Fragment>
    
  );
}

export default Alarm;