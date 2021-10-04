/*
    Rutas de usuarios / Auth
    host + /api/alarma
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.use(validarJWT);

const { crearAlarma, getAlarmas, confirmarAlarma, terminarAlarma, getHistAlarm } = require('../controllers/alarmas');

router.post('/crearAlarma', crearAlarma);
router.get('/getAlarmas', getAlarmas);
router.post('/confirmarAlarma', confirmarAlarma);
router.post('/terminarAlarma', terminarAlarma);
router.get('/getHistAlarm', getHistAlarm);

module.exports = router;