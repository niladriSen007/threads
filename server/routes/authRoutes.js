import express from 'express';
import { LoginUser, LogoutUser, RegisterUser } from '../controllers/authController.js';
import { authorizedUserOrNot } from '../middlewares/authorizedUserOrNot.js';
const router = express.Router();

router.post('/signup', RegisterUser);
router.post('/signin', LoginUser);
router.post('/logout',authorizedUserOrNot, LogoutUser);

export default router;