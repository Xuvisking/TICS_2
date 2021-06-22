require('dotenv').config();
const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const { dbConecction } = require('../database/config');

const crearGuardia = async (req, res = response) => {
    // Extraemos datos
    const { id, tipo, name_guard, rut, password } = req.body; // Tambien debe venir el ID del administrador
    try {
        // Creamos la conexion a la BDD
        const pool = await dbConecction();
        // Validar que no exista el ID
        const validarid = await pool.query('SELECT id_guard FROM usuario_guardia WHERE id_guard = ($1)', [id]);
        if (!validarid.rowCount) { // No existe
            // Encriptar password
            const salt = bcrypt.genSaltSync();
            const passwordHash = bcrypt.hashSync(password, salt);
            // Guardar usuario en las dos tablas (guardia y usuario_guardia)
            await pool.query('INSERT INTO guardia (id_guard, tipo, name_guard, rut) VALUES ($1, $2, $3, $4)', [id, tipo, name_guard, rut]);
            await pool.query('INSERT INTO usuario_guardia (id_guard, pass_guard) VALUES ($1, $2)', [id, passwordHash]);
            // Generamos token
            const token = await generarJWT(id);
            return res.status(201).json({
                ok: true,
                msg: 'Registro exitoso',
                id,
                token
            });
        }
        return res.status(400).json({
            ok: true,
            msg: 'El id ya existe',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const loginGuardia = async (req, res = response) => {
    const { id, password } = req.body;
    try {
        // Creamos la conexion a la BDD
        const pool = await dbConecction();
        // Validar que el ID exista
        const validarid = await pool.query('SELECT id_guard FROM usuario_guardia WHERE id_guard = ($1)', [id]);
        if (!validarid.rowCount) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña incorrectos'
            });
        }
        // Confirmamos las contraseñas
        const passwordHash = await pool.query('SELECT pass_guard FROM usuario_guardia WHERE id_guard = ($1)', [id]);
        if (passwordHash.rowCount) { // Se encontro el passwordHash
            const validarPassword = bcrypt.compareSync(password, passwordHash.rows[0].pass_guard);
            if (!validarPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario y/o contraseña incorrectos'
                });
            }
        }
        // Generar JWT
        const token = await generarJWT(id);
        return res.status(200).json({
            ok: true,
            id,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const loginVecino = async (req, res = response) => {
    const { id, password } = req.body;
    try {
        // Creamos la conexion a la BDD
        const pool = await dbConecction();
        // Validamos que el ID del vecino exista
        const validarID = await pool.query('SELECT id_veci FROM usuario_vecino WHERE id_veci = ($1)', [id]);
        if (!validarID.rowCount) { // NO EXISTE
            return res.status(200).json({
                ok: true,
                msg: 'Usuario y/o contraseña incorrectos'
            });
        }
        // Confirmamos las passwords
        const passwordHash = await pool.query('SELECT pass_veci FROM usuario_vecino WHERE usuario_vecino.id_veci = ($1)', [id]);
        const validarPassword = bcrypt.compareSync(password, passwordHash.rows[0].pass_veci);
        if (!validarPassword) { // NO COINCIDEN LAS CREDENCIALES
            return res.status(200).json({
                ok: false,
                msg: 'Usuario y/o contraseña incorrectos'
            });
        }
        // Generar JWT
        const token = await generarJWT(id);
        return res.status(200).json({
            ok: true,
            id,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const revalidarToken = async (req, res = response) => {
    const { id } = req;
    // Generar JWT
    const token = await generarJWT(id);
    return res.json({
        ok: true,
        id,
        token
    });
};

module.exports = {
    crearGuardia,
    loginGuardia,
    loginVecino,
    revalidarToken
};