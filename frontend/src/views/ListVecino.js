import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";

// reactstrap components
import {
  Table,
} from "reactstrap";

import { ListVecinoFila } from "./ListVecinoFila";
import sound from '../audio/SonidoAlerta.mp3';

function ListVecino() {

  // Alarmas
  const [alarmas, setAlarmas] = useState([]);
  let api = true;
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
  useEffect(() => {
    setInterval(() => {
      fetchAlarmas();
    }, 3000);
    return () => api = false;
  }, []);
  useEffect(() => {
    setInterval(() => {
      fetchAlarmas();
    }, 3000);
    return () => api = false;
  }, []);

  const { id } = useSelector(state => state.auth);

  const [vecinos, setVecinos] = useState([]);

  // Consulta a la API
  useEffect(() => {
    fetchVecinos();
  }, []);

  const fetchVecinos = () => {
    console.log('consultando vecinos...');
    let request = new Request('http://20.121.32.18:4000/vecino/all', {
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
        setVecinos(data);
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

  if (vecinos === undefined) return <h1 className="my-4 text-center bg-blue">CARGANDO VECINOS, POR FAVOR ESPERE...</h1>;

  return (
    <>
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

                <Table className="tablesorter table-responsive">
                  <thead className="text-primary">
                    <tr>
                      <th>ID VECINO</th>
                      <th>DIRECCIÓN</th>

                      <th>TELEFONO VECINO</th>
                      <th>ESTADO</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      vecinos.map(vecino => (
                        <ListVecinoFila
                          key={vecino.idvecino}
                          vecino={vecino}
                          fetchVecinos={fetchVecinos}
                          setVecinos={setVecinos}
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

export default ListVecino;