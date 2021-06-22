import React from 'react'

export const HistAlarmFila = ({ alarma }) => {
    return (
        <tr>
            <td>{alarma.id_alarm}</td>
            <td>{alarma.id_veci}</td>
            <td>{alarma.id_guard}</td>
            <td>{alarma.direccion}</td>
            <td>{alarma.fecha}</td>
            <td>{alarma.comentario}</td>
        </tr>
    )
};