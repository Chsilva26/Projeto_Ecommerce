const date = require("joi/lib/types/date");
const { timestamp } = require("joi/lib/types/date");
const { type } = require("joi/lib/types/object");
const string = require("joi/lib/types/string");
const mongoose = require("mongoose");
    Schema = mongoose.Schema;

const RegistroPredidoSchema = Schema({
    pedido: {type: Schema.Types.ObjectId, ref: "Pedido", required: true},
    tipo: {type: String, required: true},
    situacao: {type: String, required: true},
    data: {type: Date, default: date.now}
}, {timestamp: true});

module.exports = mongoose.model("RegistroPedido", RegistroPredidoSchema);