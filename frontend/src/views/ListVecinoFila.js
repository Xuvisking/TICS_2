import { clienteAxios } from "helpers/axios";
import React, { useState } from "react";
import {
    Button,
} from "reactstrap";
import swal from "sweetalert";

import ActualizarVeci from './ActualizarVeci';

export const ListVecinoFila = ({ vecino, fetchVecinos, setVecinos }) => {
    //hook vecino, para actualizar datos

    const [datos] = useState({
        idvecino: vecino.idvecino,
        direccion: vecino.direccion,

        telefono: vecino.telefono,
        estado: vecino.estado,
    });
    const { idvecino, direccion, telefono, estado } = datos;

    const handleInputDelete = (idvecino) => {
        swal("Seguro que desea eliminar al vecino? Esta acción no puede revertirse...", {
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
                            const { data } = await clienteAxios.delete(`/vecino/${idvecino}`, {
                                headers: {
                                    'x-token': localStorage.getItem('token')
                                }
                            });
                            if (data.ok) {
                                swal("Bien!", 'Vecino eliminado', "success");
                                setVecinos(fetchVecinos());
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
            <td>{idvecino}</td>
            <td>{direccion}</td>

            <td>{telefono}</td>
            <td>{estado}</td>
            <td className="text-center">
                <ActualizarVeci
                    info={datos}
                    fetchVecinos={fetchVecinos}
                    setVecinos={setVecinos}
                />
            </td>
            <td className="text-center">
                <Button
                    className="btn-fill"
                    color="danger"
                    type="submit"
                    onClick={() => handleInputDelete(idvecino)}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    );
};