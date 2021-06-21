/*
    Vecinos
    /api/vecino
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
<<<<<<< HEAD
const { crearVecino, getallvecinos, getUnVecino, deleteVecino, actualizarVecino, actualizarPassword } = require('../controllers/vecino');
=======
const { crearVecino, getallvecinos, deleteVecino, actualizarVecino, actualizarPassword,getInfoVecino} = require('../controllers/vecino');
>>>>>>> 9d262a2131743cedbb9e4cfe1559d97fa0be2c91

router.use(validarJWT);

router.get('/getallvecinos', getallvecinos);
router.get('/getInfoVecino/:id_veci', getInfoVecino);

router.post('/crearVecino',
    [
        validarCampos
    ],
    crearVecino
);

router.get('/getUnVecino', getUnVecino);

router.delete('/deleteVecino/:id_veci', deleteVecino);

router.put('/actualizarVecino', actualizarVecino);

router.post('/actualizarPassword',
    [
        check('antiguaPassword', 'La antigua contraseña es obligatoria').not().isEmpty(),
        check('nuevaPassword', 'La nueva contraseña es obligatoria').not().isEmpty(),
        check('confirmarPassword', 'Confirmar la nueva contraseña es obligatorio').not().isEmpty(),
        validarCampos        
    ], 
    actualizarPassword
);

module.exports = router;