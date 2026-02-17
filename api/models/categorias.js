const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriaSchema = Schema({
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    disponibilidade: { type: Boolean, default: true },
    produtos: { type: [{type: Schema.Types.ObjectId, ref: "Produto"}] },
}, {timetamps: true});

module.exports = mongoose.model("Categoria", CategoriaSchema);