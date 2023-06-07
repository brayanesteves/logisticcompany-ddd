const { httpError }     = require('../../helpers/handleError');
const { storage }       = require('../../utils/storage');
const dbConnect_MySQL   = require('../../../config/mysql/mysql');

const getItems = async (req, res) => {
    try {
        dbConnect_MySQL.query("SELECT * FROM `0_Usrs`;", (err, rows, fields) => {
            if(!err) {
                res.json(rows);
            } else {
                res.send({ error: 'ERROR ' + err });
            }
        });   
    } catch (e) {
        httpError(res, e);
    }
};

const getItem   = async (req, res) => { 
    console.log("Hola");
};

const getItemByReference = async (req, res) => {
    const reference = req.params.Rfrnc;
    const response = await dbConnect_MySQL.query("SELECT * FROM `0_Usrs` WHERE `Rfrnc` = $1;", [reference]);
    res.json(response.rows);
};

const getItemByUsername = async (req, res) => {

};

const createItem = async (req, res) => {
    try {
        // Usrnm, Psswrd, Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm
        let Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm;
        Rfrnc_Prsn   = 1;
        UsrTyp_Rfrnc = 3;
        Cndtn        = 1;
        Rmvd         = 0;
        Lckd         = 0;
        DtAdmssn     = "0001-01-01";
        ChckTm       = "00:00:00";
        const { Usrnm, Psswrd } = req.body;
        const addUser = await dbConnect_MySQL.query('INSERT INTO `0_Usrs`(`Usrnm`, `Psswrd`, `Rfrnc_Prsn`, `UsrTyp_Rfrnc`, `Cndtn`, `Rmvd`, `Lckd`, `DtAdmssn`, `ChckTm`) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [Usrnm, Psswrd, Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm]);
        res.json({ 
            message: `User ${Usrnm} added succesfully.`,
            body: {
                user: { Usrnm, Psswrd, Rfrnc_Prsn, UsrTyp_Rfrnc, Cndtn, Rmvd, Lckd, DtAdmssn, ChckTm }
            } 
        });
    } catch (e) {
        httpError(res, e);
    }
};

const updateItem = async (req, res) => {

};

const updateItemByReference = async (req, res) => {
    const reference = req.params.Rfrnc;
    const response = await dbConnect_MySQL.query("UPDATE `0_Usrs` SET `Usrnm` = $1 WHERE `Rfrnc` = $2;", [Usrnm, reference]);
    res.json({ 
        message: `User ${Usrnm} updated su`,
        body: {
            response
        }
    });
};

const updateItemByUsername = async (req, res) => {

};

const deleteItem = async (req, res) => {

};

const deleteItemByReference = async (req, res) => {
    const reference = req.params.Rfrnc;
    const response = await dbConnect_MySQL.query("DELETE FROM `0_Usrs` WHERE `Rfrnc` = $1;", [reference]);
    res.json({ message: `User ${reference} deleted success.` });
};

const deleteItemByUsername = async (req, res) => {

};

module.exports = { getItems, getItem, getItemByReference, getItemByUsername, createItem, updateItem, updateItemByReference, updateItemByUsername, deleteItem, deleteItemByReference, deleteItemByUsername };