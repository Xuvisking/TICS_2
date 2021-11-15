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

function AddGuardia() {

  const [checked, setChecked] = React.useState(false);
 
  const handleChange = () => {
    setChecked(!checked);
  };
  

  // Alarmas
  const [alarmas, setAlarmas] = useState([]);
  let api = true;
  const fetchAlarmas = () => {
    if (api) {
      console.log('consultando api en vista alarmas...');
      let request = new Request('http://20.121.32.18:4000/getAlarmas', {
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

  const [datos, setDatos] = useState({
    idguardia: '',
    email:'',
    tipo: '',
    nombre: '',
    rut: '',
    password: '',
  });
  const {idguardia, email, tipo, nombre, rut, password} = datos;

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };
  const [text, setText] = React.useState('');
  const enviarDatos = async e => {
    e.preventDefault();
    if (idguardia === '') {
      console.log('id vacio');
      return swal("Error!", 'El campo Identificación no debe estar vacio', "error");
    }
    try {
      const  data  = await clienteAxios.post('/guardia/nuevo', datos, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      });
      if (data.ok) {
        swal("Perfecto!", data.msg, "success");
      }
      setDatos({
        idguardia: '',
        email: '',
        tipo: '',
        nombre: '',
        rut: '',
        password: '',
      });
    } catch (error) {
      swal("Error!", 'No ha sido posible ingresar al Guardia, pruebe cambiando la Identificación', "error");
      console.log('No ha sido posible ingresar al Guardia, pruebe cambiando la Identificación');
    }
  };

  return (
    <>
      <div className="content">
        <Form onSubmit={enviarDatos}>
          <Row>
            <Col md="12">
              <h4 className="title"><i className="fas fa-user"></i> ID GUARDIA: {id}</h4>
              <Card>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Identificación</label>
                        <Input
                          placeholder="ID"
                          type="text"
                          name="idguardia"
                          value={idguardia}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                    
                      class="card">
                     <div class="card-body">
                       <div class="form-check form-check-radio">
                           <label for="Guardia" class="form-check-label">
                               <input class="form-check-input" type="radio" name="tipo" id="Guardia" value= {tipo} onChange={handleInputChange} checked />
                               Guardia
                               <span class="form-check-sign" ></span>
                           </label>
                       </div>
                       <div class="form-check form-check-radio">
                           <label for="Administrador" class="form-check-label">
                               <input class="form-check-input" type="radio" name="tipo" id="Administrador"  value= {tipo} onChange={handleInputChange} />
                               Administrador
                               <span class="form-check-sign" ></span>
                           </label>
                       </div>
                     </div>
                     </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Nombre</label>
                        <Input
                          placeholder="Nombre Guardia"
                          type="text"
                          name="nombre"
                          value={nombre}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>RUN</label>
                        <Input
                          placeholder="RUN (sin puntos ni guión)"
                          type="text"
                          name="rut"
                          value={rut}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Contraseña</label>
                        <Input
                          placeholder="Contraseña"
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          placeholder="Email@mail.com"
                          type="text"
                          name="email"
                          value={email}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Crear
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

export default AddGuardia;
