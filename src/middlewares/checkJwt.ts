const jwt = require('jsonwebtoken');

function checkJWT (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Доступ запрещен');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.log(verified);
        next();
    } catch(err) {
        res.status(400).send('Недостаточно прав.');
    }
}




export default checkJWT; 
