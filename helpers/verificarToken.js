const jwt = require('jsonwebtoken');
const chaveJWT = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json('Token nao fornecido');
    }

    jwt.verify(token, chaveJWT, (err, decoded) => {
        if (err) {
            return res.status(401).json('Token invalido');
        }

        req.usuario = decoded;
        next();
    });
}

module.exports = verificarToken;
