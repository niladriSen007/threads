import express from 'express';
import { LoginUser, RegisterUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', RegisterUser);
router.post('/signin', LoginUser);
router.get('/logout', (req, res) => {
    // res.clearCookie('token').json({ message: 'Logged out successfully' });
    res.json({ message: 'Logged out successfully' });
    });

export default router;