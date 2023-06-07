const express = require('express');
const { createPackage, updatedPackage, getPackage, getPackages, deletePackage, getPackagesHistorys } = require('../controllers/mongodb/package');
const { authMiddleware, isAdmin, isAdminEmployee } = require("../middleware/auth");
const router  = express.Router();

router.post  (        "/add-package", authMiddleware, createPackage);
router.put   ( "/update-package/:id", authMiddleware, isAdminEmployee, updatedPackage);
router.get   (    "/get-package/:id", authMiddleware, getPackage);
router.get   (       "/get-packages", authMiddleware, getPackages);
router.get   ("/get-packagehistorys", authMiddleware, isAdminEmployee, getPackagesHistorys);
router.delete( "/delete-package/:id", authMiddleware, isAdmin, deletePackage);

module.exports = router;