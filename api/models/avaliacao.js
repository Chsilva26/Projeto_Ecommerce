const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AvaliacaoSchema = Schema ({
    nome: { type: String, required: true},
    texto: { type: String, default: "" },
    pontuacao: { type: Number, required: true},
    produto: { type: Schema.Types.ObjectId, ref: "Produto", required: true},
    loja: { type: Schema.Types.ObjectId, ref: "Loja", required: true},
}, { timestamps: true });

module.exports = mongoose.model("Avaliacao", AvaliacaoSchema);