const { expressjwt: jwt } = require('express-jwt');
const secret = require("../../config").secret;

function getTokenFromHeader(req){
    // console.log("AUTH HEADER", req.headers.authorization)

    if(!req.headers.authorization) return null;
    const token = req.headers.authorization.split(" ");
    if(token[0] !== "Ecommerce") return null;
    return token[1];
}

// "Ecommerce"

const auth = {
    required: jwt({
        secret,
        algorithms: ['HS256'],
        requestProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        secret,
        algorithms: ['HS256'],
        requestProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;

