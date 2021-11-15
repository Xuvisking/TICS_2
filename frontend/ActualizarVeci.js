/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

import swal from 'sweetalert';
import { clienteAxios } from "helpers/axios";

const ActualizarVeci = (props) => {

  //hook vecino, para actualizar datos
  const [datos, setDatos] = useState({
    idvecino: props.info.idvecino,
    direccion: props.info.direccion,
    password: props.info.password,
    telefono: props.info.telefono,
    estado: props.info.estado,
  });
  //clase datos para recopilar datos del vecino
  const { idvecino, direccion, password, telefono, estado } = datos;

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
      const { data } = await clienteAxios.put('/vecino/actualizar', datos, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      });
      if (data.ok) {
        swal("Perfecto!", 'Se ha modificado exitosamente', "success");
        setModal(false);
        props.setVecinos(props.fetchVecinos())
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
        <ModalHeader toggle={toggle}>Actualizar Vecino</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form onSubmit={enviarDatos}>
                <FormGroup>
                  <Label for="exampleEmail1">ID</Label>
                  <Input type="text" name="id" value={idvecino} onChange={handleInputChange} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail2">Direccion</Label>
                  <Input type="text" name="direccion" value={direccion} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail3">Nombre del Contacto</Label>
                  <Input type="text" name="password" value={password} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail4">Número Telefónico del Contacto</Label>
                  <Input type="text" name="telefono" value={telefono} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail5">Nombre del Contacto 2</Label>
                  <Input type="text" name="estado" value={estado} onChange={handleInputChange} />
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

export default ActualizarVeci;