import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col, Table } from "reactstrap";

import { HistEscoltaFila } from "./HistEscoltaFila";
import sound from '../audio/SonidoAlerta.mp3';

function HistEscolta() {

  // Alarmas y escoltas
  const [histEscolta, setHistEscolta] = useState([]);
  const [alarmas, setAlarmas] = useState([]);
  let api = true;
  
  const { id } = useSelector(state => state.auth);

  // Consulta a la API cada 3 segundos
  useEffect(() => {
    setInterval(() => {
      fetchAlarmas();
      fetchHistEscolta();
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
  const fetchHistEscolta = () => {
    if (api) {
      console.log('consultando api en vista escoltas...');
      let request = new Request('http://20.121.32.18:4000/getHistEscoltas/', {
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
          setHistEscolta(data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  };

  if (histEscolta === undefined) return <h1 className="my-4 text-center bg-blue">CARGANDO HISTORIAL DE ESCOLTAS, POR FAVOR ESPERE...</h1>;

  return (
    <React.Fragment key={id}>
                  {
        (alarmas.length !== 0)
          ? <audio src={sound} autoPlay loop></audio>
          : null
      }
                            {
                  (alarmas.length !== 0)
                    ? <div className="alert alert-danger text-center" role="alert">
                      USTED CONTIENE ALARMAS NUEVAS
                    </div>
                    : null
                }
      <div className="content">
        <Row>
          <Col md="12">
            <h4 className="title"><i className="fas fa-user"></i> ID GUARDIA: {id}</h4>
            <Card>
              <CardBody>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>ID ESCOLTA</th>
                      <th>ID VECINO</th>
                      <th>ID GUARDIA</th>
                      <th>FECHA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      histEscolta.map(escoltas => (
                        <HistEscoltaFila
                          key={escoltas.idescolta}
                          escoltas={escoltas}
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
    </React.Fragment>
  );
}

export default HistEscolta;