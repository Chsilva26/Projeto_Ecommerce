const router = require("express").Router();
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation")
const auth = require("../../auth");
const LojaController = require("../../../controllers/lojaController");

const lojaController = new LojaController();

router.get("/", lojaController.index); //testok                             
router.get("/:id", lojaController.show); //testeok 

router.post("/", auth.required, lojaController.store); //testeok                    
router.put("/:id", auth.required, LojaValidation.admin, lojaController.update); //testok      
router.delete("/:id", auth.required, LojaValidation.admin, lojaController.remove); //testok

module.exports = router;