const { Router } = require('express');
const { usuariosGet, usuariosDelete, usuariosPost, usuariosPut } = require('../controllers/usuarios');

const router = Router();


router.get ('/', usuariosGet);

router.put('/', usuariosPut);
  
router.post('/:id', usuariosPost);
  
router.delete('/', usuariosDelete);
  





module.exports = router;
