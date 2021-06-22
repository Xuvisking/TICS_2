import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import swal from 'sweetalert';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import { clienteAxios } from "helpers/axios";
import sound from '../audio/SonidoAlerta.mp3';

function AddVecino() {

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

  const [datos, setDatos] = useState({
    id_veci: '',
    direccion: '',
    nombre_vecino: '',
    telefono_vecino: '',
    name_contact: '',
    numb_contact: '',
    name_contact2: '',
    numb_contact2: '',
  });
  const { id_veci, direccion, nombre_vecino, telefono_vecino, name_contact, numb_contact, name_contact2, numb_contact2 } = datos;

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const enviarDatos = async e => {
    e.preventDefault();
    if (id_veci === '') {
      console.log('id vacio');
      return swal("Error!", 'El campo Identificación no debe estar vacio', "error");
    }
    try {
      const { data } = await clienteAxios.post('/api/vecino/crearVecino', datos, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      });
      if (data.ok) {
        swal("Perfecto!", data.msg, "success");
      }
      setDatos({
        id_veci: '',
        nombre_vecino: '',
        telefono_vecino: '',
        direccion: '',
        name_contact: '',
        numb_contact: '',
        name_contact2: '',
        numb_contact2: '',
      });
    } catch (error) {
      swal("Error!", 'No ha sido posible ingresar al vecino, pruebe cambiando la Identificación', "error");
      console.log('No ha sido posible ingresar al vecino, pruebe cambiando la Identificación');
    }
  };

  return (
    <>
      {
        (alarmas === undefined || alarmas.length !== 0)
          ? <audio src={sound} autoPlay loop></audio>
          : null
      }
      <div className="content">
        <Form onSubmit={enviarDatos}>
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
                  <Row>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Identificación</label>
                        <Input
                          placeholder="ID"
                          type="text"
                          name="id_veci"
                          value={id_veci}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Nombre vecino</label>
                        <Input
                          placeholder="Nombre vecino"
                          type="text"
                          name="nombre_vecino"
                          value={nombre_vecino}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Telefono vecino</label>
                        <Input
                          placeholder="Telefono vecino"
                          type="text"
                          name="telefono_vecino"
                          value={telefono_vecino}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Dirección</label>
                        <Input
                          placeholder="Dirección"
                          type="text"
                          name="direccion"
                          value={direccion}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>Número Telefónico del Contacto 1</label>
                        <Input
                          placeholder="Número Telefónico"
                          type="text"
                          name="numb_contact"
                          value={numb_contact}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Nombre del Contacto</label>
                        <Input
                          placeholder="Nombre"
                          type="text"
                          name="name_contact"
                          value={name_contact}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>Número Telefónico del Contacto 2</label>
                        <Input
                          placeholder="Número Telefónico"
                          type="text"
                          name="numb_contact2"
                          value={numb_contact2}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Nombre del Contacto 2</label>
                        <Input
                          placeholder="Nombre"
                          type="text"
                          name="name_contact2"
                          value={name_contact2}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Enviar
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default AddVecino;
