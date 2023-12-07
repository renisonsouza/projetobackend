const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json("Token não fornecido");
    }

    jwt.verify(token, "chave-jwt", (err, decoded) => {
        if (err) {
            return res.status(401).json("Token inválido");
        }

        req.usuario = decoded; 
        next();
    });
}

module.exports = verificarToken;
