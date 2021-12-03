import React from 'react'

export const ControllogsFila = ({ logs }) => {
    return (
        <tr>
            <td>{logs.idlogs}</td>
            <td>{logs.idguardia}</td>
            <td>{logs.nombre}</td>
            <td>{logs.fecha}</td>
        </tr>
    )
};