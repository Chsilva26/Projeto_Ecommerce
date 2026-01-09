module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "FDWSOKJ43XXKJOJ43OJ32KOJV7OÇ78UGDF2YTUH6IGHREEBIG4IG6I8A9G4IZOOGUG3GY7GI0IUG5IUG4IUGI3G",
    api: process.env.NODE_ENV == "production " ? "https//api.loja-teste.ampliee.com" : "https//localhost:3000",
    loja: process.env.NODE_ENV == "production " ? "https//loja-teste.ampliee.com" : "https//localhost:8000",
};