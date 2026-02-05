const router = require("express").Router();

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const { ClienteValidation } = require("../../../controllers/validacoes/clienteValidation");
const Validation = require("express-validation");
const auth = require("../../auth").optiona;

const ClienteControler = require("../../../controllers/clienteController");
const clienteController = new ClienteController();

// ADMIN
router.get("/", auth.required, LojaValidation.admin, clienteController.index);
// router.get("/search/:search/pedidos", auth.required, LojaValidation.admin, clienteController.searchPedidos);
router.get("/search/:search", auth.required, LojaValidation.admin, clienteController.search);
router.get("/admin/:id", auth.required, LojaValidation.admin, clienteController.showAdmin);
// router.get("/admin/:id/pedidos", auth.required, LojaValidation.admin, clienteController.showPedidosCliente);

router.put("/admin/:id", auth.required, LojaValidation.admin, clienteController.updateAdmin);

// CLIENTE
router.get("/:id", auth.required, clienteController.show);

router.post("/:id", auth.required, clienteController.store);
router.put("/:id", auth.required, clienteController.put);
router.delete("/:id", auth.required, clienteController.delete);

module.exports = router;
