const { timestamp } = require("joi/lib/types/date");
const { type } = require("joi/lib/types/object");
const mongoose = require("mongoose") ;
const mongoosePaginate = require("mongoose-paginate");
const produto = require("./produto");
const variacao = require("./variacao");
const boolean = require("joi/lib/types/boolean");
const Schema = mongoose.Schema;

const PedidoSchema = Schema({
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    carrinho: { 
        type: [{
            produto: { type: Schema.Types.ObjectId, ref: "Produto", required: true},
            variacao: { type: Schema.Types.ObjectId, ref: "Variacao", required: true},
            produtoEstatico: { type: Number, default: 1},
            precoUnitario: { type: Number, required: true}
        }]
    },
    pagamento: { type: Schema.Types.ObjectId, ref: "Pagamento", required: true},
    entrega: { type: Schema.Types.ObjectId, ref: "Entrega", required: true},
    entrega: { type: Boolean, default: false},
    loja: { type: Schema.Types.ObjectId, ref: "Loja", required: true }

}, {timestamp: true});

PedidoSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("Pedido", PedidoSchema);