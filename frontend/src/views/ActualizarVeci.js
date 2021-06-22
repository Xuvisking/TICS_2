/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

import swal from 'sweetalert';
import { clienteAxios } from "helpers/axios";

const ActualizarVeci = (props) => {

  //hook vecino, para actualizar datos
  const [datos, setDatos] = useState({
    id_veci: props.info.id_veci,
    direccion: props.info.direccion,
    name_contact: props.info.name_contact,
    numb_contact: props.info.numb_contact,
    name_contact2: props.info.name_contact2,
    numb_contact2: props.info.numb_contact2,
  });
  //clase datos para recopilar datos del vecino
  const { id_veci, direccion, name_contact, numb_contact, name_contact2, numb_contact2 } = datos;

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
      const { data } = await clienteAxios.put('/api/vecino/actualizarVecino', datos, {
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
                  <Input type="text" name="id" value={id_veci} onChange={handleInputChange} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail2">Direccion</Label>
                  <Input type="text" name="direccion" value={direccion} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail3">Nombre del Contacto</Label>
                  <Input type="text" name="name_contact" value={name_contact} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail4">Número Telefónico del Contacto</Label>
                  <Input type="text" name="numb_contact" value={numb_contact} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail5">Nombre del Contacto 2</Label>
                  <Input type="text" name="name_contact2" value={name_contact2} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail6">Número Telefónico del Contacto 2</Label>
                  <Input type="text" name="numb_contact2" value={numb_contact2} onChange={handleInputChange} />
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