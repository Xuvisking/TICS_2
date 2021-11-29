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

  const { id } = useSelector(state => state.auth);

  const [datos, setDatos] = useState({
    idvecino: '',
    direccion: '',
    estado: '',
    telefono: '',
    password: '',
  });
  const { idvecino, direccion, estado, telefono, password} = datos;

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const enviarDatos = async e => {
    e.preventDefault();
    if (idvecino === '') {
      console.log('id vacio');
      return swal("Error!", 'El campo Identificación no debe estar vacio', "error");
    }
    try {
      const { data } = await clienteAxios.post('/vecino/nuevo', datos, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      });
      if (data.ok) {
        swal("Perfecto!", data.msg, "success");
      }
      setDatos({
        idvecino: '',
        direccion: '',
        password: '',
        estado: '',
      });
    } catch (error) {
      swal("Error!", 'No ha sido posible ingresar al vecino, pruebe cambiando la Identificación', "error");
      console.log('No ha sido posible ingresar al vecino, pruebe cambiando la Identificación');
    }
  };
  console.log(alarmas.length);
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
        <Form onSubmit={enviarDatos}>
          <Row>
            <Col md="12">
              <h4 className="title"><i className="fas fa-user"></i> ID GUARDIA: {id}</h4>
              <Card>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="1">
                      <FormGroup>
                        <label>Identificación</label>
                        <Input
                          placeholder="ID"
                          type="text"
                          name="idvecino"
                          value={idvecino}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
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
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Contraseña</label>
                        <Input
                          placeholder="Contraseña"
                          type="text"
                          name="password"
                          value={password}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Teléfono</label>
                        <Input
                          placeholder="Teléfono"
                          type="text"
                          name="telefono"
                          value={telefono}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Agregar
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
