const { required, timestamp } = require("joi/lib/types/date");
const { ref } = require("joi/lib/types/func");
const object = require("joi/lib/types/object");
const { type, schema } = require("joi/lib/types/object");

const mongoose = require("mongoose"),
    mongoosePaginate = require("mongoose-paginate"),
    Schema = mongoose.Schema;

const PagamentoSchema = Schema({
    valor: { type: Number, required: true },
    forma: { type: String, required: true },
    parcelado: { type: Object},
    parcelado: { type: String, required: true },
    pedido: { type: Schema.ObjectId, ref: "Pedido", required: true },
    loja: { type: Schema.ObjectId, ref: "Loja", required: true },
    payload: { type: Object }


}, {timestamp: true });

PagamentoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Pagamento", PagamentoSchema);