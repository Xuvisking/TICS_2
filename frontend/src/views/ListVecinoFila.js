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
        id_veci: vecino.id_veci,
        direccion: vecino.direccion,
        nombre_vecino: vecino.nombre_vecino,
        telefono_vecino: vecino.telefono_vecino,
        name_contact: vecino.name_contact,
        numb_contact: vecino.numb_contact,
        name_contact2: vecino.name_contact2,
        numb_contact2: vecino.numb_contact2,
    });
    const { id_veci, direccion, nombre_vecino, telefono_vecino, name_contact, numb_contact, name_contact2, numb_contact2 } = datos;

    const handleInputDelete = (id_veci) => {
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
                            const { data } = await clienteAxios.delete(`/api/vecino/deleteVecino/${id_veci}`, {
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
            <td>{id_veci}</td>
            <td>{direccion}</td>
            <td>{nombre_vecino}</td>
            <td>{telefono_vecino}</td>
            <td>{name_contact}</td>
            <td>{numb_contact}</td>
            <td>{name_contact2}</td>
            <td>{numb_contact2}</td>
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
                    onClick={() => handleInputDelete(id_veci)}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    );
};