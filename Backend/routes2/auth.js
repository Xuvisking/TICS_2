/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearGuardia, loginGuardia, loginVecino, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/new',
    [ // middlewares
        check('id', 'Su id es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo de guardia es obligatorio').not().isEmpty(),
        check('name_guard', 'Su nombre es obligatorio').not().not().isEmpty(),
        check('rut', 'Su nombre es obligatorio').not().not().isEmpty(),
        check('password', 'Su contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearGuardia
);

router.post('/',
    [ // middlewares
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginGuardia
);

router.post('/loginVecino',
    [ // middlewares
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginVecino
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;