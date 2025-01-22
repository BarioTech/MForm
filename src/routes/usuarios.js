const express = require('express');
const router = express.Router();
const controller = require('../controllers/alunosController')
const { decodeIDToken } = require('../middlewares/auth')

router.post('/cadastrarUsuario', controller.cadastrarUsuario);
router.post('/cadastrarEndereco', controller.cadastrarEndereco);
router.post('/obterRelatorio', controller.obterRelatorio);
router.post('/editarUsuario/:id', controller.editarUsuario);
router.get('/listarUsuarios', controller.listUsuarios);


router.use(async (req, res, next) => {
  try {
    await decodeIDToken(req, res, next);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
})


module.exports = router;
