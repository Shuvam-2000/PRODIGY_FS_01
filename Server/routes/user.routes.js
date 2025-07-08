import express from 'express';
import { userRegistration, userLogin } from '../controllers/user.controller.js';

// initialize router
const router = express.Router();

// user register route
router.post('/signup', userRegistration)

// login route
router.post('/login', userLogin);

export default router;