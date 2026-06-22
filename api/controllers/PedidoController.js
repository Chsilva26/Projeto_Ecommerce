const mongoose = require("mongoose");

const Pedido = mongoose.model("Pedido");
const Produto = mongoose.model("Produto");
const Variacao = mongoose.model("Variacao");
const Pagamento = mongoose.model("Pagamento");
const Entrega = mongoose.model("Entrega");
const Cliente = mongoose.model("Cliente");
const Usuario = mongoose.model("Usuario");

const CarrinhoValidation = require("./validacoes/carrinhoValidation");
const variacao = require("../models/variacao");
const { off } = require("../models/usuario");
const usuario = require("../models/usuario");

class PedidoController {
    //ADMiN
    // get /admin indexadmin
    async indexAdmin (req, res, next){
        const { offset, limit, loja} = req.query;
        try {
            const pedidos = await Pedido.paginate(
                { loja },
                { 
                    offset: Number(offset || 0),  
                    limit: Number(offset || 30), 
                    populate: ["cliente", "pagamento", "entrega"]
                }
            );
            pedidos.docs = await Promise.all(pedidos.docs.map(async (pedidos) => {
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return pedido;
            }));
            return res.send({ pedidos });
        } catch(e){
            next(e);
        }
    }



    // get /admin/:id showadmin
    async showAdmin(req, res, next){ 
        try{
            const pedido = await Pedido.findOne({ loja: req.query.loja, _id: req.params.id}).populate(["cliente", "pagamento", "entrega"]);
            
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return res.send({ pedido });
        }catch(e){
            next(e);
        }
    }

    // delete /admin/:id removeadmin
    async removeAdmin(req, res, next){
        try {
            const pedido = await Pedido.findOne({ loja: req.query.loja, _id: req.params.id});
            if(!pedido) return res.status(400).send({ error: "Pedido Não Encontrado"});
            pedido.cancelado = true;

            // Registro de atividade = pedido cancelado
            // Enviar email para cliente  = pedido cancelado

            await pedido.save();

            return res.send({ cancelado: true });
        }catch(e){
            next(e);
        }
    }

    // get /admin/:id/carrinho showCarrinhoPedidoAdmin
    async showCarrinhoPedidoAdmin(req, res, next){ 
        try{
            const pedido = await Pedido.findOne({ loja: req.query.loja, _id: req.params.id});
            
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return res.send({ carrinho: pedido.carrinho });
        }catch(e){
            next(e);
        }
    }

    // CLIENTE
    // get /index
    async index (req, res, next){
        const { offset, limit, loja} = req.query;
        try {
            const cliente = await Cliente.findById({ usuario: req.payload.id });
            const pedidos = await Pedido.paginate(
                { loja, cliente: cliente._id },
                { 
                    offset: Number(offset || 0),  
                    limit: Number(offset || 30), 
                    populate: ["cliente", "pagamento", "entrega"]
                }
            );
            pedidos.docs = await Promise.all(pedidos.docs.map(async (pedidos) => {
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return pedido;
            }));
            return res.send({ pedidos });
        } catch(e){
            next(e);
        }
    }

    // get /:id show
    async show (req, res, next){ 
        try{
            const cliente = await Cliente.findById({ usuario: req.payload.id });
            const pedido = await Pedido.findOne({ cliente: cliente._id, id: req.params.id }).populate(["cliente", "pagamento", "entrega"]);
            
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return res.send({ pedido });
        }catch(e){
            next(e);
        }
    }

    // post /store
    async store (req,res, next){
        const {cliente, carrinho, pagamento, entrega} = req.body;
        const { loja } = req.query;

        try {

            // CHECAR DADOS DO CARRINHO

        }catch(e){
            next(e);
        }
    }

    // delete /:id remove
    async remove 
(req, res, next){
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            if(!cliente) return res.status(400).send({ error: "Cliente Não Encontrado"});
            const pedido = await Pedido.findOne({ cliente: cliente._id, _id: req.params.id });
            if(!pedido) return res.status(400).send({ error: "Pedido Não Encontrado"});
            pedido.cancelado = true;

            // Registro de atividade = pedido cancelado
            // Enviar email para admin  = pedido cancelado

            await pedido.save();

            return res.send({ cancelado: true });
        }catch(e){
            next(e);
        }
    }
    // get /:id/carrinho ShowCarrinhoPedido
    async showCarrinhoPedido(req, res, next){ 
        try{
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            const pedido = await Pedido.findOne({ cliente: cliente._Id, _id: req.params.id});
            
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return res.send({ carrinho: pedido.carrinho });
        }catch(e){
            next(e);
        }
    }

}

module.exports = PedidoController;