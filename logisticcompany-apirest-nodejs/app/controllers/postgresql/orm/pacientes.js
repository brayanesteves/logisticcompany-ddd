const { DB, TYPE_FORMAT } = require('../../../utils/handleEnv');
const { sequelize_pg }                   = require('../../../../config/postgresql/sequalize-pg');
const { handleHttpError }                = require('../../../utils/handleError');
const { paciente }                       = require(`../../../models/${DB}/${TYPE_FORMAT}/paciente`);

const getItems = async (req, res) => {
    try {
        const pacientes = await paciente.findAll();
        res.status(200).json({ 
            message: 'Successfull',
            result: pacientes
        });
    } catch (e) {
        handleHttpError(res, e);
    }
};

const getItem   = async (req, res) => { 
};

const getItemByReference = async (req, res) => {
    
};

const getItemByPatient = async (req, res) => {
    try {
        const id = req.params.id;
        const findByOne = await paciente.findOne({
            where: {
                id: id
            }
        });
        if(!findByOne) {
            return res.status(404).json({
                message: 'Not found',
                result: `${id} No exist.`
            });
        }
        res.status(200).json({ 
            message: 'Successfull',
            result: findByOne
        });
    } catch (e) {
        console.log(e)
        handleHttpError(res, e);
    }
};

const createItem = async (req, res) => {
    try {
        let { id, firstName, lastName, email, phone } = req.body;
        const findByOne = await paciente.findOne({
            where: {
                id: id
            }
        });
        if(findByOne !== null) {
            res.status(200).json({ 
                message: 'Found',
                result: `Document ${id} exist.`
            });
        }
        const newPaciente = await paciente.create({
                    id: id,
            firstName: firstName,
             lastName: lastName,
                 email: email,
                 phone: phone
        });
        res.status(200).json({ 
            message: 'Successfull',
            result: newPaciente.dataValues
        });
    } catch (e) {
        console.log(e)
        handleHttpError(res, e);
    }
};

const updateItem = async (req, res) => {

};

const updateItemByReference = async (req, res) => {
    try {
        const patientId  = req.params.Rfrnc;
        let { id, firstName, lastName, email, phone } = req.body;
        const findPrimaryKey = await paciente.findByPk(patientId);
        if(findPrimaryKey === null) {
            res.status(403).json({ 
                message: 'Not found',
                result: patientId
            });
        }

        findPrimaryKey.id        = id;
        findPrimaryKey.firstName = firstName;
        findPrimaryKey.lastName  = lastName;
        findPrimaryKey.email     = email;
        findPrimaryKey.phone     = phone;      
        await findPrimaryKey.save();

        res.status(200).json({ 
            message: 'Successfull',
            result: findPrimaryKey
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
};

const updateItemByPatient = async (req, res) => {

};

const deleteItem = async (req, res) => {

};

const deleteItemByReference = async (req, res) => {
    try {
        const patientId  = req.params.Rfrnc;
        await paciente.destroy({
            where:{ 
                patientId,
            }
        });
        res.status(200).json({ 
            message: 'Successfull',
            result: `User ${patientId} deleted success.` 
        });
    } catch (e) {
        handleHttpError(res, e);
    }    
};

const deleteItemByPatient = async (req, res) => {

};


module.exports = { getItems, getItem, getItemByReference, getItemByPatient, createItem, updateItem, updateItemByReference, updateItemByPatient, deleteItem, deleteItemByReference, deleteItemByPatient };