require('dotenv').config();
const { response } = require('express');
const moment = require('moment');

const { dbConecction } = require('../database/config');

const crearAlarma = async (req, res = response) => {
    // Creamos la conexion a la BDD
    const pool = await dbConecction();
    // EXTRAER ID DEL TOKEN PARA EVITAR FALSIFICACION DE DATOS
    const { id } = req;
    try {
        let terminar = false;
        // Primero vemos que no exista una alarma del mismo vecino
        const verificarExistencia = await pool.query('SELECT id_veci, estado FROM alarma WHERE id_veci = ($1)', [id]);
        verificarExistencia.rows.map(fila => {
            if (fila.estado === 'activa' || fila.estado === 'confirmada') {
                terminar = true;
            }
        });
        if (terminar) { // No agregamos la alarma debido a que ya hay una sin terminar
            return res.status(200).json({
                ok: false,
                msg: 'Usted ya contiene una alarma activa'
            });
        }
        moment.locale('mx');
        const datos = await pool.query('SELECT * FROM vecino WHERE id_veci = ($1)', [id]);
        const { id_veci, direccion, name_contact, numb_contact, name_contact2, numb_contact2 } = datos.rows[0];
        // Creamos una nueva alarma con los datos del vecino
        await pool.query('INSERT INTO alarma (id_veci, fecha, estado) VALUES ($1, $2, $3)', [id_veci, moment().format('MMMM Do YYYY, h:mm:ss a'), 'activa']);
        return res.status(201).json({
            ok: true,
            id,
            msg: 'Alarma creada',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const getAlarmas = async (req, res = response) => {
    try {
        // Creamos la conexion a la BDD
        const pool = await dbConecction();
        // Comprobamos que el que envia la info es un guardia o admin
        const { id } = req;
        const verificarGuardia = await pool.query('SELECT id_guard FROM guardia WHERE id_guard = ($1)', [id]);
        if (!verificarGuardia.rowCount) {
            return res.status(200).json({
                ok: false,
                msg: 'Ha ocurrido un error inesperado, hable con el admin'
            });
        }
        const datos = await pool.query('SELECT id_alarm, alarma.id_veci, alarma.id_guard, fecha, alarma.estado, direccion, name_contact, numb_contact, name_contact2, numb_contact2 FROM alarma, vecino WHERE alarma.id_veci = vecino.id_veci AND (alarma.estado = ($1) OR alarma.estado = ($2)) ORDER BY id_alarm', ['activa', 'confirmada']);
        // 2021-05-23T22:50:42-04:00
        return res.status(200).json({
            ok: true,
            data: datos.rows
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const getHistAlarm = async (req, res = response) => {
    try {
        // Creamos la conexion a la BDD
        const pool = await dbConecction();
        // Comprobamos que el que envia la info es un guardia o admin
        const { id } = req;
        const verificarGuardia = await pool.query('SELECT id_guard FROM guardia WHERE id_guard = ($1)', [id]);
        if (!verificarGuardia.rowCount) {
            return res.status(200).json({
                ok: false,
                msg: 'Ha ocurrido un error inesperado, hable con el admin'
            });
        }
        const datos = await pool.query('SELECT id_alarm, alarma.id_veci, alarma.id_guard, fecha, alarma.estado, direccion, comentario FROM alarma, vecino WHERE alarma.id_veci = vecino.id_veci AND alarma.estado = ($1)', ['terminada']);
        return res.status(200).json({
            ok: false,
            data: datos.rows
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const confirmarAlarma = async (req, res = response) => {
    try {
        // Creamos la conexion a la BDD
        const pool = await dbConecction();
        // Comprobamos que el que envia la info es un guardia o admin
        const { id } = req;
        const verificarGuardia = await pool.query('SELECT id_guard FROM guardia WHERE id_guard = ($1)', [id]);
        if (!verificarGuardia.rowCount) {
            return res.status(200).json({
                ok: false,
                msg: 'Ha ocurrido un error inesperado, hable con el admin'
            });
        }
        // Extraemos la info del post
        const { id_alarm } = req.body;
        // Comprobamos que la alarma no esta vinculada a ningun guardia
        const verificarAlarma = await pool.query('SELECT id_guard FROM alarma WHERE id_alarm = ($1)', [id_alarm]);
        if (verificarAlarma.rows[0].id_guard) { // Ya esta vinculada
            return res.status(200).json({
                ok: false,
                msg: 'La alarma ya contiene un guardia vinculado'
            });
        }
        // Vinculamos al guardia con la alarma aceptada
        const datos = await pool.query('UPDATE alarma SET id_guard = ($1), estado = ($2) WHERE id_alarm = ($3)', [id, 'confirmada', id_alarm]);
        if (datos.rowCount) {
            return res.status(200).json({
                ok: true,
                msg: 'Alarma aceptada'
            });
        }
        return res.status(200).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const terminarAlarma = async (req, res = response) => {
    try {
        // Creamos la conexion a la BDD
        const pool = await dbConecction();
        // Comprobamos que el que envia la info es un guardia o admin
        const { id } = req;
        const verificarGuardia = await pool.query('SELECT id_guard FROM guardia WHERE id_guard = ($1)', [id]);
        if (!verificarGuardia.rowCount) {
            return res.status(200).json({
                ok: false,
                msg: 'Ha ocurrido un error inesperado, hable con el admin'
            });
        }
        // Extraer la info del post
        const { id_alarm, comentario } = req.body;
        await pool.query('UPDATE alarma SET estado = ($1), comentario = ($2) WHERE id_alarm = ($3)', ['terminada', comentario, id_alarm]);
        return res.status(200).json({
            ok: true,
            msg: 'Terminar alarma'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    crearAlarma,
    getAlarmas,
    confirmarAlarma,
    terminarAlarma,
    getHistAlarm
};