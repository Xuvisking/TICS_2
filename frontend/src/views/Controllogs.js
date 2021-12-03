import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col, Table } from "reactstrap";

import { ControllogsFila } from "./ControllogsFila";
import sound from '../audio/SonidoAlerta.mp3';

function Controllogs() {

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

  const [logs, setlogs] = useState([]);

  useEffect(() => {
    fetchlogs();
  }, []);

  const fetchlogs = () => {
    let request = new Request('http://localhost:4000/logs', {
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
        setlogs(data);
      })
      .catch(err => {
        console.error(err);
      })
  };

  if (logs === undefined) return <h1 className="my-4 text-center bg-blue">CARGANDO LOGS DE GUARDIAS, POR FAVOR ESPERE...</h1>;

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
                      <th>ID LOGS</th>
                      <th>ID GUARDIA</th>
                      <th>NOMBRE</th>
                      <th>FECHA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      logs.map(logs => (
                        <ControllogsFila
                          key={logs.idlogs}
                          logs={logs}
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

export default Controllogs;