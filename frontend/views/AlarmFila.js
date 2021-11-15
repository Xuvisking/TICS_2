import React from 'react';
import {
    Button,
} from "reactstrap";
import swal from 'sweetalert';

import { clienteAxios } from "helpers/axios";
import Comentario from './Comentario';
import Comentario2 from './ComentarioEscolta';

export const AlarmFila = ({ alarma, fetchAlarmas}) => {

    const confirmarAlarma = async (idalarma) => {
        try {
            const idguardia = localStorage.getItem('id')
            console.log(idguardia)
            const { data } = await clienteAxios.post('/confirmarAlarma', { idalarma, idguardia}, {
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
            fetchAlarmas();
        } catch (error) {
            console.log(error);
        }
    };

    const terminarAlarma = async (idalarma, comentario) => {
        // Validar que haya comentario
        //             
        //              <td>{vecino_contacto.contacto_telefono}</td>
        if (comentario === '') {
            swal("Error!", 'Debe agregar un comentario', "error");
            return;
        }
        try {
            const { data } = await clienteAxios.post('/terminarAlarma', { idalarma, comentario }, {
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
            fetchAlarmas();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <tr>
            <td>{alarma.idalarma}</td>
            <td>{alarma.vecino_idvecino}</td>
            <td><p className='text-primary text-uppercase'>{alarma.guardia_idguardia}</p></td>
            <td>{alarma.telefono}</td>
            <td>{alarma.fecha}</td>
            <td><p className='text-primary text-uppercase'>{alarma.estado}</p></td>
            <td className="text-center">
                <Button
                    className={alarma.estado === 'btn-fill confirmada' ? 'btn-fill disabled' : ''}
                    color="success"
                    type="submit"
                    onClick={() => confirmarAlarma(alarma.idalarma)}
                >
                    Confirmar
                </Button>
            </td>
            <td className="text-center">
                <Comentario
                    alarma={alarma}
                    terminarAlarma={terminarAlarma}
                />
            </td>
        </tr>
    );

};