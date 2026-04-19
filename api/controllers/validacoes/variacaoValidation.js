const Joi = require("joi");
const { Query } = require("mongoose");

const VariacaoValidation = {
    index: {
        query: {
            loja: joi.string().alphanum().length(24).required(),
            produto: joi.string().alphanum().length(24).required()
        }
    },
    show: {
        query: {
            loja: joi.string().alphanum().length(24).required(),
            produto: joi.string().alphanum().length(24).required()
        },
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    store: {
        query: {
            loja: joi.string().alphanum().length(24).required(),
            produto: joi.string().alphanum().length(24).required()
        },
        body: {
             codigo: joi.string().required(),
             nome: joi.string().required(),
             preco: joi.number().required(),
             promocao: joi.number().optional(),
             entrega: joi.object({
                dimensoes: joi.object({
                    alturaCm:joi.number().required(),
                    larguraCm:joi.number().required(),
                    profundidadeCm:joi.number().required(),
                }).required(),
                pesoKg: joi.number().required(),
                freteGratis: joi.boolean().optional(),
             }).required(),
             quantidade: joi.number().optional()
        }
    },
    update: {
        query: {
            loja: joi.string().alphanum().length(24).required(),
            produto: joi.string().alphanum().length(24).required()
        },
        params: {
            id: joi.string().alphanum().length(24).required()
        },
        body: {
             codigo: joi.string().optional(),
             nome: joi.string().optional(),
             preco: joi.number().optional(),
             promocao: joi.number().optional(),
             disponibilidade: joi.boolean().optional(),
             entrega: joi.object({
                dimensoes: joi.object({
                    alturaCm:joi.number().required(),
                    larguraCm:joi.number().required(),
                    profundidadeCm:joi.number().required(),
                }).required(),
                pesoKg: joi.number().required(),
                freteGratis: joi.boolean().optional(),
             }).optional(),
             quantidade: joi.number().optional()
        }
    },
    updateImages:{
        query: {
            loja: joi.string().alphanum().length(24).required(),
            produto: joi.string().alphanum().length(24).required()
        },
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    },
    remove: {
        query: {
            loja: joi.string().alphanum().length(24).required(),
            produto: joi.string().alphanum().length(24).required()
        },
        params: {
            id: joi.string().alphanum().length(24).required()
        }
    }
};

module.exports = { VariacaoValidation };