import React from 'react';
import {
    Button,
} from "reactstrap";
import swal from 'sweetalert';

import { clienteAxios } from "helpers/axios";
import Comentario2 from './ComentarioEscolta';

export const EscoltaFila = ({ escoltas, fetchEscoltas}) => {

    const confirmarEscolta = async (idescolta) => {
        try {
            const idguardia = localStorage.getItem('id')
            const { data } = await clienteAxios.post('/confirmarEscolta', { idescolta, idguardia}, {
                headers: {
                    'x-token': localStorage.getItem('token') || ''
                }
            });
            if (data.ok) {
                swal("Perfecto!", data.msg, "success");
            }
            else {
                swal("Error!", data.msg, "error");
            }
            fetchEscoltas();
        } catch (error) {
            console.log(error);
        }
    };

    const terminarEscolta = async (idescolta, comentario) => {
        // Validar que haya comentario
        //             
        //              <td>{vecino_contacto.contacto_telefono}</td>
        if (comentario === '') {
            swal("Error!", 'Debe agregar un comentario', "error");
            return;
        }
        try {
            const { data } = await clienteAxios.post('/terminarEscolta', { idescolta, comentario }, {
                headers: {
                    'x-token': localStorage.getItem('token') || ''
                }
            });
            if (data.ok) {
                swal("Perfecto!", data.msg, "success");
            }
            else {
                swal("Error!", data.msg, "error");
            }
            fetchEscoltas();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <tr>
            <td>{escoltas.idescolta}</td>
            <td>{escoltas.vecino_idvecino}</td>
            <td><p className='text-primary text-uppercase'>{escoltas.guardia_idguardia}</p></td>
            <td>{escoltas.telefono}</td>
            <td>{escoltas.fecha}</td>
            <td><p className='text-primary text-uppercase'>{escoltas.estado}</p></td>
            <td className="text-center">
                <Button
                    className={escoltas.estado === 'btn-fill confirmada' ? 'btn-fill disabled' : ''}
                    color="success"
                    type="submit"
                    onClick={() => confirmarEscolta(escoltas.idescolta)}
                >
                    Confirmar
                </Button>
            </td>
            <td className="text-center">
                <Comentario2
                    escoltas={escoltas}
                    terminarEscolta={terminarEscolta}
                />
            </td>
        </tr>
    );
};