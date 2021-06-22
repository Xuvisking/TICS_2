import React from 'react';
import {
    Button,
} from "reactstrap";
import swal from 'sweetalert';

import { clienteAxios } from "helpers/axios";
import Comentario from './Comentario';

export const AlarmFila = ({ alarma, fetchAlarmas }) => {

    const confirmarAlarma = async (id_alarm) => {
        try {
            const { data } = await clienteAxios.post('/api/alarma/confirmarAlarma', { id_alarm }, {
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

    const terminarAlarma = async (id_alarm, comentario) => {
        // Validar que haya comentario
        if (comentario === '') {
            swal("Error!", 'Debe agregar un comentario', "error");
            return;
        }
        try {
            const { data } = await clienteAxios.post('/api/alarma/terminarAlarma', { id_alarm, comentario }, {
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
            <td>{alarma.id_alarm}</td>
            <td>{alarma.id_veci}</td>
            <td><p className='text-primary text-uppercase'>{alarma.id_guard}</p></td>
            <td>{alarma.direccion}</td>
            <td>{alarma.name_contact}</td>
            <td>{alarma.numb_contact}</td>
            <td>{alarma.name_contact2}</td>
            <td>{alarma.numb_contact2}</td>
            <td>{alarma.fecha}</td>
            <td><p className='text-primary text-uppercase'>{alarma.estado}</p></td>
            <td className="text-center">
                <Button
                    className={alarma.estado === 'btn-fill confirmada' ? 'btn-fill disabled' : ''}
                    color="success"
                    type="submit"
                    onClick={() => confirmarAlarma(alarma.id_alarm)}
                >
                    CONFIRMAR
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