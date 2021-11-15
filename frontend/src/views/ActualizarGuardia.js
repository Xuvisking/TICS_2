/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

import swal from 'sweetalert';
import { clienteAxios } from "helpers/axios";

const ActualizarGuardia = (props) => {

  //hook Guardia, para actualizar datos
  const [datos, setDatos] = useState({
    idguardia: props.info.idguardia,
    nombre: props.info.name_guard,
    email: props.info.email,
    rut: props.info.rut,
    tipo: props.info.tipo,
  });
  //clase datos para recopilar datos del vecino
  const { idguardia, nombre, email, rut, tipo} = datos;

  //actualizar datos cuando se inserta informacion en el formulario
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  //envia los datos a la api con axios.
  const enviarDatos = async e => {
    e.preventDefault();
    try {
      const { data } = await clienteAxios.post('/guardia/actualizar', datos, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      });
      if (data.ok) {
        swal("Perfecto!", 'Se ha modificado exitosamente', "success");
        setModal(false);
        props.setGuardia(props.fetchGuardia())
      }
    } catch (error) {
      swal("Error!", 'Algo ha ocurrido', "error");
    }
    // const { data } = await clienteAxios.post('localhost:4000/api/vecino/ActualizarVecino', datos);
    // if (data.ok) {
    //   swal("Perfecto!", 'El vecino ha sido Actualizado!', "success");
    // }
  };

  // cosas del modal
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>Actualizar</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Actualizar Guardia</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form onSubmit={enviarDatos}>
                <FormGroup>
                  <Label for="exampleEmail1">ID</Label>
                  <Input type="text" name="id" value={idguardia} onChange={handleInputChange} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail2">Nombre</Label>
                  <Input type="text" name="nombre" value={nombre} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail3">Email</Label>
                  <Input type="text" name="email" value={email} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail4">RUN</Label>
                  <Input type="text" name="rut" value={rut} onChange={handleInputChange} />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={enviarDatos}>Actualizar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ActualizarGuardia;