const checkOrigin = (req, res, next) => { 
    /**
     * HEADER
     */
    const token = req.headers.authorization.split(' ').pop();
    if(token === '123456') {
        next();
    } else {
        res.status(409);
        res.send({ error: 'No authorization' });
    }   
    
};

module.exports = checkOrigin;