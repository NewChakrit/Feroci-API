const express = require('express');
const authenticate = require('../middlewares/authenticate');
const performanceController = require('../controllers/performanceController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', performanceController.getPerformance);

router.post(
    '/',
    authenticate,
    upload.single('img'),
    performanceController.createPerformance
);
router.delete('/:id', authenticate, performanceController.deletePerformance);

module.exports = router;
