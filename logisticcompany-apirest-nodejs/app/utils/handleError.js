const handleHttpError = (res, message = "Algo sucedio", code = 403) => {
    res.status(code);
    res.send({ 
        code: code, 
        error: message 
    });
};
  
module.exports = { handleHttpError };