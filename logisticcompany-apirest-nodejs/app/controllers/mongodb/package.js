const Package              = require('../../models/mongodb/package');
const PackageHistory       = require('../../models/mongodb/packagehistory');
const asyncHandler         = require("express-async-handler");
const { validateMongDbId } = require('../../utils/validateMongodbId');
const crypto               = require("crypto");
const { sendEmail }        = require("./email");

const createPackage = asyncHandler(async (req, res) => {
    const trackingNumber    = req.body.trackingNumber;
    const findPackage = await Package.findOne({trackingNumber:trackingNumber});
    const loginUserId  = req?.user?._id;
    if(!findPackage) {
        const newPackage     = await Package.create(req.body);

        await PackageHistory.create({
            idReference:newPackage.id,
            trackingNumber:newPackage.trackingNumber, 
           currentLocation:newPackage.currentLocation, 
              deliveryDate:newPackage.deliveryDate,
                     owner:loginUserId,
        });
        res.json(newPackage);
    } else {
        await PackageHistory.create({
            idReference:findPackage._id,
            trackingNumber:findPackage.trackingNumber, 
           currentLocation:findPackage.currentLocation, 
              deliveryDate:findPackage.deliveryDate,
                     owner:loginUserId,
                     action:"Created Package Already Exists.",
        });
        throw new Error("Package Already Exists.");
    }
});

// Get all packages
const getPackages = asyncHandler(async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch(error) {
        throw new Error(error);
    }
});

// Get all packages
const getPackagesHistorys = asyncHandler(async (req, res) => {
    try {
        const packageshistorys = await PackageHistory .find();
        res.json(packageshistorys);
    } catch(error) {
        throw new Error(error);
    }
});

// Update a user
const updatedPackage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    const loginUserId  = req?.user?._id;
    const { trackingNumber, currentLocation, deliveryDate } = req.body;
    try {
        const packageHistory = await PackageHistory.create({
            idReference:id,
            trackingNumber:trackingNumber, 
           currentLocation:currentLocation, 
              deliveryDate:deliveryDate,
                     owner:loginUserId,
                     action:"Updated",
        });
        const package = await Package.findByIdAndUpdate(id, {
             trackingNumber:trackingNumber, 
            currentLocation:currentLocation, 
               deliveryDate:deliveryDate,
                      owner:loginUserId,
        },
        {
            new:true,
        });
        res.json({
            package,
        });
    } catch(error) {
        throw new Error(error);
    }
});

// Get a single package
const getPackage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const package = await Package.findById(id);
        res.json({
            package,
        });
    } catch(error) {
        throw new Error(error);
    }
});

// Get a single package
const deletePackage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const package = await Package.findById(id);
        const packageHistory = await PackageHistory.create({
            idReference:package._id,
            trackingNumber:package.trackingNumber, 
           currentLocation:package.currentLocation,
           status:package.status,
           locationHistory:package.locationHistory,
           deliveryDate:package.deliveryDate,
            owner:package.owner,
              deliveryDate:package.deliveryDate,
                     owner:package.loginUserId,
                     action:"Deleted",
                     sendEmail:package.sendEmail,
                    sendSMS:package.sendSMS,
        });
        const packagedeleted = await Package.findByIdAndDelete(id);
        res.json({
            packagedeleted,
        });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { createPackage, getPackages, getPackage, updatedPackage, deletePackage, getPackagesHistorys, };