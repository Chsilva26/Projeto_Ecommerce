const router = require("express").Router();

const VariacaoController = require("../../../controllers/VariacaoController");

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");
const upload = require("../../../config/multer");

const { VariacaoValidation } = require("../../../controllers/validacoes/variacaoValidation");
const Validation = require("express-validation");

const variacaoControoler = new VariacaoController();

// CLIENTES
router.get("/", Validation(VariacaoValidation.index), variacaoControoler.index);
router.get("/:id",Validation(VariacaoValidation.show),variacaoControoler.show);

// ADMINS
router.post("/", auth.required, LojaValidation.admin, Validation(VariacaoValidation.store), variacaoControoler.store);
router.put("/:id", auth.required, LojaValidation.admin, Validation(VariacaoValidation.update), variacaoControoler.update);
router.put("/images/:id", auth.required, LojaValidation.admin, Validation(VariacaoValidation.updateImages), upload.array("files", 4), variacaoControoler.update);
router.delete("/:id", auth.required, LojaValidation.admin, Validation(VariacaoValidation.remove), variacaoControoler.remove);

module.exports = router;