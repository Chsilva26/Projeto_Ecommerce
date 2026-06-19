const { required, timestamp } = require("joi/lib/types/date");
const { ref } = require("joi/lib/types/func");
const { type, schema } = require("joi/lib/types/object");

const mongoose = require("mongoose"),
    mongoosePaginate = require("mongoose-paginate"),
    Schema = mongoose.Schema;

const EntregaSchema = Schema({
    status: { type: String, required: true},
    codigoRastreamento: { type: String},
    tipo: { type: String, required: true},
    preco: { type: Number, required: true},
    prazo: { type: Number, required: true},
    pedido: { type: Schema.ObjectId, ref: "Pedido", required: true},
    loja: { type: Schema.ObjectId, ref: "Loja", required: true},
    payload: { type: Object}

}, {timestamp: true });

EntregaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Entrega", EntregaSchema);