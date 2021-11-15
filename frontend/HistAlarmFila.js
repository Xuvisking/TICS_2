//             <td>{alarma.direccion}</td>
import React from 'react'

export const HistAlarmFila = ({ alarma }) => {
    return (
        <tr>
            <td>{alarma.idalarma}</td>
            <td>{alarma.vecino_idvecino}</td>
            <td>{alarma.guardia_idguardia}</td>
            <td>{alarma.fecha}</td>
            <td>{alarma.comentario}</td>
        </tr>
    )
};