const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosDelete, usuariosPost, usuariosPut } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


router.get ('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPut);
  
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio y válido').isLength({min: 6}),
    check('correo', 'El correo debe ser válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'el rol no es válido').isIn(['Administrador', 'Usuario']),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost);
  
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);
  





module.exports = router;
