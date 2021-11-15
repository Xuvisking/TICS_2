import React, { useState } from "react";
import { useDispatch } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import { startLogin } from "../../actions/auth";

function Login({ history }) {

  const dispatch = useDispatch();

  // Context
  // const { dispatch } = useContext(AuthContext);

  // State
  const [datos, setDatos] = useState({
    id: '1',
    password: 'password'
  });
  const { id, password } = datos;

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const enviarDatos = event => {
    event.preventDefault();
    dispatch(startLogin(id, password));
    // dispatch(startLogin(_id, _password));
    // console.log(datos)
    // try {
    //   let config = {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'aplication/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(datos)
    //   }

    //   let res = await fetch('http://localhost:4000/api/auth', config)
    //   let json = await res.json()

    //   console.log(json)
    // } catch (error) {

    // }
    // const ultimoPath = localStorage.getItem('ultimoPath') || '/';
    // dispatch({
    //   type: types.login,
    //   payload: {
    //     name: 'Kako'
    //   }
    // });
    // history.replace(ultimoPath);
  };

  return (
    <>
      <div className="content">
        <Form onSubmit={enviarDatos}>
          <Col className="ml-auto mr-auto mt-5 text-center" md="4">
            <Card>
              <CardHeader>
                <h2 className="title">Iniciar Sesión</h2>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="ml-auto mr-auto text-center" md="10">
                    <FormGroup>
                      <label>Nombre de Usuario</label>
                      <Input
                        placeholder="Usuario"
                        type="text"
                        name="id"
                        value={id}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="ml-auto mr-auto text-center" md="10">
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
                </Row>
              </CardBody>
              <CardFooter>
                <Button className="btn-primary" color="primary" type="submit">
                  Enviar
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Form>
      </div>
    </>
  );
}

export default Login;
