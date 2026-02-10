const mongoose = require("mongoose");
const usuario = require("../../models/usuario");
const Usuario = mongoose.model("Usuario");
const loja = mongoose.model("Loja");

const Joi = require("joi");


const LojaValidation = {
    admin: (req,res,next) => {
        console.log("HEADERS:", req.headers.authorization);
        console.log("PAYLOAD:", req.payload);
        if(!req.payload.id) return res.sendStatus(401);
        const { loja } = req.query;
        if(!loja) return res.sendStatus(401);
        Usuario.findById(req.payload.id).then(usuario => {
            if(!usuario) return res.sendStatus(401);
            if(!usuario.loja) return res.sendStatus(401);
            if(!usuario.permissao.includes("admin")) return res.sendStatus(401);
            if(usuario.loja.toString() !== loja) return res.sendStatus(401);
            next();
        }).catch(next);
    },
    show: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        body: {
            nome: Joi.string().required(), 
            cnpj: Joi.string().length(18).required(), 
            email: Joi.string().email().required(), 
            telefones: Joi.array().items(Joi.string()).required(),
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string().optional(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                CEP: Joi.string().required(),
            }).required()
    
        }
    },
    update: {
        body:{
            nome: Joi.string().required(), 
            cnpj: Joi.string().length(18).required(), 
            email: Joi.string().email().required(), 
            telefones: Joi.array().items(Joi.string()).required(),
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string().optional(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                CEP: Joi.string().required(),
            }).optional()
        }
    }   
}    

module.exports = { LojaValidation };