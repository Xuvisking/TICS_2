//             <td>{alarma.direccion}</td>
import React from 'react'

export const HistEscoltaFila = ({ escoltas }) => {
    return (
        <tr>
            <td>{escoltas.idescolta}</td>
            <td>{escoltas.vecino_idvecino}</td>
            <td>{escoltas.guardia_idguardia}</td>
            <td>{escoltas.fecha}</td>
            <td>{escoltas.comentario}</td>
        </tr>
    )
};