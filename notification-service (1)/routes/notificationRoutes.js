
/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Send a new notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [email, sms, in-app]
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification queued
 *
 * /users/{id}/notifications:
 *   get:
 *     summary: Get notifications for a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of user notifications
 */

const express = require('express');
const router = express.Router();
const { sendNotification, getUserNotifications } = require('../controllers/notificationController');

router.post('/', sendNotification);
router.get('/users/:id/notifications', getUserNotifications);

module.exports = router;
