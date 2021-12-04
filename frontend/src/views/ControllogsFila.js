import React from 'react'

export const ControllogsFila = ({ logs }) => {
    return (
        <tr>
            <td>{logs.idlog}</td>
            <td>{logs.guardia_idguardia}</td>
            <td>{logs.nombre}</td>
            <td>{logs.fecha}</td>
        </tr>
    )
};