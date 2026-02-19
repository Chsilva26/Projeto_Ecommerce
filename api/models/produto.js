const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const ProdutoSchema = Schema({
    titulo: { type: String, required: true},
    disponibilidade: { type: Boolean, default: true},
    descricao: { type: String, required: true},
    preco: { type: Number, required: true},
    preco: { type: Number },
    sku: { type: Number, required: true},
    categoria: { type: Schema.Types.ObjectId, ref:"Categoria" },
    loja: { type: Schema.Types.ObjectId, ref:"Loja" },
    avaliacoes: { type: Schema.Types.ObjectId, ref:"Avaliacoes" },
    variacoes: { type: Schema.Types.ObjectId, ref:"Variacoes" },
}, { timestamps: true });

ProdutoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Produto", ProdutoSchema);