const router = require("express").Router();

const VariacaoController = require("../../../controllers/VariacaoController");

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");
const upload = require("../../../config/multer");

const variacaoControoler = new VariacaoController();

// CLIENTES
router.get("/", variacaoControoler.index);
router.get("/:id", variacaoControoler.show);

// ADMINS
router.post("/", auth.required, LojaValidation.admin, variacaoControoler.store);
router.put("/:id", auth.required, LojaValidation.admin, variacaoControoler.update);
router.put("/images/:id", auth.required, LojaValidation.admin, upload.array("files", 4), variacaoControoler.update);
router.delete("/images/:id", auth.required, LojaValidation.admin, variacaoControoler.remove);

module.exports = router;