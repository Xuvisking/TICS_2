require('dotenv').config();
const { response } = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    // Extraemos datos
    const { id, tipo, nombre, password } = req.body;
    try {
        // Creamos la conexion
        const pool = new Pool({
            host: 'localhost',
            user: 'postgres',
            password: process.env.DATABASEPASSWORD,
            database: process.env.DATABASE,
            port: process.env.DATABASEPORT
        });
        // Validar que no exista
        const validarid = await pool.query('SELECT id FROM guardia WHERE guardia.id_guard = ($1)', [id]);
        if (!validarid.rowCount) { // no existe
            // Encriptar password
            const salt = bcrypt.genSaltSync();
            const passwordHash = bcrypt.hashSync(password, salt);
            // Guardar usuario
            await pool.query('INSERT INTO guardia (id_guard, tipo, nom_guard, pass_guard) VALUES ($1, $2, $3, $4)', [id, tipo, nombre, passwordHash]);
            // Generar JWT VERIFICAR LINEA INFERIOR PARA MODIFICACIÓN DE QUERY
            const token = await generarJWT(nombre, email);
            return res.status(201).json({
                ok: true,
                msg: 'registro exitoso',
                email,
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

const loginUsuario = async (req, res = response) => {
    const { id, password } = req.body;
    try {
        // Creamos la conexion a la BDD
        const pool = new Pool({
            host: 'localhost',
            user: 'postgres',
            password: process.env.DATABASEPASSWORD,
            database: process.env.DATABASE,
            port: process.env.DATABASEPORT
        });
        // Validar que el email exista
        const validarid = await pool.query('SELECT id_guard FROM guardia WHERE guardia.id_guard = ($1)', [id]);
        if (!validarid.rowCount) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos'
            });
        }
        // Confirmamos las contraseñas
        const passwordHash = await pool.query('SELECT pass_guard FROM guardia WHERE guardia.id_guard = ($1)', [id]);
        if (passwordHash.rowCount) { // se encontro el passwordHash
            const validarPassword = bcrypt.compareSync(password, passwordHash.rows[0].password);
            if (!validarPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o contrseña incorrectos'
                });
            }
        }
        // Generar JWT
        const token = await generarJWT(email);
        return res.status(200).json({
            ok: true,
            email,
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

const revalidadToken = async (req, res = response) => {
    const { email } = req;
    // Generar JWT
    const token = await generarJWT(email);
    return res.json({
        ok: true,
        email,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidadToken
};