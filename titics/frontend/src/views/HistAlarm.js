import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col, Table } from "reactstrap";

import { HistAlarmFila } from "./HistAlarmFila";
import sound from '../audio/SonidoAlerta.mp3';

function HistAlarm() {

  // Alarmas
  const [alarmas, setAlarmas] = useState([]);
  let api = true;
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
  useEffect(() => {
    setInterval(() => {
      fetchAlarmas();
    }, 3000);
    return () => api = false;
  }, []);

  const { id } = useSelector(state => state.auth);

  const [histAlarm, setHistAlarm] = useState([]);

  useEffect(() => {
    fetchHistAlarmas();
  }, []);

  const fetchHistAlarmas = () => {
    let request = new Request('http://localhost:4000/api/alarma/getHistAlarm', {
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
        setHistAlarm(data);
      })
      .catch(err => {
        console.error(err);
      })
  };

  if (histAlarm === undefined) return <h1 className="my-4 text-center bg-blue">CARGANDO HISTORIAL DE ALARMAS, POR FAVOR ESPERE...</h1>;

  return (
    <>
      {
        (alarmas === undefined || alarmas.length !== 0)
          ? <audio src={sound} autoPlay loop></audio>
          : null
      }
      <div className="content">
        <Row>
          <Col md="12">
            <h4 className="title"><i className="fas fa-user"></i> ID GUARDIA: {id}</h4>
            <Card>
              <CardBody>
                {
                  (alarmas.length !== 0)
                    ? <div className="alert alert-danger text-center" role="alert">
                      USTED CONTIENE ALARMAS NUEVAS
                    </div>
                    : null
                }
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>ID ALARMA</th>
                      <th>ID VECINO</th>
                      <th>ID GUARDIA</th>
                      <th>DIRECCIÓN</th>
                      <th>FECHA</th>
                      <th>COMENTARIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      histAlarm.map(alarma => (
                        <HistAlarmFila
                          key={alarma.id_alarm}
                          alarma={alarma}
                        />
                      ))
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HistAlarm;