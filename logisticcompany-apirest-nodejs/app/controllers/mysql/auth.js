const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../..//utils/handlePassword");
const { tokenSign } = require("../../utils/handleJwt");
const { handleHttpError } = require("../../utils/handleError");
const { usersModel } = require("../../models");
const dbConnect_MySQL = require('../../../config/mysql/mysql');
const jwt = require('jsonwebtoken');

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
  try{
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
  
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.status(201)
    res.send({ data });
  }catch(e){
    console.log(e)
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
};

function verifyToken(req,res, next){
  if(!req.headers.authorization) return res.status(401).json('No autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
    const content = jwt.verify(token,'stil');
    req.data = content;
    next();
  }else{
    res.status(401).json('Token vacio');
  }

}

/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
  try{
    const { username, password } = req.body;
    dbConnect_MySQL.query("SELECT * FROM 0_Usrs WHERE Usrnm = ? AND Psswrd = ?", [username, password], (err, rows, fileds) => {
      if(!err) {
        if(rows.length > 0) {
          let data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, 'stil');
        res.json({rows, token});
        } else {
          res.json("Usuario o clave incorrectos " + req.body.username);
        }
      } else {

      }
    });

  }catch(e){
    console.log(e)
    handleHttpError(res, "ERROR_LOGIN_USER")
  }
}

module.exports = { registerCtrl, loginCtrl, verifyToken };