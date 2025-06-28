const express = require('express');
const router = express.Router();

const AdminDashController = require('../../controller/admin/AdminDash.controller');
const StaticController = require('../../controller/admin/staticController');


router.get('/dashboard',StaticController.adminDashboardPg)
router.get('/trainer-management',StaticController.coachMgtPg)

router.get('/client-management',StaticController.clientMgtPg)
router.get('/package-management',StaticController.packageMgtPg)


router.get('/library-management',StaticController.workoutLibraryPg)
router.get('/enquiry-management',StaticController.enquiryMgtPg)


router.get('/category-management',StaticController.categoryMgtPg)



module.exports = router;