const mongoose = require("mongoose");

const Avaliacao = mongoose.model("Avaliacao");
const Produto = mongoose.model("Produto");

class VariacaoController {

    // GET /
    async index(req,res,next){
        const { loja, produto } = req.query;
        try {
            const variacoes = await Variacao.find([ loja, produto]);
            return res.send({ variacoes });
        } catch(e){
            next(n);
        }
    }

    // GET /:id
    async show(req,res,next){
        const { loja, produto } = req.query;
        const { id: _id } = req.params;
        try {
            const variacao = await Variacao.findOne({ _id, loja, produto });
            return res.send({ variacao });
        } catch(e){
            next(e)
        }
    }

    // POST / - store
    async store(req,res,next){
        const { codigo, nome, preco, promocao, fotos, entrega, quantidade } = req.body;
        const { loja, produto } = req.query;
        try {
            const variacao = new Variacao({ codigo, nome, preco, promocao, fotos, entrega, quantidade, loja, produtos });

            const _produto =  await Produto.findById(produto);
            if(!_produto) return res.status(400).send({ error: "Produto não encontrado"});
            _produto.variacao.push(variacao._id);

            await _produto.save();
            await variacao.save();
            return res.send({ variacao });
        }catch(e){
            next(e);
        }
    }

    // DELETE /:id - remove
    async remove(req,res,next){
        try{
            const avaliacao = await Avaliacao.findById(req.params.id);

            const produto = await Produto.findById(avaliacao.produto);
            produto.avaliacao = produto.avaliacoes.filter(item => item.toString() !== avaliacao._id.toString());
            await avaliacao.save();

            await avaliacao.deleteOne();
            return res.send({ deletado: true});
        }catch(e){
            next(e);
        }
    }
}

module.exports = AvaliacaoController;