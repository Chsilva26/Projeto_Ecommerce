const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controllers/UsuarioController");

const Validation = require("express-validation");
const { UsuarioValidation } = require("../../../controllers/validacoes/usuarioValidation");

const usuarioController = new UsuarioController();

// ROTAS PUBLICAS

router.post("/login", Validation(UsuarioValidation.login), usuarioController.login); //testok
router.post("/registrar", usuarioController.store); //testok

// ROTAS PROTEGIDAS

router.put("/",auth.required, usuarioController.update); //testok
router.delete("/", auth.required, usuarioController.remove); //testok

router.get("/recuperar-senha", usuarioController.showRecovery); //testok    
router.post("/recuperar-senha", usuarioController.createRecovery); //testok
router.get("/senha-recuperada", usuarioController.showCompleteRecovery); //testok   
router.post("/senha-recuperada", usuarioController.completeRecovery) //testeok

router.get("/", auth.required, usuarioController.index); //testok
router.get("/:id", auth.required, usuarioController.show); //testok



module.exports = router;