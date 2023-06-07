const httpError = (res, err) => { 
    res.status(500);
    res.send({ error: "ERROR " + err });
};
module.exports = { httpError };