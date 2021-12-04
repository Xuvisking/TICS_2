import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col, Table } from "reactstrap";

import { HistAlarmFila } from "./HistAlarmFila";
import sound from '../audio/SonidoAlerta.mp3';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function HistAlarm() {

  // Alarmas
  const [histAlarm, setHistAlarm] = useState([]);
  const [alarmas, setAlarmas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let api = true;
  
  const { id } = useSelector(state => state.auth);

  // Consulta a la API cada 3 segundos
  useEffect(() => {
    setInterval(() => {
      fetchAlarmas();
      fetchHistAlarm();
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
  const fetchHistAlarm = () => {
    if (api) {
      console.log('consultando api en vista alarmas...');
      let request = new Request('http://20.121.32.18:4000/getHistAlarm/', {
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
          setHistAlarm(data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  };
  

  if (histAlarm === undefined) return <h1 className="my-4 text-center bg-blue">CARGANDO HISTORIAL DE ALARMAS Y ESCOLTAS, POR FAVOR ESPERE...</h1>;

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
              <div align="center">
              <ReactHTMLTableToExcel
                id ="idexcel"
                className ="btn btn-success"
                table= "histalarmast"
                filename ="HistorialAlarmasExcel"
                sheet = "página 1"
                buttonText ="Exportar a Excel"
                />
              </div>
                <input type = "text" placeholder ="Buscar por ID Guardia o ID Vecino" className ="form-control" style={{marginTop:50, marginBottom:20, wdith:"40%"}}
                onChange = {(e)=> {
                  setSearchTerm(e.target.value);
                }} />
                <Table className="table tablesorter table-striped mydatatable" id = "histalarmast">
                  <thead className="text-primary">
                    <tr>
                      <th>ID ALARMA</th>
                      <th>ID VECINO</th>
                      <th>ID GUARDIA</th>
                      <th>FECHA</th>
                      <th>COMENTARIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      histAlarm.filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        }
                         else if (
                           val.vecino_idvecino.toLowerCase().includes(searchTerm.toLowerCase()) || val.guardia_idguardia.toLowerCase().includes(searchTerm.toLowerCase())
                         )
                         {
                           return val;
                         }
                         }).map(alarma => (
                        <HistAlarmFila
                          key={alarma.idalarma}
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
    </React.Fragment>
  );
}

export default HistAlarm;