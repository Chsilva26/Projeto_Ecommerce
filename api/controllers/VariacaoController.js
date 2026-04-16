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
            next(e);
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

    // PUT / - update
    async update(req,res,next){
        const { codigo, disponibilidade, nome, preco, promocao, fotos, entrega, quantidade } = req.body;
        const { loja, produto } = req.query;
        const { id:_id } = req.params;
        try {
            const variacao = await Variacao.findOne({ loja, produto, _id });
            if(!variacao) return res.status(400).send({ error: "Variação não encontrada" });

            if( codigo ) variacao.codigo = codigo;    
            if( disponibilidade !== undefined ) variacao.disponibilidade = disponibilidade;    
            if( nome ) variacao.nome = nome;    
            if( preco ) variacao.preco = preco;    
            if( promocao ) variacao.promocao = promocao;    
            if( entrega ) variacao.entrega = entrega;    
            if( quantidade ) variacao.quantidade = quantidade;    

            await variacao.save();
            return res.send({ variacao });
        }catch(e){
            next(e);
        }
    }

    // PUT /images/:id - updateImages
    async uploadImages(req, res, next){
        const { loja, produto } = req.query;
        const { id:_id } = req.params;

        try {
            const variacao = await Variacao.findOne({ loja, produto, _id });
            if(!variacao) return res.status(400).send({ error: "Variação não encontrada" });

            const novasImagens = req.files.map(item => item.filename);
            variacao.fotos = variacao.fotos.filter(item => item.concat(novasImagens));

            await variacao.save();
            return res.send({ variacao });
        }catch(e){
            next(e);
        }
    }

    // DELETE /:id - remove
    async remove(req,res,next){
        const { loja, produto } = req.query;
        const { id:_id } = req.params;
        try {
            const variacao = await Variacao.findOne({ loja, produto, _id });
            if(!variacao) return res.status(400).send({ error: "Variação não encontrada" });

            const produto = await Produto.findById(variacao.produto);
            produto.variacoes = produto.variacoes.filter(item => item.toString() !== variacao._id.toString());
            await _produto.save();

            await variacao.deleteOne();
            return res.send({ deletado: true});
        }catch(e){
            next(e);
        }
    }

}

module.exports = AvaliacaoController;