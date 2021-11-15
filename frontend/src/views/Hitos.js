/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

const Comentario3 = (props) => {

    //hook vecino, para actualizar datos
    const [msg, setMsg] = useState({
        comentario3: ''
    });
    //clase datos para recopilar datos del vecino
    const { comentario3 } = msg;

    //actualizar datos cuando se inserta informacion en el formulario
    const handleInputChange = (event) => {
        setMsg({
            ...msg,
            [event.target.name]: event.target.value
        });
    };

    // cosas del modal
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button
                color="success"
                onClick={toggle}
                className={props.alarma.estado === 'confirmada' || props.alarma.estado === 'activa' ? '' : 'disabled'}
            >
                Agregar Hito
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Agregar comentario</ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail1">Comentario</Label>
                                    <Input type="textarea" name="comentario3" value={comentario3} onChange={handleInputChange} />
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => props.AgregarHito(props.alarma.idalarma, comentario3)}>Grabar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Comentario3;
