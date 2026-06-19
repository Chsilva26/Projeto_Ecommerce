const mongoose = require("mongoose");

const Pedido = mongoose.model("Pedido");
const Produto = mongoose.model("Produto");
const Variacao = mongoose.model("Variacao");
const Pagamento = mongoose.model("Pagamento");
const Entrega = mongoose.model("Entrega");
const Cliente = mongoose.model("Cliente");
const Usuario = mongoose.model("Usuario");

const CarrihoValidation = require("./validacoes/carrinhoValidation");

class PedidoController {

}

module.exports = PedidoController;