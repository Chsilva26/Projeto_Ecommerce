const router = require("express").Router();

const auth = require("../../auth");
const Validation = require("express-validation");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");

const LojaController = require("../../../controllers/lojaController");
const lojaController = new LojaController();

router.get("/", lojaController.index); //testok                             
router.get("/:id",Validation(LojaValidation.show), lojaController.show); //testeok 

router.post("/", auth.required, Validation(LojaValidation.store), lojaController.store); //testeok                    
router.put("/:id", auth.required, LojaValidation.admin, Validation(LojaValidation.update), lojaController.update); //testok      
router.delete("/:id", auth.required, LojaValidation.admin, lojaController.remove); //testok

module.exports = router;