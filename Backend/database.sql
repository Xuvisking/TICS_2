CREATE DATABASE usuarios;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    email TEXT,
    password TEXT
);

CREATE TABLE vecino(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    numero TEXT,
    nombre_numero TEXT
);

CREATE TABLE usuario_vecino(
    id_veci TEXT,
    direccion TEXT,
    pass_veci TEXT,
    numero TEXT,
    nom_numero TEXT,
    numero0 TEXT,
    nom_numero0 TEXT
);