const express = require('express');
const router = express.Router();

const AdminDashController = require('../../controller/admin/AdminDash.controller');

// /api/admin/coaches/${coachId}/status
router.get('/coaches', AdminDashController.allCoaches);
router.get('/coaches/:id/status',AdminDashController.blockCoach)
router.post('/coaches/update/:id',AdminDashController.updateCoach)
router.post('/coaches/add',AdminDashController.addCoach)

router.get('/clients',AdminDashController.allClients)
router.post('/clients',AdminDashController.addClient)
router.get('/clients/:id/status',AdminDashController.blockClient)
router.post('/clients/update/:id',AdminDashController.updateClient)

router.get('/packages',AdminDashController.allPackages)
router.post('/packages/add',AdminDashController.addPackage)
router.post('/packages/update/:id',AdminDashController.updatePackage)
router.get('/packages/inactive/:id',AdminDashController.blockPackage)

module.exports = router