const mongoose = require("mongoose");
const { loja } = require("../config");

const Categoria = mongoose.model("Categoria");

class CategoriaController {
    // GET / index
    index(req,res,next){
        Categoria.find({ loja: req.query.loja })
        .select("_id produtos nome codigo loja")
        .then((categorias) => res.send({categorias}))
        .catch(next);
    }

    // GET /disponiveis
    indexDisponiveis(req,res,next){
        Categoria.find({ 
            loja: req.query.loja, 
            disponibilidade: true, 
        })
        .select("_id produtos nome codigo loja")
        .then((categorias) => res.send({ categorias }))
        .catch(next);
        // Categoria.find().then(console.log);
        
    }

    // GET /:id show
    show(req,res,next){
        Categoria.findOne({ loja: req.query.loja, _id: req.params.id })
        .select("_id produtos nome codigo loja")
        .then((categoria) => res.send({categoria}))
        .catch(next);
    }

    // POST /store
    store(req,res,next){
        const { nome, codigo } = req.body;
        const { loja } = req.query;

        console.log("loja recebida: ", loja)
        console.log("loja recebida: ", req.query.loja)

        if(!loja) 
            return res.status(400).send({ error: "loja não informada"})

        const categoria = new Categoria ({ 
            nome, 
            codigo, 
            loja: new mongoose.Types.ObjectId(loja), 
            disponibilidade: true
        });
        
        categoria.save()
        .then(() => res.send({ categoria }))
        .catch(next);
    }

    // PUT /:id update
    async update(req,res,next){
        const { nome,codigo, disponibilidade, produtos } = req.body;
        try {
            const categoria = await Categoria.findById(req.params.id);

            if (nome) categoria.nome = nome;
            if (disponibilidade !== undefined) categoria.disponibilidade = disponibilidade;
            if (codigo) categoria.codigo = codigo;
            if (produtos) categoria.produtos = produtos;

            await categoria.save();
            return res.send({ categoria });
        } catch(e){
            next(e);
        }
    }

    // DELETE /:id /remove
    async remove(req,res,next){
        try {
            const categoria = await Categoria.findById(req.params.id);
            await categoria.deleteOne();
            return res.send({ deletado: true});
        }catch(e){
            next(e);
        }
    }

    // *** PRODUTOS ***
    // GET /:id/produtos - showProdutos
    async showProdutos(req,res,next){
        const { offset, limit } = req.body;
        try {
            const produtos = await Produto.paginate(
                { categoria: req.params.id },
                { offset: Number(offset) || 30, limit: Number(limit) || 30}
            );
            return res.send({ produtos });
        } catch(e){
            next(e);
        }
    }

    // PUT /:id/produtos - updateProdutos
    async updateProdutos(req,res,next){
        try {
            const categoria = await Categoria.findById(req.params.id);
            const { produtos } = req.body;
            if(produtos) categoria.produtos = produtos;
            await categoria.save();

            let _produtos = await Produto.find({
                $or: [
                    { categoria: req.params.id },
                    { _id: { $in: produtos } } 
                ]
            });
            _produtos = await Promise.all(this._produtos.map(async (produto) => {
                if(!produto.includes(produto._id.toString())) {
                    produto.categoria = null;
                } else {
                    produto.categoria = req.params.id;
                }
                await produto.save();
                return produto;
            }));

            const resultado = await Produto.paginate({ categoria: req.params.id }, { offset: 0, limit: 30});
            return res.send({ produtos: resultado });
        } catch(e){
            next(e);
        }
    }
    
};

module.exports = CategoriaController;