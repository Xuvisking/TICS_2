const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { crearSolicitudEscolta, getAllSoliEscolta } = require('../controllers/escoltas');

router.use(validarJWT);

router.post('/crearSolicitudEscolta', crearSolicitudEscolta)
router.get('/getAllSoliEscolta', getAllSoliEscolta);


module.exports = router;