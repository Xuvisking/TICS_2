import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";

// reactstrap components
import {
  Table,
} from "reactstrap";

import { ListGuardiaFila } from "./ListGuardiaFila";
import sound from '../audio/SonidoAlerta.mp3';
import { data } from "jquery";

function ListGuardia() {

  // Alarmas
  const [alarmas, setAlarmas] = useState([]);
  let api = true;
  const fetchAlarmas = () => {
    if (api) {
      console.log('consultando api en vista alarmas...');
      let request = new Request('http://localhost:4000/getAlarmas', {
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
          const  data  = dataJSON;
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

  const [guardia, setGuardia] = useState([]);

  // Consulta a la API
  useEffect(() => {
    fetchGuardia();
  }, []);

  const fetchGuardia = () => {
    console.log('consultando guardias...');
    let request = new Request('http://localhost:4000/guardia/all', {
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
        //console.log(dataJSON.rows.rows)
        setGuardia(data);
      })
      .catch(err => {
        console.error(err);
      })
  };

  // console.log(id_veci);
  // const { data } = await clienteAxios.post('/api/vecino/crearVecino', {}, {
  //   headers: {
  //     'x-token': localStorage.getItem('token') || ''
  //   }
  // });
  // if (data.ok) {
  //   swal("Perfecto!", 'El vecino ha sido eliminado', "success");
  // }
    //table-responsive para la linea 111
  if (guardia === undefined) return <h1 className="my-4 text-center bg-blue">CARGANDO GUARDIAS, POR FAVOR ESPERE...</h1>;

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
                      <th>ID GUARDIA</th>
                      <th>NOMBRE</th>
                      <th>EMAIL</th>
                      <th>RUN</th>
                      <th>TIPO</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      guardia.map(guardia => (
                        <ListGuardiaFila
                          key={guardia.idguardia}
                          guardia={guardia}
                          fetchGuardia={fetchGuardia}
                          setGuardia={setGuardia}
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

export default ListGuardia;