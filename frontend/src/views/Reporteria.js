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

function Reporteria() {

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
        eleccion1: '',
        eleccion2: '',
  });
  const {eleccion1, eleccion2} = datos;

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const enviarDatos = async e => {
    e.preventDefault();
    if (id === '') {
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
        eleccion1: '',
        eleccion2: '',
      });
    } catch (error) {
      swal("Error!", 'No ha sido posible ingresar al Guardia, pruebe cambiando la Identificación', "error");
      console.log('No ha sido posible ingresar al Guardia, pruebe cambiando la Identificación');
    }
  };

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
                  <Col className="ml-auto mr-auto mt-5 text-center" md="5">
            <Card>
              <CardBody>
                <Row>
                <Col>
                <button class="btn btn-info animation-on-hover" type={eleccion1}>Alarmas</button>
                <button class="btn btn-success animation-on-hover" type={eleccion2}>Escoltas</button>
                </Col>
                </Row>
              </CardBody>
              <CardFooter>
              <button class="btn btn-default animation-on-hover" type="submit">Generar</button>
              </CardFooter>
            </Card>
          </Col>
                    
                  </Row>
                  
                  
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
} 
  

export default Reporteria;