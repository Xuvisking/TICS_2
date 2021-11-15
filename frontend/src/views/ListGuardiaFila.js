import { clienteAxios } from "helpers/axios";
import React, { useState } from "react";
import {
    Button,
} from "reactstrap";
import swal from "sweetalert";

import ActualizarGuardia from './ActualizarGuardia';

export const ListGuardiaFila = ({ guardia, fetchGuardia, setGuardia }) => {
    //hook guardia, para actualizar datos

    const [datos] = useState({
        idguardia: guardia.idguardia,
        name_guard: guardia.nombre,
        email: guardia.email,
        rut: guardia.rut,
        tipo: guardia.tipo,
        
    });
    const { idguardia, name_guard, email, rut, tipo} = datos;

    const handleInputDelete = (idguardia) => {
        swal("Seguro que desea eliminar al guardia? Esta acción no puede revertirse...", {
            buttons: {
                cancel: "Cancelar",
                aceptar: {
                    text: "Borrar",
                    value: "borrar",
                },
            },
        })
            .then(async (value) => {
                switch (value) {
                    case "borrar":
                        // codigo para borrar
                        try {
                            const { data } = await clienteAxios.delete(`/guardia/${idguardia}`, {
                                headers: {
                                    'x-token': localStorage.getItem('token')
                                }
                            });
                            if (data.ok) {
                                swal("Bien!", 'Guardia eliminado', "success");
                                setGuardia(fetchGuardia());
                            }
                        } catch (error) {
                            swal("Error!", "Al parecer no tiene privilegios", "error");
                        }
                        break;
                    default:
                        swal("Cancelado!");
                }
            });
    };

    return (
        <tr>
            <td>{idguardia}</td>
            <td>{name_guard}</td>
            <td>{email}</td>
           
            <td>{rut}</td>
            <td>{tipo}</td>
            <td className="text-center">
                <ActualizarGuardia
                    info={datos}
                    fetchGuardia={fetchGuardia}
                    setGuardia={setGuardia}
                />
            </td>
            <td className="text-center">
                <Button
                    className="btn-fill"
                    color="danger"
                    type="submit"
                    onClick={() => handleInputDelete(idguardia)}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    );
};