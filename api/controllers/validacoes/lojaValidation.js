const mongoose = require("mongoose");
const usuario = require("../../models/usuario");

const Usuario = mongoose.model("Usuario");
const loja = mongoose.model("Loja");

module.exports = (req,res,next) => {
    if(!req.payload.id) return res.sendStatus(401);
    const { loja } = req.query;
    if(!loja) return res.sendStatus(401);
    Usuario.findById(req.payload.id).then(usuario => {
        if(!usuario) return res.sendStatus(401);
        if(!usuario.loja) return res.sendStatus(41);
        if(!usuario.permissao.includes("admin")) return res.sendStatus(401);
        if(usuario.loja !== loja) return res.sendStatus(401);
        next();
    }).catch(next);
}