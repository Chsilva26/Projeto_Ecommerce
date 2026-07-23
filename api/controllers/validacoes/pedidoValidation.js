const joi = require("Joi");
const { loja } = require("../../config");

const PedidoValidation = {
    // ADMIN
    indexAdmin: {
        query: {
            offset: joi.number().required(),
            limit: joi.number().required()
        }
    },
    showAdmin: {
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    removeAdmin: {
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    showCarrinhoPedidoAdmin: {
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    // CLIENTE
    index: {
        query: {
            offset: joi.number().required(),
            limit: joi.number().required(),
            loja: joi.string().alphanum().length(24).required()
        }
    },
    show: {
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    remove: {
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    showCarrinhoPedido: {
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    store: {
        query: {
            loja: joi.string().alphanum().length(24).required()
        }, 
        body: {
            carrinho: joi.array().items(joi.object({
                produto: joi.string().alphanum().length(24).required(),
                variacao: joi.string().alphanum().length(24).required(),
                precoUnitario: joi.number().required(),
                quantidade: joi.number().required()
            })).required(),
            pagamento: joi.object({
                valor: joi.number().required(),
                forma: joi.string().required()
            }).required(),
            entrega: joi.object({
                custo: joi.number().required(),
                tipo: joi.string().required(),
                prazo: joi.number().required()
            }).required()
        }
    }
};

module.exports = { PedidoValidation };
