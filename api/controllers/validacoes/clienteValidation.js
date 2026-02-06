const Joi = require("joi");
const { Query } = require("mongoose");

const ClienteValidation = {
    index: {
        query: {
            offset: Joi.number(),
            limit: Joi.number()
        }
    },
    search: {
        query: {
            offset: Joi.number(),
            limit: Joi.number()
        },
        params: {
            search: Joi.string().required()
        }
    },
    showAdmin: {
        params: {
            search: Joi.string().alphanum().length(24).required()
        }
    },
    updateAdmin: {
        params: {
            search: Joi.string().alphanum().length(24).required()
        },
        body: {
            nome: Joi.string().optional(),            nome: Joi.string().optional(),
            cpf: Joi.string().length(14).optional(), 
            email: Joi.string().email().optional(), 
            telefones: Joi.array().items(Joi.string()).optional(), 
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().required(),
                CEP: Joi.string().required(),
            }).optional(), 
            dataDeNascimento: Joi.date().iso().optional()
        }
    },
    show: {
        query: {
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        query: {
            loja: Joi.string().alphanum().length(24).required()
        },
        body: {
            nome: Joi.string().required(),
            password: Joi.string().required(),
            cpf: Joi.string().length(14).required(), 
            email: Joi.string().email().required(), 
            telefones: Joi.array().items(Joi.string()).required(), 
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().required(),
                CEP: Joi.string().required(),
            }).required(), 
            dataDeNascimento: Joi.date().iso().required()
        }
    },
    update: {
        query: {
            loja: Joi.string().alphanum().length(24).required()
        },
        params: {
            search: Joi.string().alphanum().length(24).required()
        },
        body: {
            password: Joi.string().optional(),
            nome: Joi.string().optional(),
            cpf: Joi.string().length(14).optional(), 
            email: Joi.string().email().optional(), 
            telefones: Joi.array().items(Joi.string()).optional(), 
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().required(),
                CEP: Joi.string().required(),
            }).optional(), 
            dataDeNascimento: Joi.date().iso().optional()
        }
    }
};

module.exports = { ClienteValidation };